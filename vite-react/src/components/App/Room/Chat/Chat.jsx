import Log from "./Log/Log.jsx";
import MessageBox from "./MessageBox/MessageBox.jsx";
import s from "./chat.module.css";
import {useContext} from "react";
import {NewMessageAlertContext} from "../Room.jsx";
import NewMessageAlert from "./Log/NewMessageAlert/NewMessageAlert.jsx";

function Chat() {
    const [newMessageAlert, _] = useContext(NewMessageAlertContext)
    return (
        <div className={`col-9 position-relative`}>
            <Log />
            {newMessageAlert && (<NewMessageAlert />)}
            <MessageBox />
        </div>
    );
}

export default Chat;