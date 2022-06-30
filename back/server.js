require("dotenv").config();
const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./routes/index");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use("/api", api);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:19006/",
  },
});

io.on("connection", (socket) => {
  console.log("connected");
});
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.set("io", io);

httpServer.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
