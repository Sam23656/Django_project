import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Register from './components/Auth/Register';
import StartPage from './components/Start_Page/StartPage';
import cleanExpiresCookies from './Cookies/clean_cookies';
import ProfilePage from './components/Profile/ProfilePage';
import AllVacancies from './components/Vacancy/AllVacancies';
import AllResumePage from './components/Resume/AllResume';
import ResumeDetailPage from './components/Resume/ResumeDetail';
import ResumeUpdatePage from './components/Resume/ResumeUpdate';
import ResumeDeletePage from './components/Resume/ResumeDelete';
import AddResumePage from './components/Resume/AddResume';
import VacancyDetailPage from './components/Vacancy/VacancyDetail';
import VacancyDeletePage from './components/Vacancy/VacancyDelete';
import VacancyUpdatePage from './components/Vacancy/VacancyUpdate';
import AddVacancyPage from './components/Vacancy/AddVacancy';
import YourVacanciesPage from './components/Vacancy/YourVacancies';
import CreateJobApplicationPage from './components/JobApplication/CreateJobApplication';
import ChatPage from './components/Chat/Chat';

function App() {
  cleanExpiresCookies()
  return(
  <div className="App bg-dark" data-bs-theme="dark" style={{color: "white"}}>
    <Router>
    <Routes>
      <Route path='/' element={<StartPage />} />

      <Route path='/Login' element={<Login />} />
      <Route path='/Logout' element={<Logout />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/Profile' element={<ProfilePage />} />

      <Route path='/AllVacancies' element={<AllVacancies />} />
      <Route path='/VacancyDetail' element={<VacancyDetailPage />} />
      <Route path='/VacancyDelete' element={<VacancyDeletePage />} />
      <Route path='/VacancyUpdate' element={<VacancyUpdatePage />} />
      <Route path='/AddVacancy' element={<AddVacancyPage />} />
      <Route path='/YourVacancy' element={<YourVacanciesPage />} />

      <Route path='/CreateJobApplication' element={<CreateJobApplicationPage />} />

      <Route path='/AllResume' element={<AllResumePage />} />
      <Route path='/ResumeDetail' element={<ResumeDetailPage />} />
      <Route path='/ResumeUpdate' element={<ResumeUpdatePage />} />
      <Route path='/ResumeDelete' element={<ResumeDeletePage />} />
      <Route path='/AddResume' element={<AddResumePage />} />

      <Route path='/Chat' element={<ChatPage />} />
    </Routes>
    </Router>
  </div>
  )
}

export default App;
