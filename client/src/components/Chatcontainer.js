import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

export default function Chatcontainer({ selectedUserId, userId, setChat, chat }) {
    const [text, setText] = useState()
    const isInitialRender = useRef(true);

    const handleSendMessage = async () => {
        try {
            await socket.emit('message', {
                from: userId,
                to: selectedUserId,
                message: text
            });
            setText("")
        } catch (error) {
            console.log("🚀 ~ handleSendMessage ~ error:", error)
        }
    }
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        // Subsequent renders will execute this block
        socket.on('recieve_message', (message) => {
            setChat((prevChat) => [...prevChat, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [isInitialRender]);

    return (
        <>
            <div className="chat-container">

                {chat?.map((item) => (
                    <div className={`chat-message ${item.from === userId ? 'left' : 'right'}`}>
                        {item.message}
                    </div>
                ))}
            </div>
            <input onChange={(e) => setText(e.target.value)} value={text} />
            <button onClick={handleSendMessage}>Send</button>
        </>
    )
}
