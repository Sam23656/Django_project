import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import GetMessage from '../../api/Chat/GetMessage';
import get_user_data from '../../api/Auth/get_user_data';

function MessageDetailPage() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [secondUser, setSecondUser] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const idString = searchParams.get('id');
  const id = JSON.parse(decodeURIComponent(idString));
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const isAdmin = Cookies.get("admin_status") === "true" && Cookies.get("user_role") === "admin";
        const isModerator = Cookies.get("user_role") === "moderator";
        const hasAccessToken = Cookies.get("access_token") !== undefined;
        
        if (!isAdmin && !hasAccessToken) {
          isModerator ? console.log('Pass') : navigate('/');
        }

        const userData = await GetMessage(id);
        setData(userData);
        const User = await get_user_data(userData.sender);
        setUser(User);
        const secondUser = await get_user_data(userData.receiver);
        setSecondUser(secondUser);
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
        <h1 className="ms-3 me-3">Детали сообщения</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
          {secondUser ? (
            <div key={data.id} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
              <h3> Отправитель : {user.username}</h3>
              <p>Получатель: {secondUser.username}</p>
              <p>Сообщение: {data.message}</p>
              <Link to={`/Admin/MessageUpdate?id=${data.id}`} className="btn btn-primary">Обновить</Link>
              <Link to={`/Admin/MessageDelete?id=${data.id}`} className="btn btn-primary ms-2">Удалить</Link>
            </div>
          ) : (
            <div>Loading Second User...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageDetailPage;
