require("dotenv").config();
const express = require("express");
const cors = require("cors");
const moongose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");
const socket = require("socket.io");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/message", messageRouter);

app.use(express.static(path.join(__dirname,"..","frontend","dist")));
app.use("*", (req, res) => {
  console.log("path :",path.join(__dirname,"..","frontend","dist", "index.html"))

  res.sendFile(path.join(__dirname,"..","frontend","dist", "index.html"));
});
// app.use(express.static(path.join(__dirname,"dist")));
// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname,"dist", "index.html"));
// });

moongose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected ");
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
const io = socket(server, {
  cors: {
    // origin:"http://localhost:5000/",
    origin:"https://chat-app-2893.onrender.com/",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket"],
  },
  allowEIO3: true,
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {

  socket.on("add-user", (userId) => {
    if(!onlineUsers.has(userId)){
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);
  });

  socket.on("send-message", (data) => {
    const sendSocketIds = onlineUsers.get(data.to);
    if (sendSocketIds) {
      sendSocketIds.forEach((socketId) => {
        socket.to(socketId).emit("receive-message", data);
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers.forEach((sockets, userId) => {
      sockets.delete(socket.id);
      if (sockets.size === 0) {
        onlineUsers.delete(userId);
      }
    });
  });
});
