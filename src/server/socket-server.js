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

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('joinGame', (username) => {
    users.push(username);
    io.emit('updateUsers', users);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    // ถ้าต้องการลบชื่อผู้ใช้ที่ออกจากเกมออกจากอาเรย์ users ให้เพิ่มโค้ดตรงนี้
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
