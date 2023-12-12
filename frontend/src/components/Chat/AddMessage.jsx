import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AddMessage from '../../api/Chat/AddMessage'
import getAllUsers from '../../api/Auth/getAllUser';
function AddMessagePage() {
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(1);
  const [secondUserData, setSecondUserData] = useState(1);
  const navigate = useNavigate();

  const buttonClick = async (e) => {
    e.preventDefault();
    try {
      if (!user || !secondUserData) {
        console.error('User or second user data is null');
        return;
      }

      await AddMessage(
        Cookies.get('access_token'),
        user,
        secondUserData,
        message
      );
      navigate('/Admin?location=Messages');
    } catch (error) {
      console.error('Error creating language:', error);
      alert('Error creating language. Please try again.');
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
      const userData = await getAllUsers(Cookies.get('access_token'));
      setUserData(userData);
    };
  
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Создать язык</h1>
        <div
          style={{ marginTop: '140px', width: '100%' }}
          className="d-flex flex-wrap justify-content-center border-primary rounded-3"
        >
          <form
            className="mb-4 mt-2 p-3 form-control border-primary border rounded"
            style={{ width: '30%', margin: '10px', boxShadow: '5px 10px 8px rgba(0, 0, 1, .3)' }}
          >
            <p>Отправитель:</p>
            <select className="form-control" onChange={(e) => setUser(e.target.value)}>
              {userData &&
                userData.map((user) => (
                  <option className="form-control" key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
            </select>
            <p>Получатель:</p>
            <select className="form-control" onChange={(e) => setSecondUserData(e.target.value)}>
              {userData &&
                userData.map((user) => (
                  <option className="form-control" key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
            </select>
            <p>Сообщение:</p>
            <input type="text" className="form-control" name="message" onChange={(e) => setMessage(e.target.value)} />
            <div>
              <button className="btn btn-primary mt-3" onClick={buttonClick}>
                Создать
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMessagePage;