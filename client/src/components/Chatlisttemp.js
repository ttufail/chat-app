import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client'
import axios from 'axios';
import { serverUrl } from './Login';
const socket = io.connect("http://localhost:3001")

export default function Chatlisttemp() {
    const location = useLocation();
    const { userId, data } = location.state
    const to = data[0].userId
    const [message, setMessage] = useState("")
    const [allChat, setAllChat] = useState(data[0].result)
    const handleSendMessage = async () => {
        try {
            const response = await axios.post(`${serverUrl}/chat`, { from: userId, to, message })
            setAllChat(response.data.data)
        } catch (error) {
            console.log("🚀 ~ handleSendMessage ~ error:", error)
        }
    }
    useEffect(()=>{
    },[socket])
    return (
        <>
            <div>Chatlisttemp</div>
            <div className="chat-container">
                {allChat.map((message) => (
                    <div
                        key={message._id}
                        className={`chat-message ${message.from === userId ? 'left' : 'right'}`} // from user id
                    >
                        {message.message}
                    </div>
                ))}
            </div>
            <input onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>
        </>
    )
}
