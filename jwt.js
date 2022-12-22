// 참고 https://velog.io/@neity16/NodeJS-JWT-Token-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
// 강의자료 https://teamsparta.notion.site/2-2-JWT-b9d2a2f963884fd286a93df5106b1462#814f5da2ccf34e1abc705ab0ed6251d1

const jwt = require("jsonwebtoken");

const token = jwt.sign({ myPayloadData: "haksoo practiced only jwt" }, "Haksoo's Secret Key");
console.log(token); 
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVBheWxvYWREYXRhIjoiaGFrc29vIHByYWN0aWNlZCBvbmx5IGp3dCIsImlhdCI6MTY3MTYyMjAzMn0.QhUFYcMxUdsylncv5u-eqmDvQCcMLSctuV2I2FgoqAk
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVBheWxvYWREYXRhIjoiaGFrc29vIHByYWN0aWNlZCBvbmx5IGp3dCIsImlhdCI6MTY3MTYyMjAzMn0.64TVKCyqPa17oZ6gVMKxpFdyqMLD_mWfGYqnVkcky6A

// { "myPayloadData": "haksoo practiced only jwt ", "iat": 1671621422 }
// { "myPayloadData": "haksoo practiced cookies session jwt ", "iat": 1671621316 }

const encodedToken = token
const decodedValue = jwt.decode(encodedToken);
console.log(decodedValue) // { myPayloadData: 'haksoo practiced only jwt ', iat: 1671621622 }

// 복호화가 아닌, 변조되지 않은 데이터인지 검증
// const decodedValueByVerify = jwt.verify(token, "haksoo practiced only jwt");
// console.log(decodedValueByVerify)