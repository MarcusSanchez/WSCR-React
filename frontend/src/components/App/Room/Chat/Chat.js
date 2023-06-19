import Log from "./Log/Log";
import MessageBox from "./MessageBox/MessageBox";
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