const express = require('express');
const app = express();
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const jwt = require("jsonwebtoken");
const SECRET_KEY = `My Super Seceret Code SPARTA`;

const port = 3000;
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

app.get("/", (req, res) => res.status(200).send("jwt quiz practice"))

let tokenObject = {};

app.post("/set-key", (req, res) => {
   const { id } = req.body
   const accessToken =  accessToken(id)
   const refreshToken = createRefreshToken()

   tokenObject[refreshToken] = id
   res.cookie('accessToken', accessToken);
   res.cookie('refreshToken', refreshToken);
  
   console.log(`[ Id: ${id} ] 과 매칭되는 고유값(refreshToken)과 accessToken(Id 이용해서 생성)을 발급했습니다.`)

   return res.status(200).send({ "message": "Token이 정상적으로 발급되었습니다." });
})

function createAccessToken(id) {
  const accessToken = jwt.sign(
    { id: id }, // JWT 데이터
    SECRET_KEY, // 비밀키
    { expiresIn: '10s' }) // Access Token이 10초 뒤에 만료되도록 설정합니다.

  return accessToken;
}

function createRefreshToken() {
  const refreshToken = jwt.sign(
    {}, // JWT 데이터
    SECRET_KEY, // 비밀키
    { expiresIn: '3m' }) // Refresh Token이 3분 뒤에 만료되도록 설정합니다.

  return refreshToken;
}



app.get("/get-key", (req, res) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(400).json({ "message": "Refresh Token이 존재하지 않습니다." });
  if (!accessToken) return res.status(400).json({ "message": "Access Token이 존재하지 않습니다." });

  const isAccessTokenValidate = validateAccessToken(accessToken);
  const isRefreshTokenValidate = validateRefreshToken(refreshToken);

  if (!isRefreshTokenValidate) return res.status(419).json({ "message": "Refresh Token이 만료되었습니다." });


  if (!isAccessTokenValidate) {
    const accessTokenId = tokenObject[refreshToken];
    if (!accessTokenId) return res.status(419).json({ "message": "Refresh Token의 정보가 서버에 존재하지 않습니다." });

    const newAccessToken = createAccessToken(accessTokenId);
    res.cookie('accessToken', newAccessToken);
    return res.json({ "message": "Access Token을 새롭게 발급하였습니다." });
  }

  const { id } = getAccessTokenPayload(accessToken);
	return res.json({ "message": `${id}의 Payload를 가진 Token이 성공적으로 인증되었습니다.` });
})