import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import GetLanguage from '../../api/Language/GetLanguage';

function LanguageDetailPage() {
  const [data, setData] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const idString = searchParams.get('id');
  const id = JSON.parse(decodeURIComponent(idString));
  useEffect(() => {
    const fetchData = async () => {
        const data = await GetLanguage(id);
        setData(data);
    };

    fetchData().catch(console.error);
}, [id]);


  if (data === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Детали языка</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
            <div key={data.id} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
              <h3> Никнейм: {user.username}</h3>
              <p>Имя: {user.full_name}</p>
              <p>Электронная почта: {user.email}</p>
              <p>Языки: {languages.map((language) => language.title).join(', ')}</p>
              <p>Теги: {tags.map((skill) => skill.title).join(', ')}</p>
              <p>Образование: {data.education}</p>
              <p>Опыт работы: {data.experience}</p>
              <p>Социальные сети: {data.social_links}</p>
              <p>Дополнительная информация: {data.additional_info}</p>
              <p>Дата создания резюме: {new Date(data.created_at).toLocaleDateString()}</p>
              <>{user.id == Cookies.get("id") || Cookies.get("admin_status") === 'true'  ? (
                <>
                  <a className='btn btn-primary' href={`/ResumeUpdate/?id=${data.id}`}>Редактировать резюме</a>
                  <a className='ms-2 btn btn-primary' href={`/ResumeDelete/?id=${data.id}`}>Удалить резюме</a>
                </>
              ) : (<></>)}</>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageDetailPage;