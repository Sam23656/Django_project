import React, { useState, useEffect } from 'react';
import { useNavigate }  from 'react-router-dom';
import Header from "../Start_Page/Header";
import Cookies from 'js-cookie';
import GetResumeDetail from '../../api/Resume/GetResumeDetail';
import get_user_data from '../../api/Auth/get_user_data';
import UpdateResume from '../../api/Resume/UpdateResume';

function ResumeUpdatePage() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const uriString = searchParams.get('id');
  const id = JSON.parse(decodeURIComponent(uriString));
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [social_links, setSocial_links] = useState('');
  const [additional_info, setAdditional_info] = useState('');
  const navigate = useNavigate();

  const buttonClick = async (e) => {
    e.preventDefault();
    if (Cookies.get('user_id') == data.creator || Cookies.get('admin_status') == "true") {
        await UpdateResume(id, Cookies.get("access_token") , data.skills, data.languages ,education, experience, social_links, additional_info);
        navigate(`/ResumeDetail/?id=${id}`);
    }
    else {
        alert('Вы не можете редактировать этот резюме');
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
        <h1 className="ms-3 me-3">Обновить резюме</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
            <form key={data.id} className="mb-4 mt-2 p-3 form-control border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
              <h3> Никнейм: {user.username}</h3>
              <p>Имя: {user.full_name}</p>
              <p>Электронная почта: {user.email}</p>
              <p>Образование:</p>
              <textarea type="text" className='form-control' name="education" onChange={(e) => setEducation(e.target.value)} defaultValue={data.education} />
              <p>Опыт работы:</p>
              <textarea type="text" className='form-control' name="experience" onChange={(e) => setExperience(e.target.value)} defaultValue={data.experience} />
              <p>Социальные сети:</p>
              <textarea type="text" className='form-control' name="social_links" onChange={(e) => setSocial_links(e.target.value)} defaultValue={data.social_links} />
              <p>Дополнительная информация:</p>
              <textarea type="text" className='form-control' name="additional_info" onChange={(e) => setAdditional_info(e.target.value)} defaultValue={data.additional_info} />
              <button className="btn btn-primary mt-3" onClick={buttonClick} >Обновить</button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default ResumeUpdatePage;