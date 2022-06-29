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

app.use((req, res, next) => {
  req.socket = io;
  next();
});

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("socket");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
