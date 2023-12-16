import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function useWebSocket(selectedChat, initialMessages) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (selectedChat) {
      const authToken = Cookies.get('access_token');
      const newSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${selectedChat}/?Token=${authToken}`
      );

      newSocket.onopen = () => {
        console.log('Socket connected');
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      setSocket(newSocket);
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [selectedChat]);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message: `${message}`, sender: Cookies.get('id') }));
    }
  };

  return { socket, messages, sendMessage };
}

export default useWebSocket;
