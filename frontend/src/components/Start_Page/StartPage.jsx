import { useState, useEffect } from "react";
import GetAllVacancies from "../../api/Vacancy/GetAllVacancies";
import GetAllResume from "../../api/Resume/GetAllResume";
import GetAllLanguages from "../../api/Language/GetAllLanguages";
import GetLanguage from "../../api/Language/GetLanguage";
import Cookies from "js-cookie";
import logIn from "../../api/Auth/log_in";
import { Link } from "react-router-dom";

function StartPage() {
  const [data, setData] = useState(null);
  const [vacancies, setVacancies] = useState(null);
  const [popularLanguages, setPopularLanguages] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonClick = async (e) => {
    e.preventDefault();
    await logIn(email, password);
    window.location.reload();
  };

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
    <div className="bg-secondary-subtle form-control border border-primary" style={{ height: "88vh" }}>
      <div className="d-flex flex-column  align-items-center bg-secondary-subtle">
        <div className="mt-5 ms-3 align-self-start">
          <h1 style={{ fontSize: "65px" }}>Работа найдётся для каждого</h1>
          <p style={{ fontSize: "40px" }}>Найди работу и начинай зарабатывать деньги</p>
        </div>

        <div className=""style={{ width: "100%", marginTop: "150px", height: "50vh"}}>
          {Cookies.get("access_token") ? (
            <div className="d-flex ms-3 me-3 flex-column align-self-start justify-content-center border border-primary  bg-dark rounded " >
                <div>
                <div className="mt-3">
                    <h2 className="ms-3">Последние Вакансии:</h2>
                    <div className="d-flex flex-wrap justify-content-center">
                      {vacancies.slice(-10).reverse().map((vacancy) => (
                        <Link key={vacancy.id} to={`VacancyDetail?id=${vacancy.id}`} className="m-3 p-3  border border-primary rounded bg-secondary-subtle" style={{ maxwidth: "350px", maxHeight: "100px", textDecoration: "none"}} >
                          <h3 className="text-light">{vacancy.title}</h3>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 d-flex ms-3  align-items-center justify-content-center">
                    <p className="form-control bg-secondary-subtle border border-primary" style={{ width: "250px" }}>Количество вакансий: {vacancies.length}</p>
                    <p className="ms-5 form-control bg-secondary-subtle border border-primary" style={{ width: "250px" }}>Количество резюме: {data.length}</p>
                </div>
                </div>
                <div className="mt-3">
                  <h2 className="ms-3">Популярны языки:</h2>
                  <div className="d-flex flex-wrap justify-content-center">
                    {Object.entries(popularLanguages).map(([language, count]) => (
                      <p key={language.id} className="m-3 p-3 border border-primary rounded bg-secondary-subtle" style={{ maxwidth: "350px", maxHeight: "100px", textDecoration: "none"}} >
                        {language}: {count}
                      </p>
                    ))}
                  </div>
                </div>
                </div>
                <div className="mt-3 d-flex ms-3   align-items-center justify-content-center">
                  <p className="form-control border border-primary bg-secondary-subtle" style={{ width: "250px" }}>Количество вакансий: {vacancies.length}</p>
                  <p className="ms-5 form-control border border-primary bg-secondary-subtle" style={{ width: "250px" }}>Количество резюме: {data.length}</p>
                </div>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center ms-3" >
              <div className="d-flex flex-column align-items-center justify-content-center ">
                <form className="d-flex flex-column align-items-center justify-content-center">
                  <div className="mb-4" style={{ width: "350px" }}>
                    <input className="form-control" style={{ height: "55px" }} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" name="email" />
                  </div>
                  <div className="mb-4" style={{ width: "350px" }}>
                    <input className="form-control" style={{ height: "55px" }} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" type="password" name="password" />
                  </div>
                  <button style={{ width: "350px", height: "55px" }} onClick={(e) => buttonClick(e)} className="btn btn-primary rounded rounded-pill">Войти</button>
                </form>
              </div>
              <div className="mt-3 d-flex ms-3 bg-secondary-subtle align-items-center justify-content-center">
                  <p className="form-control border border-primary bg-secondary-subtle" style={{ width: "250px" }}>Количество вакансий: {vacancies.length}</p>
                  <p className="ms-5 form-control border border-primary bg-secondary-subtle" style={{ width: "250px" }}>Количество резюме: {data.length}</p>
                </div>
            </div>)}
        </div>
      </div>

    </div>
  );
}

export default StartPage;
