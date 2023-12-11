import React, { useState, useEffect } from 'react';
import get_user_data from "../../api/Auth/get_user_data";
import Cookies from "js-cookie";

function ProfilePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await get_user_data(Cookies.get("id"), Cookies.get("access_token"));
      setData(userData);
    };

    fetchData().catch(console.error);
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <div style={{marginTop: "140px", width: "50%"}} className="border d-flex flex-column align-items-center border-primary rounded-3">
          <h1 className="ms-3 me-3">Профиль</h1>
          <p>Никнейм: {data.username}</p>
          <p>Имя: {data.full_name}</p>
          <p>Электронная почта: {data.email}</p>
          <p>Дата рождения: {data.birth_date ? data.birth_date : 'None'}</p>
          <p>Роль: {data.role}</p>

        </div>
      </div>
    </div>
  )
}

export default ProfilePage;