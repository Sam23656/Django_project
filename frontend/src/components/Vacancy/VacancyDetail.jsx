import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import GetVacancyDetail from '../../api/Vacancy/GetVacancyDetail';
import get_user_data from '../../api/Auth/get_user_data';
import GetLanguage from '../../api/Language/GetLanguage';
import GetTag from '../../api/Tag/GetTag';
import GetJobApplications from '../../api/JobApplication/GetJobApplications';
import GetAllFeedbacks from '../../api/Feedback/GetAllFeedbacks';
import CreateFeedback from '../../api/Feedback/CreateFeedback';
import GetAllChats from '../../api/Chat/GetAllChat';
import CreateChat from '../../api/Chat/CreateChat';
import GetFramework from '../../api/Framework/GetFramework';

function VacancyDetailPage() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [tags, setTags] = useState([]);
  const [feedbacks, setFeedbacks] = useState(null);
  const [frameworks, setFrameworks] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const idString = searchParams.get('id');
  const id = JSON.parse(decodeURIComponent(idString));
  const navigate = useNavigate();


  const buttonClick = async (e) => {
    e.preventDefault();
    await CreateFeedback(
      Cookies.get("access_token"),
      Cookies.get("id"),
      id,
      message
    )
    window.location.reload();
  }
  const buttonClick2 = async (e, userId) => {
    e.preventDefault();
    const filteredChats = chats.filter(chat => chat.first_user == Cookies.get("id") || chat.second_user == id);
    if (filteredChats.length < 1) {
      await CreateChat(
        Cookies.get("access_token"),
        Cookies.get("id"),
        userId,
        id
      )
    }
    navigate('/Chat/')    
  }
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
        const frameworkPromises = userData.frameworks.map(async (tag) => {
          const data = await GetFramework(tag);
          return data;
      })
  
        const resolvedLanguages = await Promise.all(languagePromises);
        const resolvedTags = await Promise.all(tagPromises);
        const resolvedFrameworks = await Promise.all(frameworkPromises);
  
        setLanguages(resolvedLanguages);
        setTags(resolvedTags);
        setFrameworks(resolvedFrameworks);
        const creatorData = await get_user_data(userData.creator);
        setUser(creatorData);
  
        const jobApplicationsData = await GetJobApplications();
        const filteredJobApplications = jobApplicationsData.results.filter(jobApplication => jobApplication.vacancy == id);
       
        const mappedJobApplications = await Promise.all(filteredJobApplications.map(async jobApplication => {
          const userData = await get_user_data(jobApplication.creator);
          jobApplication.creator = userData;
          return jobApplication;
        }));
        setJobApplications(mappedJobApplications);

        const feedbacksData = await GetAllFeedbacks();
        const feedbacks = await Promise.all(feedbacksData.map(async feedback => {
          if (feedback.object == id) {
            const userData = await get_user_data(feedback.user);
            feedback.user = userData;
            return feedback;
          }
          else {
            return null;
          }
        }))
        
        setFeedbacks(feedbacks);

        const chatsData = await GetAllChats();
        setChats(chatsData);
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
              <p>Фреймворки: {frameworks.map((framework) => framework.title).join(', ')}</p>
              <p>Дата создания вакансии: {new Date(data.created_at).toLocaleDateString()}</p>
              <>{user.id == Cookies.get("id") || Cookies.get("admin_status") === 'true'  ? (
                <>
                  <a className='btn btn-primary mt-2' href={`/VacancyUpdate/?id=${data.id}`}>Редактировать вакансию</a>
                  <a className='ms-2 btn btn-primary mt-2' href={`/VacancyDelete/?id=${data.id}`}>Удалить вакансию</a>
                </>
              ) : (Cookies.get("user_role")) == "moderator" ? (<>
                <a className='ms-2 btn btn-primary mt-2' href={`/VacancyDelete/?id=${data.id}`}>Удалить вакансию</a>
              </>) : (<></>)}</>
              <>{Cookies.get('user_role') == 'job_seeker' || Cookies.get('admin_status') === 'true' ? <a className='ms-2 btn btn-primary  mt-2' href={`/CreateJobApplication/?id=${data.id}`}>Подать заявку</a> : <></> }</>
            </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center flex-wrap">
      {Cookies.get('user_role') === 'employer' || Cookies.get('user_role') === 'admin' || Cookies.get('admin_status') === 'true' ? (
        <>
         {jobApplications.length > 0 ? (
          <>
          <h1 className="ms-3 me-3">Заявки</h1>
          {jobApplications.map((jobApplication) => (
            <div key={jobApplication.id} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
              <p>Заявка от: {jobApplication.creator.username}</p>
              <button onClick={(e) => buttonClick2(e, jobApplication.creator.id)} className="btn btn-primary">Открыть Чат</button>
            </div>
          ))}
          </>
          ) : (<></>)}
        </>
      ) : (Cookies.get('user_role') === 'job_seeker' ? (
        <>
          <h2>Открыть Чат</h2>
          <button onClick={(e) => buttonClick2(e, user.id)} className="btn btn-primary">Открыть</button>
        </>
      ) : (
        <></>
      ))}

      </div>
      
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Отзывы</h1>
        
        {feedbacks !== null && feedbacks.map((feedback) => (
            feedback && (
              <div key={feedback.id} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
                <p>Отзыв от: {feedback.user?.username}</p>
                <p>Сообщение: {feedback.message}</p>
              </div>
            )
        ))}

        {Cookies.get('access_token') ? (
        <>
        <form className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
          <p>Сообщение</p>
          <textarea className="form-control" rows="3" onChange={(e) => setMessage(e.target.value)}></textarea>
          <button className="btn btn-primary mt-3" onClick={(e) => buttonClick(e)} >Отправить</button>
        </form>
        </>
        ) : (<></>)
        }
      </div>
    </div>
  );
}

export default VacancyDetailPage;