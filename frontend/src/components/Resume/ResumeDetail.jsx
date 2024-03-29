import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import GetResumeDetail from '../../api/Resume/GetResumeDetail';
import get_user_data from '../../api/Auth/get_user_data';
import GetLanguage from '../../api/Language/GetLanguage';
import GetTag from '../../api/Tag/GetTag';
import GetFramework from '../../api/Framework/GetFramework';

function ResumeDetailPage() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [tags, setTags] = useState([]);
  const [frameworks, setFrameworks] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const idString = searchParams.get('id');
  const id = JSON.parse(decodeURIComponent(idString));
  useEffect(() => {
    const fetchData = async () => {
        const userData = await GetResumeDetail(id);
        setData(userData);
        const languagePromises = userData.languages.map(async (language) => {
            const data = await GetLanguage(language);
            return data;
        });
        const tagPromises = userData.skills.map(async (tag) => {
            const data = await GetTag(tag);
            return data;
        })
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
    };

    fetchData().catch(console.error);
}, [id]);


  if (data === null || user === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Детали резюме</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
            <div key={data.id} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
              <h3> Никнейм: {user.username}</h3>
              <p>Имя: {user.full_name}</p>
              <p>Электронная почта: {user.email}</p>
              <p>Языки: {languages.map((language) => language.title).join(', ')}</p>
              <p>Теги: {tags.map((skill) => skill.title).join(', ')}</p>
              <p>Фреймворки: {frameworks.map((framework) => framework.title).join(', ')}</p>
              <p>Образование: {data.education}</p>
              <p>Опыт работы: {data.experience}</p>
              <p>Социальные сети: {data.social_links}</p>
              <p>Дополнительная информация: {data.additional_info}</p>
              <p>Дата создания резюме: {new Date(data.created_at).toLocaleDateString()}</p>
              <>{user.id == Cookies.get("id") || Cookies.get("admin_status") === 'true'  ? (
                <>
                  <a className='btn btn-primary mt-2' href={`/ResumeUpdate/?id=${data.id}`}>Редактировать резюме</a>
                  <a className='ms-2 btn btn-primary mt-2' href={`/ResumeDelete/?id=${data.id}`}>Удалить резюме</a>
                </>
              ) : (Cookies.get("user_role")) == "moderator" ? (<>
                <a className='ms-2 btn btn-primary mt-2' href={`/VacancyDelete/?id=${data.id}`}>Удалить вакансию</a>
              </>) : (<></>)}</>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeDetailPage;