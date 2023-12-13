import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import GetAllVacancies from '../../api/Vacancy/GetAllVacancies';
import GetLanguage from '../../api/Language/GetLanguage';
import GetTag from '../../api/Tag/GetTag';
import GetAllLanguages from '../../api/Language/GetAllLanguages';
import GetAllTags from '../../api/Tag/GetAllTags';
import GetAllFrameworks from '../../api/Framework/GetAllFrameworks';
import GetFramework from '../../api/Framework/GetFramework';

function AllVacanciesPage() {
  const [data, setData] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [allFrameworks, setAllFrameworks] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedTag, setSelectedTag] = useState(''); 
  const [selectedFramework, setSelectedFramework] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userData = await GetAllVacancies();
      for (let i = 0; i < userData.length; i++) {
        const languagePromises = userData[i].languages.map(async (language) => {
          const data = await GetLanguage(language);
          return data;
        });
        const resolvedLanguages = await Promise.all(languagePromises);
        userData[i].languages = resolvedLanguages;

        const tagPromises = userData[i].tags.map(async (tag) => {
          const data = await GetTag(tag);
          return data;
        })
        const resolvedTags = await Promise.all(tagPromises);
        userData[i].tags = resolvedTags;

        const frameworkPromises = userData[i].frameworks.map(async (framework) => {
          const data = await GetFramework(framework);
          return data;
        })
        const resolvedFrameworks = await Promise.all(frameworkPromises);
        userData[i].frameworks = resolvedFrameworks;
        setData(userData);
      }

      const allLanguagesData = await GetAllLanguages();
      setAllLanguages(allLanguagesData);

      const allTagsData = await GetAllTags();
      setAllTags(allTagsData);

      const allFrameworksData = await GetAllFrameworks();
      setAllFrameworks(allFrameworksData);
    };

    fetchData().catch(console.error);
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  const filteredData = data.filter((resume) => {
    const hasSelectedLanguage = !selectedLanguage || resume.languages.some((language) => language.title === selectedLanguage);
    const hasSelectedTag = !selectedTag || resume.tags.some((tag) => tag.title === selectedTag);
    const hasSelectedFramework = !selectedFramework || resume.frameworks.some((framework) => framework.title === selectedFramework);
    return hasSelectedLanguage && hasSelectedTag && hasSelectedFramework;
  });

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
      <h1 className="ms-3 me-3">Все вакансии</h1>
      {Cookies.get("user_role") === "admin" && <Link to="/AddVacancy" className="btn btn-primary">Добавить вакансию</Link>}
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
          {filteredData.map((vacancy) => (
            <div key={vacancy.id} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
              <h3>Название вакансии: {vacancy.title}</h3>
              <p>Описание вакансии: {vacancy.description}</p>
              <p>Зарплата: {vacancy.salary}</p>
              <p>Языки: {vacancy.languages.map((language) => language.title).join(', ')}</p>
              <p>Теги: {vacancy.tags.map((tag) => tag.title).join(', ')}</p>
              <p>Дата создания вакансии: {new Date(vacancy.created_at).toLocaleDateString()}</p>
              <Link to={`/VacancyDetail?id=${vacancy.id}`} className="btn btn-primary">Подробнее</Link>
            </div>
            ))}
        </div>
      </div>
      </div>
    </div>
  )
          }
export default AllVacanciesPage;