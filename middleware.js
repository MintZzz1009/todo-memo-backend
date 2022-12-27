const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());  // post, put 전달된 body 데이터를 req.body로 사용할 수 있도록 만든 bodyparser

// 미들웨어
app.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl, ' - ', new Date());
  next();
});

app.use((req, res, next) => {
  console.log('첫번째 미들웨어');
  next();
});

app.use((req, res, next) => {
  console.log('두번째 미들웨어');
  next();
});

app.use((req, res, next) => {
  console.log('세번째 미들웨어');
  next();
});

// print: 첫번째 미들웨어
// print: 두번째 미들웨어
// print: 세번째 미들웨어

const port = 8080;
app.listen(port, () => {
  console.log(port,"번 포트로 서버가 켜졌어요!");
}); 