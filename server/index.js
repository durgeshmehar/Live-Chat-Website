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
app.use(express.static(path.join(__dirname, "dist")));

app.use("/user", userRouter);
app.use("/message", messageRouter);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

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
    origin: "http://durgeshchat.vercel.app/",
    // origin: "http://localhost:5000/",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket"],
  },
  allowEIO3: true,
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

  socket.on("disconnect", (reason, details) => {
    // the reason of the disconnection, for example "transport error"
    console.log(reason);

    // the low-level reason of the disconnection, for example "xhr post error"
    console.log(details.message);

    // some additional description, for example the status code of the HTTP response
    console.log(details.description);

    // some additional context, for example the XMLHttpRequest object
    console.log(details.context);
  });
});
