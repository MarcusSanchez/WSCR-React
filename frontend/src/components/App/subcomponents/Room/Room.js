import {useState} from "react";

let conn;
let appendLog = function (item) {
};

function start(name, room) {
    if (window["WebSocket"]) {
        conn = new WebSocket("ws://" + document.location.host + `/ws/${name}/${room}`);
        conn.onclose = function () {
            let item = document.createElement("div");
            item.innerHTML = "<b>Connection closed.</b>";
            appendLog(item);
        };
        conn.onmessage = function (e) {
            let message = e.data;
            let item = document.createElement("div");
            item.innerText = message;
            appendLog(item);
        };
    } else {
        let item = document.createElement("div");
        item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
        appendLog(item);
    }
}


function Room(props) {
    start(props.name, props.room)
    const [messages, setMessages] = useState([
        {type: "message", data: {name: "username", message: "this is a message"}},
        {type: "announcement", data: {message: "username has joined the room"}},
    ]);
    return (
        <div id="chatlogs">
            {messages.map((message, index) => {
                if (message.type === "message") {
                    return (
                        <div key={index}>
                            <span className="username">{message.data.name}: </span>
                            <span className="message">{message.data.message}</span>
                        </div>
                    );
                } else if (message.type === "announcement") {
                    return (
                        <div key={index}>
                            <span className="announcement">{message.data.message}</span>
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default Room;