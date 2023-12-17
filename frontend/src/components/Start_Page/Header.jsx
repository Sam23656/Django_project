import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import './Header.scss'


function Header() {
    return (
        <nav  className="navbar navbar-expand navbar-dark bg-dark " aria-label="Second navbar example">
        <div className="container-fluid ">
          <a style={{fontSize: "30px"}} className="navbar-brand mb-3 text-primary" href="/">JobPulse</a>
          <div className="collapse navbar-collapse">
          <ul className="d-flex flex-row navbar-nav me-auto mb-auto">
          <li className="nav-item dropdown ">
                  <button className="btn btn-dark dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">Общее</button>
                  <ul className='dropdown-menu dropdown-menu-dark' >
                  <li className="dropdown-item">
                    <a className="nav-link active" aria-current="page" href="/">
                      Главная
                    </a>
                  </li>
                  <li className="dropdown-item">
                    <a className="nav-link active" aria-current="page" href="/AllVacancies">
                      Вакансии
                    </a>
                  </li>
                  <li className="dropdown-item">
                    <a className="nav-link active" aria-current="page" href="/AllResume">
                      Резюме
                    </a>
                  </li>
                  </ul>
            </li>
          {Cookies.get("access_token") && (
            <>
              {Cookies.get("user_role") === "admin" || Cookies.get("user_role") === "job_seeker" ? (
                <li className="nav-item dropdown">
                  <button  className="btn btn-dark dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">Соискатель</button>
                  <ul className='dropdown-menu dropdown-menu-dark'>
                  <li className="dropdown-item">
                    <a className="nav-link active" aria-current="page" href="/AddResume">
                      Добавить резюме
                    </a>
                  </li>
                  <li className="dropdown-item">
                    <a className="nav-link active" aria-current="page" href="/Chat">
                      Чат
                    </a>
                  </li>
                  </ul>
                </li>
              ) : (
                <>
                </>
              )}
              {Cookies.get("user_role") === "employer" || Cookies.get("user_role") === "admin" ? (
                <li className="nav-item dropdown">
                  <button  className="btn btn-dark dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">Работодатель</button>
                  <ul className='dropdown-menu dropdown-menu-dark'>
                  <li className="dropdown-item">
                    <a className="nav-link active" aria-current="page" href="/AddVacancy">
                      Добавить вакансию
                    </a>
                  </li>
                  <li className="dropdown-item">
                    <a className="nav-link active" aria-current="page" href="/YourVacancy">
                      Ваши вакансии
                    </a>
                  </li>
                  {Cookies.get("user_role") === "admin" ? (
                    <></>
                  ) : (
                  <li className="dropdown-item">
                    <a className="nav-link active" aria-current="page" href="/Chat">
                      Чат
                    </a>
                  </li>
                  )}
                  </ul>
                </li>) : (
                <>
                </>)}
                {Cookies.get("user_role") === "admin" || Cookies.get("user_role") === "moderator" ? (
              <>
              <li className="nav-item ">
                <a className="nav-link active mb-3 " aria-current="page" href="/Admin">
                  Админ панель
                </a>
              </li>
            </>
          ) : (
            <>
            </>
          )}
            </>
          )}
        </ul>

            <ul className="navbar-nav mb-2 mb-lg-0">
            {Cookies.get("access_token") ? (
            <>
            <li className="nav-item">
              <p className="ms-2"><a className="btn btn-primary rounded rounded-pill " href="/Profile">Профиль</a></p>
            </li>
            <li className="nav-item">
               <p className="ms-2"><a className="btn btn-danger rounded rounded-pill  " href="/Logout">Выйти</a></p>
            </li>
            </>
            ) : (
            <>
           <li className="nav-item">
               <p className="ms-2"><a className="btn btn-primary rounded rounded-pill " href="/Login">Войти</a></p>
           </li>
           <li className="nav-item">
           <p className="ms-2"><a className="btn btn-primary rounded rounded-pill header-button-register" href="/Register">Зарегистрироваться</a></p>
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
