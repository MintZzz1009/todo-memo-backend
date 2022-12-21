// Router <- express 임포트
const express = require("express");
const router = express.Router();

// Router <- api에 필요한 schema 임포트
const Todo = require("../models/todo");

// api 설계
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

module.exports = router;