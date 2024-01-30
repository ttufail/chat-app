import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from './Login'
export default function Useroptions() {
    const location = useLocation()
    const { userId } = location.state.data
    const [roomId, setRoomId] = useState("")
    const navigate = useNavigate()
    const handleIndvidualChat = async () => {
        try {
            const response = await axios.get(`${serverUrl}/newchat/${userId}`)
            const allUsers = response.data
            navigate("/chat", { state: { data: { allUsers, userId } } })
        } catch (error) {
            console.log("🚀 ~ handleNewChat ~ error:", error)

        }
    }
    const handleRoomChat = async () => {
        try {
            const roomResponse = await axios.get(`${serverUrl}/joinRoom/${roomId}`)
            const { roomExists } = roomResponse.data
            if (roomResponse.status === 200) {
                console.log("🚀 ~ handleRoomChat ~ roomResponse:", roomResponse)
                navigate("/chatroomcontainer", { state: { data: { roomExists, userId } } })
            }
        } catch (error) {
            console.log("🚀 ~ handleCreateRoom ~ error: 28", error)
        }
    }

    const handleCreateRoom = async () => {
        try {
            const roomResponse = await axios.post(`${serverUrl}/createRoom/${roomId}`)
            if (roomResponse.status === 200) {
                setRoomId("")
            }
        } catch (error) {
            console.log("🚀 ~ handleCreateRoom ~ error:", error)
        }
    }
    return (
        <div className="app">
            <div className="button-container">
                <button className="chat-button" onClick={handleIndvidualChat}>
                    Personal Chat
                </button>
                <div>
                    <input placeholder='Room Id' onChange={(e) => setRoomId(e.target.value)} /> <br />
                    <button className="chat-button" onClick={handleRoomChat}>
                        Join Room
                    </button>
                    <button className="chat-button" onClick={handleCreateRoom}>
                        Create Room
                    </button>
                </div>
            </div>
        </div>
    )
}
