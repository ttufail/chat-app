const { saveMessage, getChatHistory, getChats, newChats, createRoom, joinRoomService } = require("../services/chatservice")

const userMessage = async (req, res) => {
    const { from, to, message } = req.body
    if (!from || !to || !message) {
        res.status(400).send()
    }
    const messageResponse = await saveMessage(from, to, message)
    return res.status(200).json(messageResponse)
}

const getUserChat = async (req, res) => {
    const { id } = req.params
    const { to } = req.query
    if (!id || !to) {
        res.status(400).send()
    }
    const chatList = await getChatHistory(id, to)
    return res.status(200).json(chatList.data)
}

const getChatList = async (req, res) => {
    const { userId, toUserId } = req.params
    if (!userId) {
        res.status(400).send()
    }
    const allChats = await getChats(userId, toUserId)
    return res.status(200).json(allChats.data)
}
const newChat = async (req, res) => {
    const { userId } = req.params
    if (!userId) {
        res.status(400).send()
    }
    const allUsers = await newChats(userId)
    if (allUsers.success) {
        return res.status(200).json(allUsers.data)
    }
    return res.status(400).json(allUsers.message)
}
const createNewRoom = async (req, res) => {
    const { roomId } = req.params
    console.log("🚀 ~ createNewRoom ~ roomId:", roomId)
    if (!roomId ) {
        return res.status(400).send("Provide Room ID")
    }
    const roomCreated = await createRoom(roomId)
    console.log("🚀 ~ createNewRoom ~ roomCreated:", roomCreated)
    if (roomCreated.success) {
        return res.status(200).json(roomCreated.message)
    }
    return res.status(500).json(roomCreated.message)
}
const joinRoom = async (req, res) => {
    const { roomId } = req.params
    console.log("🚀 ~ createNewRoom ~ roomId:", roomId)
    if (!roomId ) {
        return res.status(400).send("Provide Room ID")
    }
    const roomJoined = await joinRoomService(roomId)
    if (roomJoined.success) {
        return res.status(200).json(roomJoined)
    }
    return res.status(500).json(roomJoined.message)
}



module.exports = { userMessage, getUserChat, getChatList, newChat, createNewRoom ,joinRoom}