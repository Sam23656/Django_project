import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import GetAllResume from '../../api/Resume/GetAllResume';
import get_user_data from '../../api/Auth/get_user_data';
import GetLanguage from '../../api/Language/GetLanguage';
import GetTag from '../../api/Tag/GetTag';
import GetAllLanguages from '../../api/Language/GetAllLanguages';
import GetAllTags from '../../api/Tag/GetAllTags';
import GetAllFrameworks from '../../api/Framework/GetAllFrameworks';
import GetFramework from '../../api/Framework/GetFramework';

function AllResumePage() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [allFrameworks, setAllFrameworks] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedTag, setSelectedTag] = useState(''); 
  const [selectedFramework, setSelectedFramework] = useState('');
  const searchParams = new URLSearchParams(location.search);
  const idString = searchParams.get('page');
  const [id, setId] = useState(JSON.parse(decodeURIComponent(idString)));
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (id === null) {
        await setId(1);
      }
      let userData
      let usersData
      if (selectedFramework || selectedLanguage || selectedTag) {
         userData = await GetAllResume();
         const userPromises = userData.map(async (resume) => {
          const data = await get_user_data(resume.creator, Cookies.get("access_token"));
          return data;
        });
        usersData = await Promise.all(userPromises);
    
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
          });
          const resolvedTags = await Promise.all(tagPromises);
          elem.tags = resolvedTags;
    
          const frameworkPromises = elem.frameworks.map(async (framework) => {
            const data = await GetFramework(framework);
            return data;
          });
          const resolvedFrameworks = await Promise.all(frameworkPromises);
          elem.frameworks = resolvedFrameworks;
        }
      }
      else{
       userData = await GetAllResume(true, id);
       const userPromises = userData.results.map(async (resume) => {
        const data = await get_user_data(resume.creator, Cookies.get("access_token"));
        return data;
      });
      usersData = await Promise.all(userPromises);
  
      for (let elem of userData.results) {
        const languagePromises = elem.languages.map(async (language) => {
          const data = await GetLanguage(language);
          return data;
        });
        const resolvedLanguages = await Promise.all(languagePromises);
        elem.languages = resolvedLanguages;
  
        const tagPromises = elem.skills.map(async (tag) => {
          const data = await GetTag(tag);
          return data;
        });
        const resolvedTags = await Promise.all(tagPromises);
        elem.tags = resolvedTags;
  
        const frameworkPromises = elem.frameworks.map(async (framework) => {
          const data = await GetFramework(framework);
          return data;
        });
        const resolvedFrameworks = await Promise.all(frameworkPromises);
        elem.frameworks = resolvedFrameworks;
      }
      }

  
      setData(userData);
      setUsers(usersData);
      setPages(Array.from({ length: Math.ceil(userData.count / 3) }, (_, index) => index + 1));
  
      const allLanguagesData = await GetAllLanguages();
      setAllLanguages(allLanguagesData);
  
      const allTagsData = await GetAllTags();
      setAllTags(allTagsData);
  
      const allFrameworksData = await GetAllFrameworks();
      setAllFrameworks(allFrameworksData);
    };
  
    fetchData().catch(console.error);
  }, [selectedFramework, selectedLanguage, selectedTag]);

let filteredData = data;
  if (data === null || users === null) {
    return <div>Loading...</div>;
  }
  (data.results) ?
   (filteredData = data.results.filter((resume) => {
    const hasSelectedLanguage = !selectedLanguage || resume.languages.some((language) => language.title === selectedLanguage);
    const hasSelectedTag = !selectedTag || resume.tags.some((tag) => tag.title === selectedTag);
    const hasSelectedFramework = !selectedFramework || resume.frameworks.some((framework) => framework.title === selectedFramework);
    return hasSelectedLanguage && hasSelectedTag && hasSelectedFramework;
  })): (filteredData = data.filter((resume) => {
    const hasSelectedLanguage = !selectedLanguage || resume.languages.some((language) => language.title === selectedLanguage);
    const hasSelectedTag = !selectedTag || resume.tags.some((tag) => tag.title === selectedTag);
    const hasSelectedFramework = !selectedFramework || resume.frameworks.some((framework) => framework.title === selectedFramework);
    return hasSelectedLanguage && hasSelectedTag && hasSelectedFramework;
  }))

  return (
    <div>
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
          <div>
            <label htmlFor="frameworkFilter" className="form-label">Выберите фреймворк:</label>
            <select
              id="frameworkFilter"
              className="form-select"
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
            >
              <option value="">Все</option>
              {allFrameworks.map((framework) => (
                <option key={framework.id} value={framework.title}>{framework.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ width: "100%" }} className="d-flex flex-column align-items-center flex-wrap">
          <h1 className="ms-3 me-3">Все резюме</h1>
          {Cookies.get("user_role") === "admin" && <Link to="/AddResume" className="btn btn-primary">Добавить резюме</Link>}
          <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
            {filteredData.map((resume, index) => (
              <div key={resume.id} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
                <h3> Никнейм: {users[index].username}</h3>
                <p>Имя: {users[index].full_name}</p>
                <p>Электронная почта: {users[index].email}</p>
                <p>Языки программирования: {resume.languages.map((language) => language.title).join(', ')}</p>
                <p>Теги: {resume.tags.map((tag) => tag.title).join(', ')}</p>
                <p>Фреймворки: {resume.frameworks.map((framework) => framework.title).join(', ')}</p>
                <p>Опыт работы: {resume.experience}</p>
                <p>Дополнительная информация: {resume.additional_info}</p>
                <Link to={`/ResumeDetail?id=${resume.id}`} className="btn btn-primary">Подробнее</Link>
              </div>
            ))}
          </div>
          {pages.length > 1 && (
            <nav aria-label="..." className=''>
              <ul className="pagination">
                <li className={`page-item ${id === 1 ? 'disabled' : ''}`}>
                  <a className="page-link" href={`AllResume?page=${id - 1}`}>Previous</a>
                </li>
                {pages.map((page) => (
                  <li key={page} className={`page-item ${page === id ? 'active' : ''}`}>
                    <a className="page-link" href={`AllResume?page=${page}`}>
                      {page}
                    </a>
                  </li>
                ))}
                <li className={`page-item ${id === pages.length ? 'disabled' : ''}`}>
                  <a className="page-link" href={`AllResume?page=${id + 1}`}>Next</a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllResumePage;
