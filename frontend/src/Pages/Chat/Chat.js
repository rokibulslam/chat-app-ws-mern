import React, { useEffect, useState } from 'react';
import axios from "axios"
const Chat = () => {
    const [chats, setChats] = useState([]);

    
    const fetchChats = async () => {
        // When proxy is added no need of write server port 
        const {data} = await axios.get('/chats')
        setChats(data)
    }
    // Fetch chat data 
    useEffect(() => {
       fetchChats()
    }, [])

    return (
        <div>
            {
                chats.map((chat)=><div key={chat._id}>{chat.chatName}</div>)
            }
        </div>
    );
};

export default Chat;