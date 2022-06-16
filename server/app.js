const express = require("express");
const http = require("http");
const router = require("./router");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const PORT = process.env.PORT || 4000;
const { addUser, removeUser, getUsersInRoom, getUser } = require("./users");
app.use(router);
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room }, callback);
    console.log(error, user);
    if (error) return callback(error);
    socket.emit("message", {
      user: "admin",
      text: `${name}, welcome to the room ${room}`,
    });
    socket.broadcast
      .to(room)
      .emit("message", { user: "admin", text: `${name}, has joined` });
    socket.join(room);
    callback();
  });

  socket.on("sendMessge", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`SERVER IS LISTING ON PORT ${PORT}`);
});
