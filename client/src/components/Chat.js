import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Chatcontainer from './Chatcontainer';
import axios from 'axios';
import { serverUrl } from './Login';
export default function Chat() {
  const location = useLocation();
  const { allUsers, userId } = location.state.data
  const [chat, setChat] = useState([])
  const [selectedUserId, setSelectedUserId] = useState()
  const handleSetChat = async (userEmail, toUserId) => {
    try {
      const response = await axios.get(`${serverUrl}/chatlist/${userId}/${toUserId}`)
      const chatMessages = response.data
      if (chatMessages.length) {
        setChat(chatMessages?.[0]?.result)
      }
      else {
        setChat([])
      }
      setSelectedUserId(toUserId)

    } catch (error) {
      console.log("🚀 ~ handleIndvidualChat ~ error:", error)
    }
  }
  return (
    <>
      <div>Chat</div>
      {allUsers?.map((item) => (
        <div>
          <button onClick={() => handleSetChat(item.useremail, item.userId)}
          >
            {item.useremail}
          </button>
        </div>
      ))}
      {<Chatcontainer
        selectedUserId={selectedUserId}
        userId={userId}
        setChat={setChat}
        chat={chat} />}
    </>
  )
}
