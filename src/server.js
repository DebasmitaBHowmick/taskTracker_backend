
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/task"));

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

const PORT=5000;

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});