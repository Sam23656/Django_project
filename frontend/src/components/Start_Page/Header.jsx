import Cookies from 'js-cookie';
import React from 'react';


function Header() {
    return (
        <nav  className="navbar navbar-expand navbar-dark bg-dark" aria-label="Second navbar example">
        <div className="container-fluid ">
          <a className="navbar-brand mb-3" href="/">Logo</a>
          <div className="collapse navbar-collapse">
          <ul className="d-flex flex-row navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link active mb-3" aria-current="page" href="/">
              Главная
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active mb-3" aria-current="page" href="/AllVacancies">
              Вакансии
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active mb-3" aria-current="page" href="/AllResume">
              Резюме
            </a>
          </li>
          {Cookies.get("access_token") && (
            <>
              {Cookies.get("user_role") === "admin" || Cookies.get("user_role") === "job_seeker" ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link active mb-3" aria-current="page" href="/AddResume">
                      Добавить резюме
                    </a>
                  </li>
                </>
              ) : (
                <>
                </>
              )}
              {Cookies.get("user_role") === "employer" || Cookies.get("user_role") === "admin" ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link active mb-3" aria-current="page" href="/AddVacancy">
                      Добавить вакансию
                    </a>
                  </li>
                </>) : (
                <>
                </>)}
            </>
          )}
        </ul>

            <ul className="navbar-nav mb-2 mb-lg-0">
            {Cookies.get("access_token") ? (
            <>
            <li className="nav-item">
              <p className="ms-2"><a className="btn btn-primary" href="/Profile">Профиль</a></p>
            </li>
            <li className="nav-item">
               <p className="ms-2"><a className="btn btn-primary" href="/Logout">Выйти</a></p>
            </li>
            </>
            ) : (
            <>
           <li className="nav-item">
               <p className="ms-2"><a className="btn btn-primary" href="/Login">Войти</a></p>
           </li>
           <li className="nav-item">
           <p className="ms-2"><a className="btn btn-primary" href="/Register">Зарегистрироваться</a></p>
           </li>
           </>
            )
        }
        </ul>
          </div>
        </div>
      </nav>
    );
}

export default Header;
