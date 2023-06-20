import {ConnContext, MessagesContext} from "../../Room.jsx";
import {NameContext} from "../../../App.jsx";
import {useContext, useRef} from "react";
import s from "./MessageBox.module.css";

function MessageBox() {
    const [messages, setMessages] = useContext(MessagesContext);
    const conn = useContext(ConnContext);
    const name = useContext(NameContext);
    const textAreaRef = useRef(null);

    function sendMessage() {
        if (!conn || textAreaRef.current.value.length === 0) {
            console.log(conn)
            return false;
        }
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

    return (
        <div className={`${s.ChatContainer}`}>
            <div className={s.MessageBox}>
                <textarea className={s.TextArea} rows="1" placeholder="Type your message..." ref={textAreaRef}></textarea>
                <button className={s.Button} onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default MessageBox;