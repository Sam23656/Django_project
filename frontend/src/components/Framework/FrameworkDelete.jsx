import React, { useState, useEffect } from 'react';
import { useNavigate }  from 'react-router-dom';
import Cookies from 'js-cookie';
import GetFramework from '../../api/Framework/GetFramework';
import DeleteFramework from '../../api/Framework/DeleteFramework';

function FrameworkDeletePage() {
  const [data, setData] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const idString = searchParams.get('id');
  const id = JSON.parse(decodeURIComponent(idString));
  const navigate = useNavigate();

  const buttonClick = async (e) => {
    e.preventDefault();
    if (Cookies.get('admin_status') == "true") {
        await DeleteFramework(id, Cookies.get("access_token") );
        navigate('/Admin?location=Frameworks');
    }
    else {
        alert('Вы не можете удалить этот фреймворк');
    }
}

  useEffect(() => {
    const isAdmin = Cookies.get("admin_status") === "true" && Cookies.get("user_role") === "admin";
    const isModerator = Cookies.get("user_role") === "moderator";
    const hasAccessToken = Cookies.get("access_token") !== undefined;
    
    if (!isAdmin && !hasAccessToken) {
      isModerator ? console.log('Pass') : navigate('/');
    }
    const fetchData = async () => {
    const userData = await GetFramework(id);
    setData(userData);
    };
    fetchData().catch(console.error);
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Удалить фреймворк</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
            <form key={data.id} className="mb-4 mt-2 p-3 form-control border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
              <h3> Название: {data.title}</h3>
              <button className="btn btn-primary mt-3" onClick={buttonClick} >Удалить</button>
              <button className="btn btn-primary ms-2 mt-3" onClick={() => navigate(`/Admin?location=Frameworks`)}>Отмена</button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default FrameworkDeletePage;