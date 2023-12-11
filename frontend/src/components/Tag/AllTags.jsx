import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetAllTags from '../../api/Tag/GetAllTags';


function AllTagsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await GetAllTags();
      setData(userData);
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
          <h1 className="ms-3 me-3">Все теги</h1>
          <Link to="/Admin/TagAdd" className="btn btn-primary">Добавить тег</Link>
          <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
            {data.map((tag, index) => (
              <div key={index} className="mb-4 mt-2 p-3 border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
                <h3>Название: {tag.title}</h3>
                <Link to={`/Admin/TagUpdate?id=${tag.id}`} className="btn btn-primary">Обновить</Link>
                <Link to={`/Admin/TagDelete?id=${tag.id}`} className="btn btn-primary ms-2">Удалить</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTagsPage;