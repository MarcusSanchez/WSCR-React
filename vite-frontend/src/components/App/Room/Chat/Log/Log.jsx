import Message from "./Message/Message.jsx";
import Announcement from "./Announcement/Announcement.jsx";
import s from "./log.module.css";
import { useContext } from "react";
import { MessagesContext, NewMessageAlertContext } from "../../Room.jsx";

function Log() {
    const [messages, _] = useContext(MessagesContext)
    const [newMessageAlert, setNewMessageAlert] = useContext(NewMessageAlertContext)
    const log = document.getElementById("message-log");

    function handleScroll() {
        let isAtBottom = log.scrollTop >= log.scrollHeight - log.clientHeight - 10;
        if (newMessageAlert && isAtBottom) {
            console.log("hit bottom");
            setNewMessageAlert(false);
        }
    }

    return (
        <div onScroll={handleScroll} className={`p-3 ${s.Container}`} id="message-log">
            {messages.map((message, index) => {
                if (message.type === "message") {
                    return <Message
                        key={index}
                        name={message.data.name}
                        message={message.data.message}
                        fromClient={message.data.fromClient}
                        time={message.data.time}
                    />;
                } else if (message.type === "announcement") {
                    return <Announcement
                        key={index}
                        message={message.data.message}
                    />;
                }
                return null;
            })}
        </div>
    );
}

export default Log;