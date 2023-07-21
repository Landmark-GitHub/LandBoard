const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

const users = [];
const Hello = 'Hello'

const Room = {
  1:[],
  2:[]
}

function isUsernameInRoom(room, username) {
  return room.some(player => player.name === username);
}

io.on('connection', (socket) => {

  socket.on('connecGame', (username) => {
    if (username && !users.includes(username)) {
      return users.push(username);
    }
    io.emit('setRoom', Room);
    io.emit('updateUser', users);
  });

  socket.on('joinRoom', (data) => {

    console.log({
      name: data.name,
      room: data.room
    })

    const info = {
      id: (Room[data.room].length + 1),
      name: data.name,
      charecter: null,
      winner: false
    }

    //data.room = int => Room
    if (Room[data.room].length < 6 && !isUsernameInRoom(Room[data.room], data.name)) {
      Room[data.room].push(info);
    }

    io.emit('updateRoom', Room);
  });

  // socket.on('joinRoom', (username, selectRoom) => {
  //   if (users.includes(username)) {
  //     if (selectRoom === 1) {
  //       if (Room.Number1.length < 6) {
  //         const data = {
  //           id: Room.Number1.length,
  //           username: username,
  //           character: null,
  //           winner: false
  //         };
  //         Room.Number1.push(data);
  //         io.emit('updateRoom', Room);
  //         socket.emit('joinRoomSuccess', data); // Emit success message to the client
  //       } else {
  //         socket.emit('joinRoomFailed', 'Number1 room is full'); // Emit failure message to the client
  //       }
  //     } else if (selectRoom === 2) {
  //       if (Room.Number2.length < 6) {
  //         const data = {
  //           id: Room.Number2.length,
  //           username: username,
  //           character: null,
  //           winner: false
  //         };
  //         Room.Number2.push(data);
  //         io.emit('updateRoom', Room);
  //         socket.emit('joinRoomSuccess', data); // Emit success message to the client
  //       } else {
  //         socket.emit('joinRoomFailed', 'Number2 room is full'); // Emit failure message to the client
  //       }
  //     }
  //   } else {
  //     socket.emit('joinRoomFailed', 'Username not found'); // Emit failure message to the client
  //   }
  // });
  

  // socket.on('login', (username) => {
  //   users.push(username);
  //   io.emit('updateUsers', users);
  // });

  // socket.on('requestDataFromServer', () => {
  //   // ทำการดึงข้อมูลจาก Server (เพื่อตัวอย่างเท่านั้น)
  //   const serverData = 'ข้อมูลจาก Server';
  //   socket.emit('dataFromServer', serverData);
  // });

  // socket.on('disconnect', () => {
  //   console.log('User disconnected');
  //   // ถ้าต้องการลบชื่อผู้ใช้ที่ออกจากเกมออกจากอาเรย์ users ให้เพิ่มโค้ดตรงนี้
  // });

});


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
