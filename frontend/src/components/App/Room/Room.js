import { createContext, useState } from "react";
import s from "./Room.module.css";
import Chat from "./Chat/Chat";
import SidePanel from "./SidePanel/SidePanel";

export const MessagesContext = createContext([]);

function Room(props) {
    const [messages, setMessages] = useState([
        {type: "announcement", data: {type: "joining", message: "username1234567 has joined the room"}},
        {type: "announcement", data: {type: "leaving", message: "username has joined the room"}},
        {type: "message",
            data: {
                name: "username",
                time: "10:00pm",
                message: "this is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a message",
                fromClient: true
            }
        },
        {type: "message",
            data: {
                name: "nameOfTheUser",
                time: "10:00pm",
                message: "this is a secret messagethis is a secret messagethis is a secret messagethis is a secret messagethis is a secret messagethis is a secret messagethis is a secret messagethis is a secret messagethis is a secret messagethis is a secret messagethis is a secret messagethis is a secret messagethis is a secret message",
                fromClient: false
            }
        },
        {type: "message",
            data: {
                name: "username",
                time: "10:00pm",
                message: "this is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a message",
                fromClient: true
            }
        },
        {type: "message", data: {name: "nameOfTheUser", time: "10:00pm", message: "Hello, world!", fromClient: false}},
    ]);
    let conn;

    function start(name, room) {
        if (window["WebSocket"]) {
            conn = new WebSocket(`ws://10.0.0.94:8000/ws/${name}/${room}`);
            conn.onmessage = function (e) {
                let message = {type: "message", data: {name: props.name, message: e.data}};
                setMessages(messages => [...messages, message]);
            };
            conn.onclose = function () {
                let message = {type: "announcement", data: {message: "Connection closed"}};
                setMessages(messages => [...messages, message]);
            };
        } else {
            let message = {type: "announcement", data: {message: "Your browser does not support WebSockets."}};
            setMessages(messages => [...messages, message]);
        }
    }

    // useEffect(() => {
    //     start(props.name, props.room);
    // }, [])

    return (
        <MessagesContext.Provider value={[messages, setMessages]}>
            <div className={`row ${s.Container}`}>
                <Chat />
                <SidePanel/>
            </div>
        </MessagesContext.Provider>
    );
}

export default Room;