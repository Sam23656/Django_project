import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GetAllVacancies from "../../api/Vacancy/GetAllVacancies";
import GetAllResume from "../../api/Resume/GetAllResume";
import GetAllLanguages from "../../api/Language/GetAllLanguages";
import GetLanguage from "../../api/Language/GetLanguage";

function StartPage() {
  const [data, setData] = useState(null);
  const [vacancies, setVacancies] = useState(null);
  const [popularLanguages, setPopularLanguages] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await GetAllResume();
        setData(userData);

        const allVacancies = await GetAllVacancies();
        const allLanguages = await GetAllLanguages();
        
        const allVacanciesUpdated = await Promise.all(
          allVacancies.map(async (vacancy) => {
            return {
              ...vacancy,
              languages: await Promise.all(
                vacancy.languages.map(async (language) => await GetLanguage(language))
              ),
            };
          })
        );

        setVacancies(allVacanciesUpdated);

        if (Array.isArray(allLanguages) && allLanguages.length > 0) {
          setPopularLanguages((prev) => {
            return allVacanciesUpdated.reduce((acc, vacancy) => {
              vacancy.languages.slice(0, 10).forEach((language) => {
                acc[language.title] = (acc[language.title] || 0) + 0.5;
              });
              return acc;
            }, { ...prev });
          });
        } else {
          console.error("No languages found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (data === null || vacancies === null) {
    return <div>Loading...</div>;
  }



  return (
    <div className="mt-3 bg-secondary-subtle form-control ms-2 " style={{ height: "100%", width: "99%" }}>
      <div className="d-flex flex-column align-items-center bg-secondary-subtle">
        <div className="mt-5 bg-secondary-subtle border-primary form-control ms-3" style={{ width: "30%" }}>
          <h1>Работа найдётся для каждого</h1>
          <p>Найти работу и зарабатывать деньги</p>
          <p>
            Найти работу{" "}
            <Link className="btn btn-info" to="/AllVacancies">
              здесь
            </Link>
          </p>
          <Link to="/Register" className="btn btn-primary">
            Зарегистрироваться
          </Link>
          <Link to="/Login" className="btn btn-primary ms-2">
            Войти
          </Link>
        </div>
        <div className="mt-5 ms-5 align-self-start d-flex">
          <p className="form-control" style={{ width: "250px" }}>Количество вакансий: {vacancies.length}</p>
          <p className="ms-5 form-control" style={{ width: "250px" }}>Количество резюме: {data.length}</p>
        </div>
      </div>
      <div className="mt-5 bg-secondary-subtle form-control ms-3" style={{ width: "98%" }}>
        <h2>Популярны языки:</h2>
        <div className="d-flex flex-wrap justify-content-center ">
          {Object.entries(popularLanguages).map(([language, count]) => (
            <div className="p-2 form-control" style={{ width: "300px", height: "50px", margin: "10px" }} key={language}>
              {language}: {count}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 bg-secondary-subtle form-control ms-3" style={{ width: "98%" }}>
            <h2>Последние Вакансии:</h2>
            <div className="d-flex flex-wrap justify-content-center ">
            {vacancies.slice(-10).reverse().map((vacancy) => (
              <div className="m-3 form-control" style={{ width: "250px", height: "100px" }} key={vacancy.id}>
                <h3>Название: {vacancy.title}</h3>
                <p>Описание: {vacancy.description}</p>
              </div>
            ))}
            </div>
      </div>
      <div className="d-flex flex-wrap justify-content-center text-secondary mt-2" style={{ height: "30px" }}><p>© 2023 ООО «JobPulse»</p></div>
    </div>
  );
}

export default StartPage;
