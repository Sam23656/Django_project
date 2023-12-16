import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CreateTag from '../../api/Tag/CreateTag';

function AddTagPage() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const buttonClick = async (e) => {
    e.preventDefault();
    try {
      await CreateTag(
        Cookies.get('access_token'),
        title,
      );
      navigate('/Admin?location=Tags'); 
    } catch (error) {
      console.error('Error creating tag:', error);
      alert('Error creating tag. Please try again.');
    }
  };

  useEffect(() => {
    const isAdmin = Cookies.get("admin_status") === "true" && Cookies.get("user_role") === "admin";
    const isModerator = Cookies.get("user_role") === "moderator";
    const hasAccessToken = Cookies.get("access_token") !== undefined;
    
    if (!isAdmin && !hasAccessToken) {
      navigate(isModerator ? '/Admin?location=Tags' : '/');
    }
  }, []);

  return (
    <div>
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Создать тег</h1>
        <div
          style={{ marginTop: '140px', width: '100%' }}
          className="d-flex flex-wrap justify-content-center border-primary rounded-3"
        >
          <form
            className="mb-4 mt-2 p-3 form-control border-primary border rounded"
            style={{ width: '30%', margin: '10px', boxShadow: '5px 10px 8px rgba(0, 0, 1, .3)' }}
          >
            <p>Название:</p>
            <input type="text" className='form-control' name="title" onChange={(e) => setTitle(e.target.value)} />
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

export default AddTagPage;