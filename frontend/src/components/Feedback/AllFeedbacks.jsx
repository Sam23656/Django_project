import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetAllFeddbacks from '../../api/Feedback/GetAllFeedbacks';
import get_user_data from '../../api/Auth/get_user_data';
import GetVacancyDetail from '../../api/Vacancy/GetVacancyDetail';

function AllFeddbacksPage() {
  const [data, setData] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const idString = searchParams.get('page');
  const [id, setId] = useState(JSON.parse(decodeURIComponent(idString)));
  const [pages, setPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      if (id === null) {
        await setId(1)
      }
      let userData = await GetAllFeddbacks(true, id);
      let Data = userData.results.map(async (feedback) => {
        feedback.user = await get_user_data(feedback.user);
        feedback.object = await GetVacancyDetail(feedback.object);
        return feedback;
      })
      userData.results = await Promise.all(Data);
      setData(userData);
      setPages(Array.from({ length: Math.ceil(userData.count / 3) }, (_, index) => index + 1));
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
            {data.results.map((feedback, index) => (
              <div key={index} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
                <h3>Сообщение: {feedback.message}</h3>
                <h3>Пользователь: {feedback.user.username}</h3>
                <h3>Вакансия: {feedback.object.title}</h3>
                <Link to={`/Admin/FeedbackUpdate?id=${feedback.id}`} className="btn btn-primary">Обновить</Link>
                <Link to={`/Admin/FeedbackDelete?id=${feedback.id}`} className="btn btn-primary ms-2">Удалить</Link>
              </div>
            ))}
          </div>
          {pages.length > 1 && (
            <nav aria-label="..." className=''>
              <ul className="pagination">
                <li className={`page-item ${id === 1 ? 'disabled' : ''}`}>
                  <a className="page-link" href={`?location=Feedback&page=${id - 1}`}>Previous</a>
                </li>
                {pages.map((page) => (
                  <li key={page} className={`page-item ${page === id ? 'active' : ''}`}>
                    <a className="page-link" href={`?location=Feedback&page=${page}`}>
                      {page}
                    </a>
                  </li>
                ))}
                <li className={`page-item ${id === pages.length ? 'disabled' : ''}`}>
                  <a className="page-link" href={`?location=Feedback&page=${id + 1}`}>Next</a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllFeddbacksPage;