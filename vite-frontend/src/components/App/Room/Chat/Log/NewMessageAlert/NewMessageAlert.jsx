import s from "./NewMessageAlert.module.css";
import {useContext} from "react";
import {NewMessageAlertContext} from "../../../Room.jsx";

function NewMessageAlert() {
    const [_, setNewMessageAlert] = useContext(NewMessageAlertContext);
    let log = document.getElementById("message-log");

    function scrollToBottom() {
        log.scrollTo(0, log.scrollHeight)
        setNewMessageAlert(false);
    }
    return (
        <div onClick={scrollToBottom} className={`${s.Div}`}>
            <b className={`${s.Alert}`}>New Message...</b>
        </div>
    );
}

export default NewMessageAlert;