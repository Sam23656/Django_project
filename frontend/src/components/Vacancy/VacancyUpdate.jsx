import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import GetVacancyDetail from '../../api/Vacancy/GetVacancyDetail';
import get_user_data from '../../api/Auth/get_user_data';
import UpdateVacancy from '../../api/Vacancy/UpdateVacancy';
import GetAllLanguages from '../../api/Language/GetAllLanguages';
import GetLanguage from '../../api/Language/GetLanguage';
import GetAllTags from '../../api/Tag/GetAllTags';
import GetTag from '../../api/Tag/GetTag';
import GetAllFrameworks from '../../api/Framework/GetAllFrameworks';
import GetFramework from '../../api/Framework/GetFramework';

function VacancyUpdatePage() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [allLanguages, setAllLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allFrameworks, setAllFrameworks] = useState([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const idString = searchParams.get('id');
  const id = JSON.parse(decodeURIComponent(idString));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [filteredFrameworks, setFilteredFrameworks] = useState([]);
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
        selectedLanguages,
        selectedFrameworks
      );
      navigate(`/VacancyDetail/?id=${id}`);
    }catch (error) {
      alert('Skill и Language и Framework не должны быть пустыми');
    }
      
    } else {
      alert('Вы не можете редактировать эту вакансию');
    }
  };
  
  const handleSearchLanguages = (query) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = allLanguages.filter((language) =>
      language.title.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredLanguages(filtered);
  };

  const handleSearchTags = (query) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = allTags.filter((tag) =>
      tag.title.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredTags(filtered);
  }

  const handleSearchFrameworks = (query) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = allFrameworks.filter((framework) =>
    framework.title.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredFrameworks(filtered);
  }

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

      const frameworkPromises = userData.frameworks.map(async (framework) => {
        const data = await GetFramework(framework);
        return data;
      })
  
      setAllLanguages(await GetAllLanguages());
      setAllFrameworks(await GetAllFrameworks());
      setAllTags(await GetAllTags())
      const resolvedLanguages = await Promise.all(languagePromises);
      const initialSelectedLanguages = resolvedLanguages.map(language => language.id);
      const resolvedFrameworks = await Promise.all(frameworkPromises);
      setSelectedLanguages(initialSelectedLanguages);
      const resolvedTags = await Promise.all(tagPromises);
      const initialSelectedTags = resolvedTags.map(tag => tag.id);
      const initialSelectedFrameworks = resolvedFrameworks.map(framework => framework.id);
      setSelectedTags(initialSelectedTags);
      setSelectedFrameworks(initialSelectedFrameworks);
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

<div className="modal fade" id="LanguageModal" tabIndex="-1" aria-labelledby="LanguageModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="LanguageModalLabel">Языки Программирования</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="LanguageForm" className="modal-body">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск языков"
            onChange={(e) => handleSearchLanguages(e.target.value)}
          />
        </div>
        <div className='d-flex flex-wrap mt-2'>
          {filteredLanguages.map((language, index) => (
            <div key={index}>
              <input
                type="checkbox"
                className="btn-check rounded-pill"
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
      </form>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" >Применить</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="TagModal" tabIndex="-1" aria-labelledby="TagModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="TagModalLabel">Теги</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="TagForm" className="modal-body">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск тегов"
            onChange={(e) => handleSearchTags(e.target.value)}
          />
        </div>
        <div className='d-flex flex-wrap mt-2'>
          {filteredTags.map((tag, index) => (
            <div key={index}>
              <input
                type="checkbox"
                className="btn-check rounded-pill"
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
      </form>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" >Применить</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="FrameworkModal" tabIndex="-1" aria-labelledby="FrameworkModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="FrameworkModalLabel">Теги</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="FrameworkForm" className="modal-body">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск фреймворков"
            onChange={(e) => handleSearchFrameworks(e.target.value)}
          />
        </div>
        <div className='d-flex flex-wrap mt-2'>
          {filteredFrameworks.map((framework, index) => (
            <div key={index}>
              <input
                type="checkbox"
                className="btn-check rounded-pill"
                id={`frameworkCheckbox${index}`}
                autoComplete="off"
                checked={selectedFrameworks.includes(framework.id)}
                onChange={() => {
                  const updatedFrameworks = selectedFrameworks.includes(framework.id)
                    ? selectedFrameworks.filter((id) => id !== framework.id)
                    : [...selectedFrameworks, framework.id];
                  setSelectedFrameworks(updatedFrameworks);
                }}
              />
              <label className="ms-2 btn btn-outline-primary" htmlFor={`frameworkCheckbox${index}`}>
                {framework.title}
              </label>
            </div>
          ))}
        </div>
      </form>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" >Применить</button>
      </div>
    </div>
  </div>
</div>

      <div className="d-flex flex-column align-items-center flex-wrap">
        <h1 className="ms-3 me-3">Обновить вакансию</h1>
        <div style={{ marginTop: "140px", width: "100%" }} className="d-flex flex-wrap justify-content-center border-primary rounded-3">
          <form key={data.id} className="mb-4 mt-2 p-3 form-control border-primary border rounded" style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}>
            <h3>Вакансия: {data.title}</h3>
            <p>Название:</p>
            <input type='text' className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />    
            <p className='mt-3'> Никнейм: {user.username}</p>
            <p>Имя: {user.full_name}</p>
            <p>Электронная почта: {user.email}</p>
            <p>Языки программирования:</p>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#LanguageModal">
              Выбрать языки
            </button>
            <br />
            {selectedLanguages.length > 0 ? (
              <div className="btn-group mt-2" role="group" aria-label="Basic checkbox toggle button group">
                {allLanguages.map((language, index) => (
                  selectedLanguages.includes(language.id) ? (
                    <div key={index}>
                      <input
                        type="checkbox"
                        className="btn-check"
                        id={`languageCheckbox${index}`}
                        autoComplete="off"
                        checked={true}
                        onChange={() => {
                          setSelectedLanguages(selectedLanguages.filter((id) => id !== language.id));
                        }}
                      />
                      <label className="ms-2 btn btn-outline-primary" htmlFor={`languageCheckbox${index}`}>
                        {language.title}
                      </label>
                    </div>
                  ) : null
                ))}
              </div>
            ) : null}


            <p>Тэги:</p>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#TagModal">
              Выбрать теги
            </button>
            <br />
            {selectedTags.length > 0 ? (
              <div className="btn-group mt-2" role="group" aria-label="Basic checkbox toggle button group">
                {allTags.map((tag, index) => (
                  selectedTags.includes(tag.id) ? (
                    <div key={index}>
                      <input
                        type="checkbox"
                        className="btn-check"
                        id={`tagCheckbox${index}`}
                        autoComplete="off"
                        checked={true}
                        onChange={() => {
                          setSelectedTags(selectedTags.filter((id) => id !== language.id));
                        }}
                      />
                      <label className="ms-2 btn btn-outline-primary" htmlFor={`tagCheckbox${index}`}>
                        {tag.title}
                      </label>
                    </div>
                  ) : null
                ))}
              </div>
            ) : null}

            <p>Фреймворки:</p>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#FrameworkModal">
              Выбрать фреймворки
            </button>
            <br />
            {selectedFrameworks.length > 0 ? (
              <div className="btn-group mt-2" role="group" aria-label="Basic checkbox toggle button group">
                {allFrameworks.map((framework, index) => (
                  selectedFrameworks.includes(framework.id) ? (
                    <div key={index}>
                      <input
                        type="checkbox"
                        className="btn-check"
                        id={`frameworkCheckbox${index}`}
                        autoComplete="off"
                        checked={true}
                        onChange={() => {
                          setSelectedFrameworks(selectedFrameworks.filter((id) => id !== framework.id));
                        }}
                      />
                      <label className="ms-2 btn btn-outline-primary" htmlFor={`frameworkCheckbox${index}`}>
                        {framework.title}
                      </label>
                    </div>
                  ) : null
                ))}
              </div>
            ) : null}

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
