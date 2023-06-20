import Log from "./Log/Log.jsx";
import MessageBox from "./MessageBox/MessageBox.jsx";
import s from "./chat.module.css";

function Chat() {
    return (
        <div className={`col-9`}>
            <Log />
            <MessageBox />
        </div>
    );
}

export default Chat;