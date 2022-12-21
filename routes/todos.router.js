const mongoose = require("mongoose");

// Router <- express 임포트
const express = require("express");
const router = express.Router();

// Router <- api에 필요한 schema 임포트
const Todo = require("../models/todo");

// api 설계

// 할 일 작성 API
router.post("/todos", async (req, res) => {
  const { value } = req.body;
  const maxOrderByUserId = await Todo.findOne().sort("-order").exec();
  // sort("-order") order값의 역순(내림차순)으로 조회 -> findOne()이니까 맨 위에 것 하나만 조회됨.
  // exec() -> https://tesseractjh.tistory.com/166 온전한 Promise값 반환. 원래 유사 Promise.

  const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;
  const todo = new Todo({ value, order });
  await todo.save();
  res.send({ todo });
});


// 전체 할 일 목록 조회 API
router.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort("-order").exec();

  res.send({ todos });
});
 

// 할 일 순서, 내용, 체크 수정하는 API
router.patch("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;  // currentTodo의 아이디(up, down 클릭된 Todo)
  const { order, value, done } = req.body;     // targetTodo의 order값(up, down의 위, 아래 Todo)

  // _id값이 db에 없을 때 에러처리
  const currentTodo = await Todo.findById(todoId);
  if (!currentTodo) {
    throw new Error("존재하지 않는 todo 데이터입니다.");
  }

  // 순서 변경
  if (order) {
    const targetTodo = await Todo.findOne({ order }).exec();
    if (targetTodo) {
      targetTodo.order = currentTodo.order;
      await targetTodo.save();
    }
    currentTodo.order = order;
  }
  
  // 내용 변경
  if (value) {
    if (value === currentTodo.value) {
      throw new Error("수정된 부분이 없습니다.");
    }
    currentTodo.value = value
  }

  // 체크박스 처리
  currentTodo.doneAt = null
  if (done) {
    currentTodo.doneAt = new Date()
  }
  
  await currentTodo.save();
  res.send({});
});


// 할 일 삭제 API
router.delete("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  try {
    await Todo.findByIdAndDelete({_id:todoId})
    res.send({});
  } catch (err) {
    console.error(err);
    res.status(500).send({status:500, message: 'internal error', type:'internal'});
  }
})

module.exports = router;