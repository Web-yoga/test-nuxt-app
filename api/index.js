const express = require("express");

const router = express.Router();

//Привязка данных req и res к формату node express для возможности использовать res.status и json
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Создаем роут с любым бэкенд содержимым на node express
router.post("/track-data", (req, res) => {
	//Для достуап к req.body в node express необходимо установить body-parser
  console.log("Stored data!", req.body.data);
  res.status(200).json({ message: "Success!" });
});

module.exports = {
  path: '/api',
  handler: router
}
