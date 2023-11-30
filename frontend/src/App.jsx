import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Register from './components/Auth/Register';
import StartPage from './components/Start_Page/StartPage';
import main from './Cookies/clean_cookies';
function App() {
  main()
  return(
  <div className="App">
    <Router>
    <Routes>
      <Route path='/' element={<StartPage />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Logout' element={<Logout />} />
      <Route path='/Register' element={<Register />} />
    </Routes>
    </Router>
  </div>
  )
}

export default App;
