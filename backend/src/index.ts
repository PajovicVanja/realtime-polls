// src/index.ts
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app'; // Import the app from app.ts

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('joinPoll', (pollId: string) => {
    socket.join(pollId);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
