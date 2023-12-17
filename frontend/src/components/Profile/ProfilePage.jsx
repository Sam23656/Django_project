import React, { useState, useEffect } from 'react';
import get_user_data from "../../api/Auth/get_user_data";
import Cookies from "js-cookie";
import GetAllResumes from "../../api/Resume/GetAllResume";
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [data, setData] = useState(null);
  const [Resumes, setResumes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const userData = await get_user_data(Cookies.get("id"), Cookies.get("access_token"));
      setData(userData);
      const resumeData = await GetAllResumes();
      const filteredResumes = resumeData.filter(resume => resume.creator == userData.id);
      setResumes(filteredResumes);
    };

    fetchData().catch(console.error);
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <div style={{marginTop: "140px", width: "50%"}} className="border border-primary bg-secondary-subtle d-flex flex-column align-items-center form-control ">
          <h1 className="ms-3 me-3 ">Профиль</h1>
          <div className='form-control border-primary d-flex flex-column align-items-center' style={{width: "70%"}}>
          <p style={{width: "50%"}} className='form-control bg-secondary-subtle text-center'>Никнейм: {data.username}</p>
          <p style={{width: "50%"}} className='form-control bg-secondary-subtle text-center'>Имя: {data.full_name}</p>
          <p style={{width: "50%"}} className='form-control bg-secondary-subtle text-center'>Электронная почта: {data.email}</p>
          <p style={{width: "50%"}} className='form-control bg-secondary-subtle text-center'>Дата рождения: {data.birth_date ? data.birth_date : 'None'}</p>
          <p style={{width: "50%"}} className='form-control bg-secondary-subtle text-center'>Роль: {data.role}</p>
          {Cookies.get("user_role") == "employer" ? (
            <>
            <p style={{width: "50%"}} className='form-control bg-secondary-subtle text-center'>Компания {data.company_name}</p>
            <p style={{width: "50%"}} className='form-control bg-secondary-subtle text-center'>Промышленность {data.industry}</p>
            </>
          ) : (<></>)}
          </div>
          <h3 className='mt-2'>Резюме:</h3>
          {Resumes.map((resume) => (
            <div key={resume.id} className='form-control border-primary d-flex flex-column align-items-center mt-2' style={{width: "70%"}}>
              <p style={{width: "50%"}} className='form-control bg-secondary-subtle text-center'>Резюме номер: {resume.id}</p>
              <Link to={`/ResumeDetail?id=${resume.id}`} className="btn btn-primary">Открыть резюме</Link>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default ProfilePage;