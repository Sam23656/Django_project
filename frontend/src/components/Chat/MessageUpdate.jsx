import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import GetMessage from '../../api/Chat/GetMessage';
import UpdateMessage from '../../api/Chat/MessageUpdate';

function MessageUpdatePage() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [secondUser, setSecondUser] = useState(null);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [message, setMessage] = useState('');

  const buttonClick = async (e) => {
    e.preventDefault();
    if (Cookies.get('admin_status') == "true" || Cookies.get('user_role') == "admin") {
      try{
      await UpdateMessage(
        id,
        Cookies.get("access_token"),
        user,
        secondUser,
        message
      );
      navigate(`/Admin?location=Messages`);
    }catch (error) {
      alert('Поле Message не должен быть пустым');
    }
      
    } else {
      alert('Вы не можете редактировать это сообщение');
    }
  };
  
  useEffect(() => {
    const isAdmin = Cookies.get("admin_status") === "true" && Cookies.get("user_role") === "admin";
    const isModerator = Cookies.get("user_role") === "moderator";
    const hasAccessToken = Cookies.get("access_token") !== undefined;
    
    if (!isAdmin && !hasAccessToken) {
      navigate(isModerator ? '/Admin?location=Messages' : '/');
    }

    const fetchData = async () => {
      const Data = await GetMessage(id);
      setMessage(Data.message);
      setData(Data);
      setUser(Data.sender);
      setSecondUser(Data.receiver);
    };
  
    fetchData().catch(console.error);
  }, [id]);
  

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Обновить сообщение</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
          <form key={data.id} className="mb-4 mt-2 p-3 form-control border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
            <p>Сообщение:</p>
            <input type="text" className='form-control' name="title" onChange={(e) => setMessage(e.target.value)} value={message} />
            <button className="btn btn-primary mt-3" onClick={buttonClick}>Обновить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MessageUpdatePage;