import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Start_Page/Header';
import Cookies from 'js-cookie';
import CreateVacancy from '../../api/Vacancy/CreateVacancy';
import GetAllLanguages from '../../api/Language/GetAllLanguages';
import GetAllTags from '../../api/Tag/GetAllTags';

function AddVacancyPage() {
  const [allLanguages, setAllLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const buttonClick = async (e) => {
    e.preventDefault();
    try {
      await CreateVacancy(
        Cookies.get('id'),
        Cookies.get('access_token'),
        title,
        description,
        salary,
        selectedTags,
        selectedLanguages
      );
      navigate('/AllVacancies'); 
    } catch (error) {
      console.error('Error creating resume:', error);
      alert('Error creating resume. Please try again.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setAllLanguages(await GetAllLanguages());
      setAllTags(await GetAllTags());
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <Header />
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Создать резюме</h1>
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
            <p>Описание:</p>
            <textarea type="text" className='form-control' name="description" onChange={(e) => setDescription(e.target.value)} />
            <p>Зарплата:</p>
            <input type="number" className='form-control' name="salary" onChange={(e) => setSalary(e.target.value)} />
            <p>Языки программирования:</p>
            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
              {allLanguages.map((language, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id={`languageCheckbox${index}`}
                    autoComplete="off"
                    checked={selectedLanguages.includes(language.id)}
                    onChange={() => {
                      const updatedLanguages = selectedLanguages.includes(language.id)
                        ? selectedLanguages.filter((id) => id !== language.id)
                        : [...selectedLanguages, language.id];
                      setSelectedLanguages(updatedLanguages);
                    }}
                  />
                  <label className="ms-2 btn btn-outline-primary" htmlFor={`languageCheckbox${index}`}>
                    {language.title}
                  </label>
                </div>
              ))}
            </div>

            <p>Тэги:</p>
            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
              {allTags.map((tag, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id={`tagCheckbox${index}`}
                    autoComplete="off"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => {
                      const updatedTags = selectedTags.includes(tag.id)
                        ? selectedTags.filter((id) => id !== tag.id)
                        : [...selectedTags, tag.id];
                      setSelectedTags(updatedTags);
                    }}
                  />
                  <label className="ms-2 btn btn-outline-primary" htmlFor={`tagCheckbox${index}`}>
                    {tag.title}
                  </label>
                </div>
              ))}
            </div>
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

export default AddVacancyPage;
