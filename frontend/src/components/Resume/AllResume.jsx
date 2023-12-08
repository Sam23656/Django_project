import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../Start_Page/Header";
import Cookies from 'js-cookie';
import GetAllResume from '../../api/Resume/GetAllResume';
import get_user_data from '../../api/Auth/get_user_data';
import GetLanguage from '../../api/Language/GetLanguage';
import GetTag from '../../api/Tag/GetTag';
import GetAllLanguages from '../../api/Language/GetAllLanguages';
import GetAllTags from '../../api/Tag/GetAllTags';

function AllResumePage() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedTag, setSelectedTag] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      const userData = await GetAllResume();
      for (let elem of userData) {
        const languagePromises = elem.languages.map(async (language) => {
          const data = await GetLanguage(language);
          return data;
        });
        const resolvedLanguages = await Promise.all(languagePromises);
        elem.languages = resolvedLanguages;

        const tagPromises = elem.skills.map(async (tag) => {
          const data = await GetTag(tag);
          return data;
        })
        const resolvedTags = await Promise.all(tagPromises);
        elem.tags = resolvedTags;
      }
      setData(userData);

      const userPromises = userData.map(async (resume) => {
        const data = await get_user_data(resume.creator, Cookies.get("access_token"));
        return data;
      });

      const usersData = await Promise.all(userPromises);
      setUsers(usersData);

      const allLanguagesData = await GetAllLanguages();
      setAllLanguages(allLanguagesData);

      const allTagsData = await GetAllTags();
      setAllTags(allTagsData);
    };

    fetchData().catch(console.error);
  }, []);


  if (data === null || users === null) {
    return <div>Loading...</div>;
  }
  const filteredData = data.filter((resume) => {
    const hasSelectedLanguage = !selectedLanguage || resume.languages.some((language) => language.title === selectedLanguage);
    const hasSelectedTag = !selectedTag || resume.tags.some((tag) => tag.title === selectedTag);
    return hasSelectedLanguage && hasSelectedTag;
  });

  return (
    <div>
      <Header />
      <div className='d-flex'>
        <div className="d-flex flex-column flex-wrap justify-content-center align-items-center ms-2" style={{ width: "20%", height: "100%", margin: "auto", minHeight: "85vh" }}>
          <div className="me-3">
            <label htmlFor="languageFilter" className="form-label">Выберите язык программирования:</label>
            <select
              id="languageFilter"
              className="form-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="">Все</option>
              {allLanguages.map((language) => (
                <option key={language.id} value={language.title}>{language.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tagFilter" className="form-label">Выберите тег:</label>
            <select
              id="tagFilter"
              className="form-select"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">Все</option>
              {allTags.map((tag) => (
                <option key={tag.id} value={tag.title}>{tag.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ width: "100%" }} className="d-flex flex-column align-items-center flex-wrap">
          <h1 className="ms-3 me-3">Все резюме</h1>
          <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
            {filteredData.map((resume, index) => (
              <div key={resume.id} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
                <h3> Никнейм: {users[index].username}</h3>
                <p>Имя: {users[index].full_name}</p>
                <p>Электронная почта: {users[index].email}</p>
                <p>Языки программирования: {resume.languages.map((language) => language.title).join(', ')}</p>
                <p>Теги: {resume.tags.map((tag) => tag.title).join(', ')}</p>
                <p>Опыт работы: {resume.experience}</p>
                <p>Дополнительная информация: {resume.additional_info}</p>
                <Link to={`/ResumeDetail?id=${resume.id}`} className="btn btn-primary">Подробнее</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllResumePage;
