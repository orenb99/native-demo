require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./routes/index");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use("/api", api);
app.get("/", (req, res) => {
  res.send("yes");
});
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
