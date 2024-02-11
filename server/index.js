require("dotenv").config();
const express = require("express");
const cors = require("cors");
const moongose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");
const socket = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/message", messageRouter);

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
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-message", (data) => {
    const sendUserMsg = onlineUsers.get(data.to);
    if (sendUserMsg) {
      socket.to(sendUserMsg).emit("receive-message", data.message);
    }
  });
});
