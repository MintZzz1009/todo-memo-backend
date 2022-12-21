const db = require("./models/index");

const express = require("express");
const app = express();

const todosRouter = require("./routes/todos.router.js");

app.use("/api", express.json(), todosRouter);
app.use(express.static("./assets"));
// express.static 정적인 파일을 연결해주는 미들웨어
// 특정 주소로 들어왔을 때, 그 주소가 ./assets 경로 안에 있다면 그 파일로 연결해줘라

const port = 8080;
app.listen(port, () => {
  console.log("서버가 켜졌어요!");
}); 