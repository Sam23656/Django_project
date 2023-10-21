import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
function App() {
  return(
  <div className="App">
    <Router>
    <Routes>
      <Route path='/Login' element={<Login />} />
      <Route path='/Logout' element={<Logout />} />
    </Routes>
    </Router>
  </div>
  )
}

export default App;
