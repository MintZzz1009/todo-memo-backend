// mongoose 임포트
const mongoose = require("mongoose");

// 스키마 생성
const TodoSchema = new mongoose.Schema({
  value: String,  // 할 일이 어떤 것인지?
  doneAt: Date,   // 할 일이 언제 완료되었는지?
  order: Number   // 몇 번째 할 일인지? Todo 데이터들의 순서를 나타내는 값 -> order가 높을수록 해당 Todo가 상단에 위치하도록.
                  // +) 추가된 항목은 항상 맨 위에 추가되도록 -> new order = max order + 1
});               // 확인하는 칼럼


TodoSchema.virtual("todoId").get(function () { 
  return this._id
});
// 화살표 함수에 this 사용하면 안된다.

// Schema.virtual("가상칼럼명") 
// todoId: _id.toHexString()을 TodoSchema에 추가.
// => 프론트에서 데이터를 보낼 때 필요한 가상의 칼럼을 스키마에 생성
// 생성된 "todoId" 칼럼에 _id(고유id값)을 할당하기 => todoId: _id.toHexString()
// "_id" 값이16진법 변환.
// get으로 렌더링해서 보여줌.

TodoSchema.set("toJSON", { virtuals: true });
// TodoSchema.set() -> TodoSchema 설정하기
// ("toJson", { ... }) -> 스키마를 JSON으로 변환할 때, 설정한 가상칼럼 보여주기를 true로 설정

module.exports = mongoose.model("Todo", TodoSchema);
// mongoose.model => mongoose의 model을 생성한다.
// mongoose.model("생성할 모델명", 모델의 스키마 형식);

// ./routes/todos.router 에서 받음.