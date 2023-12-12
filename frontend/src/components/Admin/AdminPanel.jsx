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

function AdminPanelPage() {
  const [data, setData] = useState(null);
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
      const userData = await get_user_data(Cookies.get("id"), Cookies.get("access_token"));
      setData(userData);
    };

    fetchData().catch(console.error);
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex flex-row justify-content-center  flex-wrap">
        <div className="d-flex flex-row flex-wrap align-items-center ms-2" style={{ width: "100%", margin: "auto", height: "100px" }}>
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
        ) : (<></>)}
      </div>
    </div>
    </div>
  )
}

export default AdminPanelPage;