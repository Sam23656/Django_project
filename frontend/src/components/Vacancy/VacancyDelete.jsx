import React, { useState, useEffect } from 'react';
import { useNavigate }  from 'react-router-dom';
import Cookies from 'js-cookie';
import GetVacancyDetail from '../../api/Vacancy/GetVacancyDetail';
import get_user_data from '../../api/Auth/get_user_data';
import DeleteVacancy from '../../api/Vacancy/DeleteVacancy';

function VacancyDeletePage() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const idString = searchParams.get('id');
  const id = JSON.parse(decodeURIComponent(idString));
  const navigate = useNavigate();

  const buttonClick = async (e) => {
    e.preventDefault();
    if (Cookies.get('id') == data.creator || Cookies.get('admin_status') == "true") {
        await DeleteVacancy(id, Cookies.get("access_token") );
        navigate('/AllVacancies');
    }
    else {
        alert('Вы не можете удалить эту вакансию');
    }
}

  useEffect(() => {
    const fetchData = async () => {
    const userData = await GetVacancyDetail(id);
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
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Удалить вакансию</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
            <form key={data.id} className="mb-4 mt-2 p-3 form-control border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
              <h3> Никнейм : {user.username}</h3>
              <p>Имя: {user.full_name}</p>
              <p>Электронная почта: {user.email}</p>
              <p>Название вакансии: {data.title}</p>
              <p>Описание вакансии: {data.description}</p>
              <p>Зарплата: {data.salary}</p>
              <button className="btn btn-primary mt-3" onClick={buttonClick} >Удалить</button>
              <button className="btn btn-primary ms-2 mt-3" onClick={() => navigate(`/VacancyDetail/?id=${data.id}`)}>Отмена</button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default VacancyDeletePage;