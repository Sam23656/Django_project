import React, { useState, useEffect } from 'react';
import Header from "../Start_Page/Header";
import Cookies from 'js-cookie';
import GetVacancyDetail from '../../api/Vacancy/GetVacancyDetail';
import get_user_data from '../../api/Auth/get_user_data';
import GetLanguage from '../../api/Language/GetLanguage';
import GetTag from '../../api/Tag/GetTag';
import GetJobApplications from '../../api/JobApplication/GetJobApplications';

function VacancyDetailPage() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [tags, setTags] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const idString = searchParams.get('id');
  const id = JSON.parse(decodeURIComponent(idString));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await GetVacancyDetail(id);
        setData(userData);
  
        const languagePromises = userData.languages.map(async (language) => {
          const data = await GetLanguage(language);
          return data;
        });
  
        const tagPromises = userData.tags.map(async (tag) => {
          const data = await GetTag(tag);
          return data;
        });
  
        const resolvedLanguages = await Promise.all(languagePromises);
        const resolvedTags = await Promise.all(tagPromises);
  
        setLanguages(resolvedLanguages);
        setTags(resolvedTags);
  
        const creatorData = await get_user_data(userData.creator);
        setUser(creatorData);
  
        const jobApplicationsData = await GetJobApplications();
        
        const filteredJobApplications = jobApplicationsData.filter(jobApplication => jobApplication.vacancy == id);
       
        const mappedJobApplications = await Promise.all(filteredJobApplications.map(async jobApplication => {
          const userData = await get_user_data(jobApplication.creator);
          jobApplication.creator = userData;
          return jobApplication;
        }));
        setJobApplications(mappedJobApplications);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData().catch(console.error);
  }, [id]);

  if (data === null || user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Детали вакансии</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
            <div key={data.id} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
              <h3> Никнейм : {user.username}</h3>
              <p>Имя: {user.full_name}</p>
              <p>Электронная почта: {user.email}</p>
              <p>Название вакансии: {data.title}</p>
              <p>Описание вакансии: {data.description}</p>
              <p>Зарплата: {data.salary}</p>
              <p>Языки: {languages.map((language) => language.title).join(', ')}</p>
              <p>Теги: {tags.map((tag) => tag.title).join(', ')}</p>
              <p>Дата создания вакансии: {new Date(data.created_at).toLocaleDateString()}</p>
              <>{user.id == Cookies.get("id") || Cookies.get("admin_status") === 'true'  ? (
                <>
                  <a className='btn btn-primary' href={`/VacancyUpdate/?id=${data.id}`}>Редактировать вакансию</a>
                  <a className='ms-2 btn btn-primary' href={`/VacancyDelete/?id=${data.id}`}>Удалить вакансию</a>
                </>
              ) : (<></>)}</>
              <>{Cookies.get('user_role') == 'job_seeker' || Cookies.get('admin_status') === 'true' ? <a className='ms-2 btn btn-primary' href={`/CreateJobApplication/?id=${data.id}`}>Подать заявку</a> : <></> }</>
            </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Заявки</h1>
        {jobApplications.map((jobApplication) => (
          <div key={jobApplication.id} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
            <p>Заявка от: {jobApplication.creator.username}</p>
            <a href="" className="btn btn-primary">Открыть Чат</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VacancyDetailPage;