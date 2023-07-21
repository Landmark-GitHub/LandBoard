import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(`http://localhost:3001`);

export default function Test() {
  const [username, setUsername] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [login, setLogin] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleJoinGame = () => {
    socket.emit('login', username);
    setLogin(true);
  };

  useEffect(() => {
    socket.on('updateUsers', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off('updateUsers'); // Unsubscribe จาก event เมื่อ component unmount
    };
  }, []);

  return (
    <div className='bg-red-300 p-2'>
      <h1>Welcome to the Game</h1>
      {
        login ? 
        <label>
          <label>{username}</label> 
          <button onClick={handleJoinGame}>Out Game</button>  
        </label>
        : 
        <label>
          <input type="text" value={username} onChange={handleUsernameChange} />
          <button onClick={handleJoinGame}>Join Game</button>
        </label>
      }


      <h2>Online Users</h2>
      <ul>
        {onlineUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
