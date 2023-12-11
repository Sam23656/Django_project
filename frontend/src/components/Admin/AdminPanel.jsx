import React, { useState, useEffect } from 'react';
import get_user_data from "../../api/Auth/get_user_data";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import AllVacanciesPage from "../Vacancy/AllVacancies";
import AllResumePage from "../Resume/AllResume";

function AdminPanelPage() {
  const [data, setData] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const locationString = searchParams.get('location');
  const locationValue = decodeURIComponent(locationString);
  const navigate = useNavigate();  

  useEffect(() => {
    if (Cookies.get("admin_status") !== "true" || Cookies.get("user_role") !== "admin" || Cookies.get("access_token") === undefined ) {
      if (Cookies.get("user_role") == "moderator") {
        
      }
      else{
        navigate('/');
      }
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
        <div className="">
            <a href='' className='btn btn-secondary' style={{fontSize: "30px", fontWeight: "bold"}}>Админ панель</a>
        </div>
          <div className="ms-3 mt-2">
            <a href='/AdminPanel?location=Vacancy' className='btn btn-secondary form-control'>Вакансии</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/AdminPanel?location=Resume' className='btn btn-secondary'>Резюме</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/AdminPanel?location=Languages' className='btn btn-secondary'>Языки</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/AdminPanel?location=Tags' className='btn btn-secondary'>Теги</a>
          </div>
          <div className="ms-3 mt-2">
            <a href='/AdminPanel?location=Messages' className='btn btn-secondary'>Сообщения</a>
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
        ) : (<></>)}
      </div>
    </div>
    </div>
  )
}

export default AdminPanelPage;