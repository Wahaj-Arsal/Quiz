const express = require("express");
const cors = require("cors");
const fs = require("fs");

const SERVER_URL = process.env.SERVER_URL || "http://localhost:8080";
const PORT = process.env.PORT || 8080;

const app = express();

app.listen(PORT, () => {
  console.log("Server is running on PORT " + `${PORT}`);
});

app.use(cors());
app.use(express.json());

app.get("/quiz", (req, res) => {
  const sendData = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));
  res.send(sendData);
});

app.get(`/quiz/:quizId`, (req, res) => {
  const { quizId } = req.params;
  // console.log(quizId);
  const data = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));
  // console.log(data);
  const filteredData = data.find((quiz) => quiz.id === quizId);
  // console.log(filteredData);
  res.send(filteredData.quizQuestionsList);
});
