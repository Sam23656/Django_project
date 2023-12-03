import React, { useState, useEffect } from 'react';
import { useNavigate }  from 'react-router-dom';
import Header from "../Start_Page/Header";
import Cookies from 'js-cookie';
import GetResumeDetail from '../../api/Resume/GetResumeDetail';
import get_user_data from '../../api/Auth/get_user_data';
import DeleteResume from '../../api/Resume/DeleteResume';

function ResumeDeletePage() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const idString = searchParams.get('id');
  const id = JSON.parse(decodeURIComponent(idString));
  const navigate = useNavigate();

  const buttonClick = async (e) => {
    e.preventDefault();
    if (Cookies.get('id') == data.creator || Cookies.get('admin_status') == "true") {
        await DeleteResume(id, Cookies.get("access_token") );
        navigate('/AllResume/');
    }
    else {
        alert('Вы не можете удалить этот резюме');
    }
}

  useEffect(() => {
    const fetchData = async () => {
    const userData = await GetResumeDetail(id);
    setData(userData);
    const data = await get_user_data(userData.creator);
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
        <h1 className="ms-3 me-3">Удалить резюме</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
            <form key={data.id} className="mb-4 mt-2 p-3 form-control border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
              <h3> Никнейм: {user.username}</h3>
              <p>Имя: {user.full_name}</p>
              <p>Электронная почта: {user.email}</p>
              <p>Образование:</p>
              <p name="education">{data.education}</p>
              <p>Опыт работы:</p>
              <p name="experience">{data.experience}</p>
              <p>Социальные сети:</p>
              <p name="social_links">{data.social_links}</p>
              <p>Дополнительная информация:</p>
              <p name="additional_info">{data.additional_info}</p>
              <button className="btn btn-primary mt-3" onClick={buttonClick} >Удалить</button>
              <button className="btn btn-primary ms-2 mt-3" onClick={() => navigate(`/ResumeDetail/?id=${data.id}`)}>Отмена</button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default ResumeDeletePage;