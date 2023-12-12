import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CreateFeedback from '../../api/Feedback/CreateFeedback';
import getAllUsers from '../../api/Auth/getAllUser';
import GetAllVacancies from '../../api/Vacancy/GetAllVacancies';
function AddFeedbackPage() {
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(1);
  const [object, setObject] = useState(1);
  const [vacancies, setVacancies] = useState([]);
  const navigate = useNavigate();

  const buttonClick = async (e) => {
    e.preventDefault();
    try {
      if (!user || !object) {
        console.error('User or object data is null');
        return;
      }

      await CreateFeedback(
        Cookies.get('access_token'),
        user,
        object,
        message
      );
      navigate('/Admin?location=Feedback');
    } catch (error) {
      console.error('Error creating feedback:', error);
      alert('Error creating feedback. Please try again.');
    }
  };
  
  useEffect(() => {
    const isAdmin = Cookies.get("admin_status") === "true" && Cookies.get("user_role") === "admin";
    const isModerator = Cookies.get("user_role") === "moderator";
    const hasAccessToken = Cookies.get("access_token") !== undefined;
    
    if (!isAdmin && !hasAccessToken) {
      navigate(isModerator ? '/Admin?location=Feedback' : '/');
    }
    const fetchData = async () => {
      const userData = await getAllUsers(Cookies.get('access_token'));
      setUserData(userData);
      const vacancies = await GetAllVacancies(Cookies.get('access_token'));
      setVacancies(vacancies);
    };
  
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Создать отзыв</h1>
        <div
          style={{ marginTop: '140px', width: '100%' }}
          className="d-flex flex-wrap justify-content-center border-primary rounded-3"
        >
          <form
            className="mb-4 mt-2 p-3 form-control border-primary border rounded"
            style={{ width: '30%', margin: '10px', boxShadow: '5px 10px 8px rgba(0, 0, 1, .3)' }}
          >
            <p>Пользователь:</p>
            <select className="form-control" onChange={(e) => setUser(e.target.value)}>
              {userData &&
                userData.map((user) => (
                  <option className="form-control" key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
            </select>
            <p>Вакансия:</p>
            <select className="form-control" onChange={(e) => setObject(e.target.value)}>
              {vacancies &&
                vacancies.map((vacancy) => (
                  <option className="form-control" key={vacancy.id} value={vacancy.id}>
                    {vacancy.title}
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

export default AddFeedbackPage;