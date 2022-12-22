const express = require('express');
const app = express();
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = 3000;
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});


// 세션 값을 설정하여 서버에 저장하는 api -> 최초 로그인시 필요
let session = {}; //빈 객체를 전역변수로 session 객체 생성.
app.get('/set-session', function (req, res, next) {
  const content = 'Haksoo\'s session test.';
  const uniqueInt = Date.now(); // 1671682541496
  session[uniqueInt] = { content };
  
  console.log(session)  // { '1671682541496': { sessionValue: "Haksoo's session test." } }
  console.log(session[uniqueInt])          // { sessionValue: "Haksoo's session test." }
  console.log(session[uniqueInt].content)              // Haksoo's session test.

  // 클라이언트의 set-session 요청을 받아 
  // 현재 시간을 고유키로 설정하여(uniqueInt = 1671682541496) 
  // 그 키값으로 session에 해당하는 정보를 서버에 저장한다.
  // 그리고 클라이언트에는 고유키값만 쿠키에 담아 전송해준다.

  // 나중에 클라이언트와 통신할 때 쿠키를 통해 고유키에 할당된 키값, 
  // 즉 session 정보를 확인하여 그에 맞추어 응답해준다.

  res.cookie('sessionKey', uniqueInt);
  return res.status(200).json({ sessionKey: uniqueInt });
});


// 세션 키로 클라이언트의 자격을 확인하고 요청에 응답하는 api
app.get('/get-session', function (req, res, next) {
  const { sessionKey } = req.cookies; 
console.log(sessionKey) // 1671684736211
  // req.cookies에는 설정해준 세션키(uniqueInt)가 담겨있다.
  const sessionValue = session[sessionKey]; 
  console.log(sessionValue) // { sessionValue: "Haksoo's session test." }
  // 서버에 저장되어 있는 session 객체에서 해당하는 키값(sessionValue: 'Haksoo's session test.')을 
  // 키(uniqueInt: '1671683689634')를 통해 불러온다.
  return res.status(200).json({ sessionKey: sessionValue });
  // 불러온 session 정보를 클라이언트에 응답해준다.

  // 즉 클라이언트는 로그인을 위해서 브라우저 쿠키에 저장된 session키(uniqueInt)를
  // request.header.cookie에 담아 서버에 요청한다.
  // 서버는 session키를 받아서 해당하는 키값을 response에 실어 응답해준다.
});


// 연습문제
// - GET Method로 http://localhost:3000/set을 호출했을 때, name에 nodejs가 저장된 쿠키를 할당하고
// - GET Method로http://localhost:3000/get을 호출했을 때, 쿠키에 등록된 정보들이 반환되는 API를 만들어주세요!
let haksoo_session = {}
app.get('/set', function (req, res, next) {
  let sessionValue = 'nodejs'

  const uniqueInt = Date.now();
  haksoo_session[uniqueInt] = { 'name': sessionValue }
  
  const expires = new Date()
  expires.setHours(expires.getHours() + 2)

  console.log(haksoo_session) // { '1671707751991': { name: 'nodejs' } }

  res.status(200)
    .cookie('uniqueInt', uniqueInt, { expires })  // uniqueInt=1671707751991; Path=/; Expires=Thu, 22 Dec 2022 13:15:51 GMT
    .send(`세션키 발행: ${uniqueInt}, 유효기간: ${expires}`)
    .end(0)
})


app.get('/get', function (req, res, next) {
  const { uniqueInt } = req.cookies
  console.log(uniqueInt)  // 1671707751991
  const sessionValue = haksoo_session[uniqueInt]   // { 'name': uniqueInt }
  console.log(haksoo_session) // { '1671707751991': { name: 'nodejs' } }
  return res.status(200).json({ uniqueInt: sessionValue }); 
  // "uniqueInt": { "name": "nodejs" }
})

//1671707154436