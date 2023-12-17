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
import { Link } from 'react-router-dom';


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
  console.log(locationValue)
  return (
    <div>
      <div className="d-flex flex-row justify-content-center  flex-wrap">
        <div className="d-flex flex-row flex-wrap align-items-center  border border-primary ms-2 form-control" style={{ width: "99%", margin: "auto", height: "100px" }}>
        <div>
            <a href='/Admin' className='btn btn-primary ' style={{fontSize: "30px", fontWeight: "bold"}}>Админ панель</a>
        </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Vacancy' className='btn btn-primary  form-control'>Вакансии</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Resume' className='btn btn-primary '>Резюме</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Languages' className='btn btn-primary '>Языки</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Tags' className='btn btn-primary '>Теги</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Messages' className='btn btn-primary '>Сообщения</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Feedback' className='btn btn-primary '>Отзывы</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/Admin?location=Framework' className='btn btn-primary '>Фреймворки</a>
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
        ) : (<div></div>)}
        {(locationValue == 'null') ? (
          <>
          {vacancies && (
           <div className=""style={{ width: "100%", marginTop: "150px", height: "50vh"}}>
            <div className="d-flex ms-3 me-3 flex-column align-self-start justify-content-center border border-primary  bg-dark rounded " >
                  <div>
                  <div className="mt-3">
                      <h2 className="ms-3">Последние Вакансии:</h2>
                      <div className="d-flex flex-wrap justify-content-center">
                        {vacancies.slice(-10).reverse().map((vacancy) => (
                          <Link to={`/VacancyDetail?id=${vacancy.id}`} className="m-3 p-3  border border-primary rounded bg-secondary-subtle" style={{ maxwidth: "350px", maxHeight: "100px", textDecoration: "none"}} key={vacancy.id}>
                            <h3 className="text-light">{vacancy.title}</h3>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 d-flex ms-3  align-items-center justify-content-center">
                      <p className="form-control bg-secondary-subtle border border-primary" style={{ width: "250px" }}>Количество вакансий: {vacancies.length}</p>
                      <p className="ms-5 form-control bg-secondary-subtle border border-primary" style={{ width: "250px" }}>Количество резюме: {data.length}</p>
                  </div>
                  </div>
                  <div className="mt-3">
                    <h2 className="ms-3">Популярны языки:</h2>
                    <div className="d-flex flex-wrap justify-content-center">
                      {Object.entries(popularLanguages).map(([language, count]) => (
                        <p className="m-3 p-3 border border-primary rounded bg-secondary-subtle" style={{ maxwidth: "350px", maxHeight: "100px", textDecoration: "none"}} key={language.id}>
                          {language}: {count}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 d-flex ms-3  align-items-center justify-content-center">
                    <p className="form-control border border-primary bg-secondary-subtle" style={{ width: "250px" }}>Количество вакансий: {vacancies.length}</p>
                    <p className="ms-5 form-control border border-primary bg-secondary-subtle" style={{ width: "250px" }}>Количество резюме: {data.length}</p>
                  </div>
                  </div>
                  
              </div>
           </div>)}
           </>
        ) : (<></>)}
      </div>
    </div>
    </div>
  )
}

export default AdminPanelPage;