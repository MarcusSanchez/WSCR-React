import {ConnContext, MessagesContext} from "../../Room.jsx";
import {NameRoomContext} from "../../../App.jsx";
import {useContext, useRef} from "react";
import s from "./MessageBox.module.css";

let messageCount = 0;

function MessageBox() {
    const [_, setMessages] = useContext(MessagesContext);
    const conn = useContext(ConnContext);
    const [name, __] = useContext(NameRoomContext);
    const textAreaRef = useRef(null);

    function sendMessage() {
        if ((!conn || textAreaRef.current.value.replace(/^]s+/, '').length === 0) || messageCount >= 3) {
            if (messageCount >= 3) {
                let announcement = {
                    type: "announcement",
                    data: {
                        name: "Server",
                        type: "cooldown",
                        message: "You are on cooldown try again in 5 seconds."
                    }
                }
                setMessages(prevMessages => [...prevMessages, announcement]);
                setTimeout(() => {
                    document.getElementById("message-log").scrollTo(0, document.getElementById("message-log").scrollHeight);
                }, 0);
            }
            return false;
        }

        messageCount++;
        setTimeout(() => {
            messageCount--;
        }, 5000);
        conn.send(textAreaRef.current.value);
        const time = new Date().toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true});
        let message = {
            type: "message",
            data: {
                name: name,
                time: time,
                message: textAreaRef.current.value,
                fromClient: true
            }
        };
        setMessages(prevMessages => [...prevMessages, message]);
        textAreaRef.current.value = "";
        setTimeout(() => {
            document.getElementById("message-log").scrollTo(0, document.getElementById("message-log").scrollHeight);
        }, 0);
        return true;
    }

    function handleEnter(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className={`${s.ChatContainer}`}>
            <div className={s.MessageBox}>
                <textarea onKeyDown={handleEnter} className={s.TextArea} rows="1" placeholder="Type your message..."
                          ref={textAreaRef} autoFocus></textarea>
                <button className={s.Button} onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default MessageBox;