import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Start_Page/Header";
import Cookies from 'js-cookie';
import GetVacancyDetail from '../../api/Vacancy/GetVacancyDetail';
import get_user_data from '../../api/Auth/get_user_data';
import UpdateVacancy from '../../api/Vacancy/UpdateVacancy';
import GetAllLanguages from '../../api/Language/GetAllLanguages';
import GetLanguage from '../../api/Language/GetLanguage';
import GetAllTags from '../../api/Tag/GetAllTags';
import GetTag from '../../api/Tag/GetTag';

function VacancyUpdatePage() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [allLanguages, setAllLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const idString = searchParams.get('id');
  const id = JSON.parse(decodeURIComponent(idString));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const buttonClick = async (e) => {
    e.preventDefault();
    if (Cookies.get('id') == data.creator || Cookies.get('admin_status') == "true") {
      try{
      await UpdateVacancy(
        Cookies.get("id"),
        id,
        Cookies.get("access_token"),
        title,
        description,
        salary,
        selectedTags,
        selectedLanguages
      );
      navigate(`/VacancyDetail/?id=${id}`);
    }catch (error) {
      alert('Skill и Language не должны быть пустыми');
    }
      
    } else {
      alert('Вы не можете редактировать эту вакансию');
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const userData = await GetVacancyDetail(id);
      setData(userData);
      const data = await get_user_data(userData.creator);
      setUser(data);
  
      const languagePromises = userData.languages.map(async (language) => {
        const data = await GetLanguage(language);
        return data;
      });
  
      const tagPromises = userData.tags.map(async (tag) => {
        const data = await GetTag(tag);
        return data;
      });
  
      setAllLanguages(await GetAllLanguages());
      setAllTags(await GetAllTags())
      const resolvedLanguages = await Promise.all(languagePromises);
      const initialSelectedLanguages = resolvedLanguages.map(language => language.id);
      setSelectedLanguages(initialSelectedLanguages);
      const resolvedTags = await Promise.all(tagPromises);
      const initialSelectedTags = resolvedTags.map(tag => tag.id);
      setSelectedTags(initialSelectedTags);

      setTitle(userData.title);
      setDescription(userData.description);
      setSalary(userData.salary);
    };
  
    fetchData().catch(console.error);
  }, [id]);
  

  if (data === null || user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Обновить резюме</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
          <form key={data.id} className="mb-4 mt-2 p-3 form-control border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
            <h3>Вакансия: {data.title}</h3>
            <p>Название:</p>
            <input type='text' className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />    
            <p className='mt-3'> Никнейм: {user.username}</p>
            <p>Имя: {user.full_name}</p>
            <p>Электронная почта: {user.email}</p>
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
            <p>Описание:</p>
            <textarea type="text" className='form-control' name="description" onChange={(e) => setDescription(e.target.value)} value={description} />
            <p>Зарплата:</p>
            <input type="number" className='form-control' name="salary" onChange={(e) => setSalary(e.target.value)} value={salary} />
            <button className="btn btn-primary mt-3" onClick={buttonClick}>Обновить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VacancyUpdatePage;
