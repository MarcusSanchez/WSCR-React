import Message from "./Message/Message";
import Announcement from "./Announcement/Announcement";
import s from "./log.module.css";
import { useContext } from "react";
import { MessagesContext } from "../../Room";

function Log() {
    const [messages, _] = useContext(MessagesContext)
    return (
            <div className={`p-3 ${s.Container}`}>
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
                            type={message.data.type}
                        />;
                    }
                    return null;
                })}
            </div>
    );
}

export default Log;