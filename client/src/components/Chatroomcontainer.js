import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

export default function Chatroomcontainer() {
    const location = useLocation();
    const { userId, roomExists } = location.state.data;
    const { roomId, messages } = roomExists;
    const [roomChat, setRoomChat] = useState(messages);

    const [text, setText] = useState('');

    const handleSendMessage = () => {
        socket.emit('room_message', {
            room: roomId,
            user: userId,
            message: text,
        });
        setText('');
    };

    useEffect(() => {
        socket.emit('join_room', roomId)
        socket.on("recieve_messages", (data) => {
            console.log("🚀 ~ socket.on ~ data:", data)
            setRoomChat((preVal) => [...preVal, data.newMessages])
        });
    }, []);

    return (
        <div className="chat-container">
            {roomChat?.map((item, index) => (
                <div key={index} className={`chat-message ${item.user === userId ? 'left' : 'right'}`}>
                    {item.message}
                </div>
            ))}
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}
