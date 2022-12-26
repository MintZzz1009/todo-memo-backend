// 참고 https://velog.io/@neity16/NodeJS-JWT-Token-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
// 강의자료 https://teamsparta.notion.site/2-2-JWT-b9d2a2f963884fd286a93df5106b1462#814f5da2ccf34e1abc705ab0ed6251d1

const jwt = require("jsonwebtoken");

const token = jwt.sign({ myPayloadData: "haksoo practiced jwt" }, "Haksoo's Secret Key");
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



const mytoken = jwt.sign({ myPayloadData: 1234 }, "SECRET_KEY");
console.log(mytoken); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVBheWxvYWREYXRhIjoxMjM0LCJpYXQiOjE2NzE3NTk1MTJ9.Y07jaJA8OJNd0Igl0HRuQjW_nqfJO_lgaPtLjQc3bt4

const decodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVBheWxvYWREYXRhIjoxMjM0LCJpYXQiOjE2NzE3NTk1MTJ9.Y07jaJA8OJNd0Igl0HRuQjW_nqfJO_lgaPtLjQc3bt4'
const decodedValueByVerify = jwt.verify(decodedToken, "SECRET_KEY");
console.log(decodedValueByVerify)
// 누구나 복호화가 가능하지만 mysecretkey 부분이 없으면 jwt.io에서 입력할 iat 등을 알 수 없다.
// 암호화된 토큰을 훔쳐서 jwt.io에서 입력할 때, Header와 Payload의 정보는 알 수 있겠지만 mysecretkey는 알지 못한다.
// 즉 누구나 복호화된 코드를 볼 수 있지만, 그것이 유효한지 또는 올바른 키로 만들어졌는지 검증할 때
// 올바른 생성과정을 통해 만들어진 코드가 아니라면 검증에 성공할 수 없다.
// 서버에 저장되어있는 mysecretkey 부분은 볼 수 없기 때문이다.