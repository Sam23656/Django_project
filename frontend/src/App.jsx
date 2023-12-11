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
import LanguageUpdatePage from './components/Language/LanguageUpdate';
import LanguageDeletePage from './components/Language/LanguageDelete';
import AddLanguagePage from './components/Language/LanguageAdd';
import ChatPage from './components/Chat/Chat';
import AdminPanelPage from './components/Admin/AdminPanel';
import Header from './components/Start_Page/Header';
import AddTagPage from './components/Tag/TagAdd';
import TagDeletePage from './components/Tag/TagDelete';
import TagUpdatePage from './components/Tag/TagUpdate';

function App() {
  cleanExpiresCookies()
  return(
  <div className="App bg-dark" data-bs-theme="dark" style={{color: "white"}}>
    <Header />
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

      <Route path='/Admin' element={<AdminPanelPage />} />

      <Route path='/Admin/LanguageUpdate' element={<LanguageUpdatePage />} />
      <Route path='/Admin/LanguageDelete' element={<LanguageDeletePage />} />
      <Route path='/Admin/LanguageAdd' element={<AddLanguagePage />} />

      <Route path='/Admin/TagAdd' element={<AddTagPage />} />
      <Route path='/Admin/TagDelete' element={<TagDeletePage />} />
      <Route path='/Admin/TagUpdate' element={<TagUpdatePage />} />

    </Routes>
    </Router>
  </div>
  )
}

export default App;
