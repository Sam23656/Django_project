import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import GetFramework from '../../api/Framework/GetFramework';
import UpdateFramework from '../../api/Framework/UpdateFramework';

function FrameworkUpdatePage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [title, setTitle] = useState('');

  const buttonClick = async (e) => {
    e.preventDefault();
    if (Cookies.get('admin_status') == "true" || Cookies.get('user_role') == "admin") {
      try{
      await UpdateFramework(
        id,
        Cookies.get("access_token"),
        title
      );
      navigate(`/Admin?location=Framework`);
    }catch (error) {
      alert('Поле Title не должен быть пустым');
    }
      
    } else {
      alert('Вы не можете редактировать этот фреймворк');
    }
  };
  
  useEffect(() => {
    const isAdmin = Cookies.get("admin_status") === "true" && Cookies.get("user_role") === "admin";
    const isModerator = Cookies.get("user_role") === "moderator";
    const hasAccessToken = Cookies.get("access_token") !== undefined;
    
    if (!isAdmin && !hasAccessToken) {
      navigate(isModerator ? '/Admin?location=Framework' : '/');
    }

    const fetchData = async () => {
      const Data = await GetFramework(id);
      setTitle(Data.title);
      setData(Data);
    };
  
    fetchData().catch(console.error);
  }, [id]);
  

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Обновить фреймворк</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
          <form key={data.id} className="mb-4 mt-2 p-3 form-control border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
            <p>Название:</p>
            <input type="text" className='form-control' name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
            <button className="btn btn-primary mt-3" onClick={buttonClick}>Обновить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FrameworkUpdatePage;