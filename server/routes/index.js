const express = require('express')

const router = express.Router()

const { userMessage, getUserChat,getChatList, newChat, createNewRoom, joinRoom } = require('../controller/chatcontroller')

const { createNewUser,userLogin } = require('../controller/usercontroller')

router.post("/chat", userMessage)

router.get("/userchat/:id", getUserChat)

router.get("/chatlist/:userId/:toUserId", getChatList) // all chats with me

router.post("/createuser", createNewUser)

router.post("/login", userLogin)

router.get("/newchat/:userId", newChat)

router.post("/createRoom/:roomId", createNewRoom)

router.get("/joinRoom/:roomId", joinRoom)

module.exports = router