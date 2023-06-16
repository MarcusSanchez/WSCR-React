import {useEffect, useState} from "react";
import s from "./assets/Room.module.css";


function Room(props) {
    const [messages, setMessages] = useState([
        {type: "message", data: {name: "username", message: "this is a message"}},
        {type: "announcement", data: {message: "username has joined the room"}},
    ]);

    function start(name, room) {
        if (window["WebSocket"]) {
            let conn = new WebSocket(`ws://10.0.0.94:8000/ws/${name}/${room}`);
            conn.onmessage = function (e) {
                let message = {type: "message", data: {name: props.name, message: e.data}};
                setMessages(messages => [...messages, message]);
            };
            conn.onclose = function () {
                let message = {type: "announcement", data: {message: "Connection closed"}};
                setMessages(messages => [...messages, message]);
            };
        } else {
            let message = {type: "announcement", data: {message: "Your browser does not support WebSockets."}};
            setMessages(messages => [...messages, message]);
        }
    }

    useEffect(() => {
        start(props.name, props.room)
    }, [])

    return (
        <div id="chatlogs">
            {messages.map((message, index) => {
                if (message.type === "message") {
                    return (
                        <div key={index}>
                            <span className="username">{message.data.name}: </span>
                            <span className="message">{message.data.message}</span>
                        </div>
                    );
                } else if (message.type === "announcement") {
                    return (
                        <div key={index}>
                            <span className="announcement">{message.data.message}</span>
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default Room;