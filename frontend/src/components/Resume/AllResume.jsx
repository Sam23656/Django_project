import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../Start_Page/Header";
import Cookies from 'js-cookie';
import GetAllResume from '../../api/Resume/GetAllResume';
import get_user_data from '../../api/Auth/get_user_data';

function AllResumePage() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await GetAllResume();
      setData(userData);

      const userPromises = userData.map(async (resume) => {
        const data = await get_user_data(resume.creator, Cookies.get("access_token"));
        return data;
      });

      const usersData = await Promise.all(userPromises);
      setUsers(usersData);
    };

    fetchData().catch(console.error);
  }, []);

  if (data === null || users === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Все резюме</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
          {data.map((resume, index) => (
            <div key={resume.id} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
              <h3> Никнейм: {users[index].username}</h3>
              <p>Имя: {users[index].full_name}</p>
              <p>Электронная почта: {users[index].email}</p>
              <p>Опыт работы: {resume.experience}</p>
              <p>Дополнительная информация: {resume.additional_info}</p>
              <Link to={`/ResumeDetail?id=${resume.id}`} className="btn btn-primary">Подробнее</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllResumePage;
