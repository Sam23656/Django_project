import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../Start_Page/Header";
import GetChats from '../../api/Chat/GetChats';
import Cookies from 'js-cookie';
import get_user_data from '../../api/Auth/get_user_data';

function ChatPage() {
  const [chats, setChats] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const socketConnect = (id) => {
    if (selectedChat) {
      const authToken = Cookies.get('access_token');
      const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${id}/?Token=${authToken}`);
      socket.onopen = () => {
        console.log('Socket connected');
      };
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
      };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let chats = await GetChats();
      chats = chats.filter(chat => chat.first_user == Cookies.get('id') || chat.second_user == Cookies.get('id'));

      const updatedChats = await Promise.all(chats.map(async chat => {
        const firstUserData = await get_user_data(chat.first_user);
        const secondUserData = await get_user_data(chat.second_user);

        chat.first_user = firstUserData;
        chat.second_user = secondUserData;
        console.log(chat)
        return chat;
      }));

      setChats(updatedChats);
    };

    fetchData().catch(console.error);

  }, []);

  if (chats === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className='d-flex'>
        <div className="d-flex flex-column flex-wrap justify-content-center align-items-start ms-2" style={{ width: "30%", height: "100%", margin: "auto", minHeight: "85vh" }}>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`mb-4 mt-2 p-3 border rounded d-flex flex-column justify-content-center align-items-center ${selectedChat === `${chat.first_user.id}${chat.second_user.id}` ? 'border-primary' : ''}`}
              style={{ width: "30%", margin: "10px", boxShadow: "5px 10px 8px rgba(0, 0, 1, .3)" }}
              onClick={() => setSelectedChat(`${chat.first_user.id}${chat.second_user.id}`)}
            >
              <p className='mt-3'>{chat.second_user && chat.second_user.username}</p>
            </div>
          ))}
        </div>
        <div className="d-flex flex-column flex-wrap justify-content-center align-items-start ms-2" style={{ width: "30%", height: "100%", margin: "auto", minHeight: "85vh" }}>

        </div>
      </div>
    </div>
  );
}

export default ChatPage;
