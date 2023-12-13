import React, { useState, useEffect } from 'react';
import get_user_data from "../../api/Auth/get_user_data";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import AllVacanciesPage from "../Vacancy/AllVacancies";
import AllResumePage from "../Resume/AllResume";
import AllLanguagesPage from '../Language/AllLanguages';
import AllTagsPage from '../Tag/AllTags';
import AllMessagesPage from '../Chat/AllMessages';
import AllFeddbacksPage from '../Feedback/AllFeedbacks';
import AllFrameworksPage from '../Framework/AllFrameworks';
import GetAllVacancies from "../../api/Vacancy/GetAllVacancies";
import GetAllResume from "../../api/Resume/GetAllResume";
import GetAllLanguages from "../../api/Language/GetAllLanguages";
import GetLanguage from "../../api/Language/GetLanguage";


function AdminPanelPage() {
  const [data, setData] = useState(null);
  const [vacancies, setVacancies] = useState(null);
  const [popularLanguages, setPopularLanguages] = useState({});
  const [resumes, setResumes] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const locationString = searchParams.get('location');
  const locationValue = decodeURIComponent(locationString);
  const navigate = useNavigate();  
  useEffect(() => {
    const isAdmin = Cookies.get("admin_status") === "true" && Cookies.get("user_role") === "admin";
    const isModerator = Cookies.get("user_role") === "moderator";
    const hasAccessToken = Cookies.get("access_token") !== undefined;
  
    if (!isAdmin && !hasAccessToken) {
      navigate(isModerator ? '/Admin?location=Languages' : '/');
    }

    const fetchData = async () => {
      try{
      const userData = await get_user_data(Cookies.get("id"), Cookies.get("access_token"));
      setData(userData);
      const resumeData = await GetAllResume();
      setResumes(resumeData);

      const allVacancies = await GetAllVacancies();
      const allLanguages = await GetAllLanguages();
      
      const allVacanciesUpdated = await Promise.all(
        allVacancies.map(async (vacancy) => {
          return {
            ...vacancy,
            languages: await Promise.all(
              vacancy.languages.map(async (language) => await GetLanguage(language))
            ),
          };
        })
      );

      setVacancies(allVacanciesUpdated);
      if (Array.isArray(allLanguages) && allLanguages.length > 0) {
        setPopularLanguages((prev) => {
          return allVacanciesUpdated.reduce((acc, vacancy) => {
            vacancy.languages.slice(0, 10).forEach((language) => {
              acc[language.title] = (acc[language.title] || 0) + 0.5;
            });
            return acc;
          }, { ...prev });
        });
      } else {
        console.error("No languages found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
    fetchData().catch(console.error);
  }, []);

  if (data === null || vacancies === null || resumes === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex flex-row justify-content-center  flex-wrap">
        <div className="d-flex flex-row flex-wrap align-items-center ms-2 form-control" style={{ width: "99%", margin: "auto", height: "100px" }}>
        <div>
            <a href='/Admin' className='btn btn-secondary' style={{fontSize: "30px", fontWeight: "bold"}}>Админ панель</a>
        </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Vacancy' className='btn btn-secondary form-control'>Вакансии</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Resume' className='btn btn-secondary'>Резюме</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Languages' className='btn btn-secondary'>Языки</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Tags' className='btn btn-secondary'>Теги</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Messages' className='btn btn-secondary'>Сообщения</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Feedback' className='btn btn-secondary'>Отзывы</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Framework' className='btn btn-secondary'>Фреймворки</a>
          </div>
      </div>
      <div className="" style={{ width: "100%" }}>
        {(locationValue == "Vacancy") ? (
          <div>
            <AllVacanciesPage  />
          </div>
        ) : (locationValue == "Resume") ? (
        <div>
          <AllResumePage  />
        </div>
        ) : (locationValue == "Languages") ? (
          <div>
            <AllLanguagesPage />
          </div>
        ) : (locationValue == "Tags") ? (
          <div>
            <AllTagsPage />
          </div>
        ) : (locationValue == "Messages") ? (
          <div>
            <AllMessagesPage />
          </div>
        ) : (locationValue == "Feedback") ? (
          <div>
            <AllFeddbacksPage />
          </div>
        ) : (locationValue == "Framework") ? (
          <div>
            <AllFrameworksPage />
          </div>
        ) : (<div>
          {vacancies && (
        <div className="mt-5 ms-5 align-self-start d-flex">
            <div className="mt-5 ms-5 align-self-start d-flex">
                <p className="form-control" style={{ width: "250px" }}>Количество вакансий: {vacancies.length}</p>
                <p className="ms-5 form-control" style={{ width: "250px" }}>Количество резюме: {resumes.length}</p>
                </div>
              </div>
                  )}
                  <div className="mt-5 bg-secondary-subtle form-control ms-3" style={{ width: "98%" }}>
                    <h2>Популярны языки:</h2>
                    <div className="d-flex flex-wrap justify-content-center ">
                      {Object.entries(popularLanguages).map(([language, count]) => (
                        <div className="p-2 form-control" style={{ width: "300px", height: "50px", margin: "10px" }} key={language}>
                          {language}: {count}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 bg-secondary-subtle form-control ms-3" style={{ width: "98%" }}>
                        <h2>Последние Вакансии:</h2>
                        <div className="d-flex flex-wrap justify-content-center ">
                        {vacancies.slice(-10).reverse().map((vacancy) => (
                          <div className="m-3 form-control" style={{ width: "250px", maxheight: "100px" }} key={vacancy.id}>
                            <h3>Название: {vacancy.title}</h3>
                          </div>
                        ))}
                        </div>
                  </div>
                  <div className="d-flex flex-wrap justify-content-center text-secondary mt-2" style={{ height: "30px" }}><p>© 2023 ООО «JobPulse»</p></div>
              </div>)}
      </div>
    </div>
    </div>
  )
}

export default AdminPanelPage;