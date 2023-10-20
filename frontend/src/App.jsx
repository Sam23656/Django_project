import { useState, useEffect } from 'react';
import './App.scss';
import get_users from './api/get_users';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_users();
        setUsers(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <p>Пользователи:</p>
      <ul>
      {users.map((user, index) => (
        <li key={`${index}`}>{user.username}</li>
      ))}
</ul>

    </>
  );
}

export default App;
