const express = require('express');
const app = express();
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = 3000;
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

app.get("/", (req, res) => { res.status(200).send("set-cookie test") })


// 클라이언트에 쿠키 할당하기 - Set-Cookie 헤더를 생성 -> 헤더값으로 쿠키를 할당
// 즉 응답시 res.cookie() 메서드를 통해서 { 헤더 생성, 쿠키 설정, 쿠키 할당 } 실행됨.
// res.writeHead() 메서드도 사용가능하지만 복잡하고 가독성이 떨어짐.
app.get("/set-cookie", (req, res) => {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.
  
  res.cookie(`id`,`testId`, { expires });
  const cookie = req.cookies;
  console.log(cookie); 
  return res.status(200).json(cookie);
});

// 클라이언트가 보낸 requset의 header에 들어있는 쿠키를 받아서 출력하기
// cookie-parser 라이브러리 사용 -> req.cookies 로 쿠키에 접근.
app.get("/get-cookie", (req, res) => {
  const cookie = req.cookies; // { id: 'testId' }
  console.log(cookie)
  return res.status(200).json({cookie});
})

