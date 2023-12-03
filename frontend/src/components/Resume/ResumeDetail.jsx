import React, { useState, useEffect } from 'react';
import Header from "../Start_Page/Header";
import Cookies from 'js-cookie';
import GetResumeDetail from '../../api/Resume/GetResumeDetail';
import get_user_data from '../../api/Auth/get_user_data';

function ResumeDetailPage() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const uriString = searchParams.get('id');
  const id = JSON.parse(decodeURIComponent(uriString));

  useEffect(() => {
    const fetchData = async () => {
    const userData = await GetResumeDetail(id);
    setData(userData);
    const data = await get_user_data(userData.job_seeker, Cookies.get("access_token"));
    setUser(data);
    };
    fetchData().catch(console.error);
  }, []);

  if (data === null || user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Все резюме</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
            <div key={data.id} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
              <h3> Никнейм: {user.username}</h3>
              <p>Имя: {user.full_name}</p>
              <p>Электронная почта: {user.email}</p>
              <p>Образование: {data.education}</p>
              <p>Опыт работы: {data.experience}</p>
              <p>Социальные сети: {data.social_links}</p>
              <p>Дополнительная информация: {data.additional_info}</p>
              <p>Дата создания резюме: {new Date(data.created_at).toLocaleDateString()}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeDetailPage;