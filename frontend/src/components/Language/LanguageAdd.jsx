import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CreateLanguage from '../../api/Language/CreateLanguage';

function AddLanguagePage() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const buttonClick = async (e) => {
    e.preventDefault();
    try {
      await CreateLanguage(
        Cookies.get('access_token'),
        title,
      );
      navigate('/Admin?location=Languages'); 
    } catch (error) {
      console.error('Error creating language:', error);
      alert('Error creating language. Please try again.');
    }
  };

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

export default AddLanguagePage;
