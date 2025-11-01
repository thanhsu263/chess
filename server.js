const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Khi người chơi kết nối
io.on("connection", socket => {
  console.log("a user connected", socket.id);

  socket.on("joinGame", roomId => {
    socket.join(roomId);
    console.log(`user ${socket.id} joined room ${roomId}`);
  });

  socket.on("move", data => {
    // Gửi nước đi cho người chơi khác trong cùng phòng
    socket.to(data.roomId).emit("opponentMove", data);
  });

  socket.on("disconnect", () => console.log("user disconnected"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
