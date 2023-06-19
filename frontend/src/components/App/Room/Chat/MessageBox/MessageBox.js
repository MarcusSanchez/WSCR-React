import { MessagesContext} from "../../Room";
import {useContext} from "react";

function MessageBox() {
    const [_, setMessages] = useContext(MessagesContext);
    return (
        <div>

        </div>
    );
}

export default MessageBox;