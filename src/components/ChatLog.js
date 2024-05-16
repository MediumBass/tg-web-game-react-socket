import React, {useEffect, useState} from 'react';
import {socket} from "../socket";
import "../css/ChatLog.css"

const ChatLog = () => {
    const [message, setMessage] = useState(["","",""]);
    useEffect(()=>{

        socket.on("CHANGE MESSAGES", (data) =>{
            setMessage(data.Messages)
        })

    },[])

    return (
        <div className="chatlog">
            <p>{message[0]}</p>
            <p>{message[1]}</p>
            <p>{message[2]}</p>
            <p>{message[3]}</p>
        </div>
    );
};

export default ChatLog;