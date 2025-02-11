// src/index.ts
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app'; // Import the app from app.ts

// Create HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.io and attach it to the server
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Optionally attach the Socket.io instance to the app (so routes can access it if needed)
app.set('socketio', io);

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('joinPoll', (pollId: string) => {
    socket.join(pollId);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
