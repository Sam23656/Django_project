import React, { useState, useEffect } from 'react';
import GetChats from '../../api/Chat/GetChats';
import Cookies from 'js-cookie';
import get_user_data from '../../api/Auth/get_user_data';
import useWebSocket from '../../websocket/UseWebsocket';
import GetChatMessages from '../../api/Chat/GetChatMessages';

function ChatPage() {
  const [chats, setChats] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [initialMessages, setInitialMessages] = useState([]);
  const { socket, messages, sendMessage } = useWebSocket(
    selectedChat,
    initialMessages
  );
  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      sendMessage(messageInput);
      setMessageInput('');
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let chats = await GetChats();
        chats = chats.filter(
          (chat) =>
            chat.first_user == Cookies.get('id') ||
            chat.second_user == Cookies.get('id')
        );

        const updatedChats = await Promise.all(
          chats.map(async (chat) => {
            const firstUserData = await get_user_data(chat.first_user);
            const secondUserData = await get_user_data(chat.second_user);

            chat.first_user = firstUserData;
            chat.second_user = secondUserData;
            return chat;
          })
        );

        setChats(updatedChats);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      if (selectedChat) {
        const messages = await GetChatMessages(selectedChatId);
        setInitialMessages(messages);
      }
    };
  
    fetchInitialMessages();
  }, [selectedChat]);

  const [sendersData, setSendersData] = useState({});

  useEffect(() => {
    const fetchSendersData = async () => {
      const senders = new Set(messages.map((message) => message.sender));
  
      const sendersDetails = await Promise.all(
        Array.from(senders).map(async (senderId) => {
          try {
            if (senderId && !sendersData[senderId]) {
              const userData = await get_user_data(senderId);
              return { [senderId]: userData };
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
          }
          return null;
        })
      );
  
      const newSendersData = Object.assign({}, ...sendersDetails.filter(Boolean));
      setSendersData((prevSendersData) => ({
        ...prevSendersData,
        ...newSendersData,
      }));
    };
  
    fetchSendersData();
  }, [messages]);
  

  

  if (chats === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='d-flex'>
        <div
          className='d-flex flex-column flex-wrap justify-content-center align-items-start ms-2'
          style={{
            width: '30%',
            height: '100%',
            margin: 'auto',
            minHeight: '85vh',
          }}
        >
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`mb-4 mt-2 p-3 border rounded d-flex flex-column justify-content-center align-items-center ${
                selectedChat === `${chat.first_user.id}${chat.second_user.id}`
                  ? 'border-primary'
                  : ''
              }`}
              style={{
                width: '30%',
                margin: '10px',
                boxShadow: '5px 10px 8px rgba(0, 0, 1, .3)',
              }}
              onClick={() =>{
                setSelectedChat(
                  `${chat.first_user.id}${chat.second_user.id}`
                )
                setSelectedChatId(chat.id)
              }
              }
            >
              <p className='mt-3'>
                {chat.second_user && chat.second_user.username}
              </p>
            </div>
          ))}
        </div>
        <div
          className='d-flex flex-column flex-wrap justify-content-center align-items-start ms-2'
          style={{
            width: '30%',
            height: '100%',
            margin: 'auto',
            minHeight: '85vh',
          }}
        >
          {selectedChat && (
            <>
              <div className='mb-3 '>
                {messages.map((message, index) => (
                  <div key={index}>
                  <strong>{sendersData[message.sender] ? sendersData[message.sender].username : message.username}:</strong> {message.message}
                  </div>
                ))}
              </div>
              <div className='mb-3 d-flex'>
                <input
                  type='text'
                  placeholder='Type your message...'
                  className='form-control'
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button
                  className='ms-2 btn btn-primary'
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
