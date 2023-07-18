import { Socket } from 'socket.io';

export default function LoginHandler(req, res) {
  if (req.method === 'GET') {
    try {
      if (!res.socket.server.io) {
        const io = new Socket(res.socket.server.httpServer);
        res.socket.server.io = io;

        io.on('connection', (socket) => {
          socket.on("send-message", (obj) => {
            io.emit("receive-message", obj);
          });
        });
      }

      console.log('Setting Socket');
      // res.end();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'เกิดข้อผิดพลาดในการตั้งค่า Socket' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
