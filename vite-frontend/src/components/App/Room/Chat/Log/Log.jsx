import Message from "./Message/Message.jsx";
import Announcement from "./Announcement/Announcement.jsx";
import s from "./log.module.css";
import { useContext } from "react";
import { MessagesContext } from "../../Room.jsx";

function Log() {
    const [messages, _] = useContext(MessagesContext)
    return (
            <div className={`p-3 ${s.Container}`} id="message-log">
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