import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../Start_Page/Header";
import GetAllVacancies from '../../api/Vacancy/GetAllVacancies';
import GetLanguage from '../../api/Language/GetLanguage';
import GetTag from '../../api/Tag/GetTag';
import Cookies from 'js-cookie';

function YourVacanciesPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userData = await GetAllVacancies();
        let newUserData = [];
        for (let elem of userData) {
          if (elem.creator == Cookies.get('id')) {
            newUserData.push(elem);
          }
        }
    
        userData = newUserData;
    
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
          });
    
          const resolvedTags = await Promise.all(tagPromises);
          userData[i].tags = resolvedTags;
        }
        setData(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData().catch(console.error);
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="d-flex flex-column align-items-center flex-wrap">
      <h1 className="ms-3 me-3">Все вакансии</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
          {data.map((vacancy) => (
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
  )
          }
export default YourVacanciesPage;