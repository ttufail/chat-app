const chatModel = require("../database/model/chatmodel")
const roomModel = require("../database/model/roommodel")
const { userModel } = require("../database/model/usermodel")

const saveMessage = async (from, to, message) => {
  const currentTime = new Date().getTime()
  const chatData = new chatModel({ from, to, message, timeStamp: currentTime })
  await chatData.save()
  const updatedChatData = await getChatHistory(from, to)
  return updatedChatData
}
const getChatHistory = async (from, to) => {
  const chatHistory = await chatModel.aggregate([
    {
      $match: {
        $or: [
          { from: from, to: to },
          { from: to, to: from },
        ],
      }
    },
    { $sort: { timeStamp: 1 } }
  ])
  return { success: true, data: chatHistory }
}

const getChats = async (userId, toUserId) => {
  try {
    const chatData = await chatModel.aggregate([
      {
        '$match': {
          '$or': [
            {
              '$and': [
                {
                  'from': userId
                }, {
                  'to': toUserId
                }
              ]
            }, {
              '$and': [
                {
                  'to': userId
                }, {
                  'from': toUserId
                }
              ]
            }
          ]
        }
      }, {
        '$sort': {
          'timeStamp': 1
        }
      }, {
        '$group': {
          '_id': 0,
          'result': {
            '$push': '$$ROOT'
          }
        }
      }
    ])
    return { success: true, data: chatData }
  } catch (error) {
    console.log("🚀 ~ getChats ~ error:", error)

  }
}

const newChats = async () => {
  try {
    const allUsers = await userModel.find({}, 'useremail')
    if (!allUsers.length) {
      return { sucess: false, message: "Users does not exists" }
    }
    const filterUserData = allUsers.map((item) => {
      return {
        useremail: item.useremail,
        userId: item._id
      }
    })
    return { success: true, data: filterUserData }
  } catch (error) {
    return { success: false, message: error }

  }
}
const createRoom = async (roomId) => {
  try {
    const roomExists = await roomModel.find({ roomId })
    if (roomExists.length) {
      return { success: false, message: "Room already created with this Id" }
    }
    const roomData = new roomModel({
      roomId,
      timeStamp: new Date().getTime()
    })
    await roomData.save()
    return { success: true, message: "Room Created" }
  } catch (error) {
    return { success: false, message: "Error Creating Room" }

  }
}
const joinRoomService = async (roomId) => {
  try {
    const roomExists = await roomModel.findOne({ roomId })
    if (!roomExists) {
      return { success: false, message: "Room with this Id does not exists" }
    }
    return { success: true, message: "Room joined", roomExists }
  } catch (error) {
    return { success: false, message: "Error Creating Room", }

  }
}

const saveJoinMessages = async (user, message, roomId) => {
  try {
    const checkForRoom = await roomModel.findOne({ roomId })
    if (!checkForRoom) {
      return false
    }
    const newMessages = {
      user,
      message,
      timeStamp: new Date().getTime()
    }
    const updateMessages = await roomModel.findOneAndUpdate({ roomId }, {
      $push: {
        messages: newMessages
      }
    }, { new: true })
    return updateMessages
  } catch (error) {
    console.log("🚀 ~ saveJoinMessages ~ error:", error)

  }
}

module.exports = { saveMessage, getChatHistory, getChats, newChats, createRoom, joinRoomService, saveJoinMessages }