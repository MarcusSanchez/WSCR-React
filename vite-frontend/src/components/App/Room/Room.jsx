import {createContext, useEffect, useState} from "react";
import s from "./Room.module.css";
import Chat from "./Chat/Chat.jsx";
import SidePanel from "./SidePanel/SidePanel.jsx";

export const MessagesContext = createContext([]);
export const ConnContext = createContext(null);
export const NewMessageAlertContext = createContext(null);
let conn;

function Room(props) {
    const [messages, setMessages] = useState([]);
    const [newMessageAlert, setNewMessageAlert] = useState(false);

    function start(name, room) {
        if (window["WebSocket"]) {
            conn = new WebSocket(`ws://${window.location.host}/ws/${name}/${room}`);
            conn.onmessage = function (e) {
                let newMessage = JSON.parse(e.data);
                if (newMessage.type === "message") {
                    newMessage.data.time = new Date().toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    });
                    newMessage.data.fromClient = false;
                }
                let log = document.getElementById("message-log");
                let isAtBottom = log.scrollHeight === log.scrollTop + log.clientHeight;
                setMessages(prevMessages => [...prevMessages, newMessage]);
                setTimeout(() => {
                    if (isAtBottom) {
                        log.scrollTo(0, log.scrollHeight);
                    } else {
                        setNewMessageAlert(true);
                    }
                }, 0);
            };
            conn.onclose = function () {
                let announcement = {type: "announcement", data: {message: "Connection closed"}};
                setMessages(prevMessages => [...prevMessages, announcement]);
            };
        } else {
            let announcement = {type: "announcement", data: {message: "Your browser does not support WebSockets."}};
            setMessages(prevMessages => [...prevMessages, announcement]);
        }
    }

    useEffect(() => {
        start(props.name, props.room);
    }, [])

    return (
        <MessagesContext.Provider value={[messages, setMessages]}>
            <ConnContext.Provider value={conn}>
                <NewMessageAlertContext.Provider value={[newMessageAlert, setNewMessageAlert]}>
                    <div className={`row ${s.Container}`}>
                        <Chat/>
                        <SidePanel/>
                    </div>
                </NewMessageAlertContext.Provider>
            </ConnContext.Provider>
        </MessagesContext.Provider>
    );
}

export default Room;