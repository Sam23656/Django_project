import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetAllFeddbacks from '../../api/Feedback/GetAllFeedbacks';
import get_user_data from '../../api/Auth/get_user_data';
import GetVacancyDetail from '../../api/Vacancy/GetVacancyDetail';

function AllFeddbacksPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const userData = await GetAllFeddbacks();
      const Data = userData.map(async (feedback) => {
        feedback.user = await get_user_data(feedback.user);
        feedback.object = await GetVacancyDetail(feedback.object);
        return feedback;
      })
      
      setData(await Promise.all(Data));
    };

    fetchData().catch(console.error);
  }, []);


  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='d-flex'>
        <div style={{ width: "100%" }} className="d-flex flex-column align-items-center flex-wrap">
          <h1 className="ms-3 me-3">Все отзывы</h1>
          <Link to="/Admin/FeedbackAdd" className="btn btn-primary">Добавить отзыв</Link>
          <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
            {data.map((feedback, index) => (
              <div key={index} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
                <h3>Сообщение: {feedback.message}</h3>
                <h3>Пользователь: {feedback.user.username}</h3>
                <h3>Вакансия: {feedback.object.title}</h3>
                <Link to={`/Admin/FeedbackUpdate?id=${feedback.id}`} className="btn btn-primary">Обновить</Link>
                <Link to={`/Admin/FeedbackDelete?id=${feedback.id}`} className="btn btn-primary ms-2">Удалить</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllFeddbacksPage;