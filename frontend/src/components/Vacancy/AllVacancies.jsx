import React, { useState, useEffect } from 'react';
import Header from "../Start_Page/Header";
import GetAllVacancies from '../../api/Vacancy/GetAllVacancies';

function AllVacanciesPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await GetAllVacancies();
      setData(userData);
      console.log(userData);
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
              <a href="" className="btn btn-primary">Подробнее</a>
            </div>
            ))}
        </div>
      </div>
    </div>
  )
          }
export default AllVacanciesPage;