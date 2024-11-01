const express = require('express')

const { askQuestion, getChatHistory, getChat, createChat } = require("../controllers/chatcontroller");
const { validate } = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.get("/", validate, getChatHistory);

router.get("/:id", validate, getChat);

router.post("/new", validate, createChat);

router.post("/:id", validate, askQuestion);



module.exports = router;