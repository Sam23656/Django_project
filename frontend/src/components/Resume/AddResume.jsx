import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CreateResume from '../../api/Resume/CreateResume'; 
import GetAllLanguages from '../../api/Language/GetAllLanguages';
import GetAllTags from '../../api/Tag/GetAllTags';

function AddResumePage() {
  const [allLanguages, setAllLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [social_links, setSocial_links] = useState('');
  const [additional_info, setAdditional_info] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const navigate = useNavigate();

  const buttonClick = async (e) => {
    e.preventDefault();
    try {
      await CreateResume(
        Cookies.get('id'),
        Cookies.get('access_token'),
        selectedTags,
        selectedLanguages,
        education,
        experience,
        social_links,
        additional_info
      );
      navigate('/AllResume'); 
    } catch (error) {
      console.error('Error creating resume:', error);
      alert('Error creating resume. Please try again.');
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

  useEffect(() => {
    const fetchData = async () => {
      setAllLanguages(await GetAllLanguages());
      setAllTags(await GetAllTags());
    };

    fetchData().catch(console.error);
  }, []);

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
            placeholder="Search languages"
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
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" >Save changes</button>
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
            placeholder="Search tags"
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
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" >Save changes</button>
      </div>
    </div>
  </div>
</div>

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
            <p>Образование:</p>
            <textarea type="text" className='form-control' name="education" onChange={(e) => setEducation(e.target.value)} />
            <p>Опыт работы:</p>
            <textarea type="text" className='form-control' name="experience" onChange={(e) => setExperience(e.target.value)} />
            <p>Социальные сети:</p>
            <textarea type="text" className='form-control' name="social_links" onChange={(e) => setSocial_links(e.target.value)} />
            <p>Дополнительная информация:</p>
            <textarea type="text" className='form-control' name="additional_info" onChange={(e) => setAdditional_info(e.target.value)} />
            <button className="btn btn-primary mt-3" onClick={buttonClick}>
              Создать
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddResumePage;
