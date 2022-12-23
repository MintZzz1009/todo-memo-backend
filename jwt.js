const express = require('express');
const app = express();
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const jwt = require("jsonwebtoken");
const SECRET_KEY = `Haksoo_Ji is in the studying camp for tomorrow with sparta-coding-club`;


const port = 3000;
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

app.get("/", (req, res) => res.status(200).send("Refresh Token Project"))