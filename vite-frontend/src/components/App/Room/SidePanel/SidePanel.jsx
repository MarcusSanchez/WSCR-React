import s from './SidePanel.module.css';
import {useContext, useEffect, useState} from "react";
import { NameRoomContext } from "../../App.jsx";
import { MessagesContext } from "../Room.jsx";

function SidePanel() {
    const [_, room] = useContext(NameRoomContext);
    const [messages, __] = useContext(MessagesContext);
    let [roomCount, setRoomCount] = useState(0);
    let [participants, setParticipants] = useState([]);

    useEffect(() => {
        fetch(window.location.origin + `/info/${room}`)
            .then(response => response.json())
            .then(data => {
                if (data.error === "true") {
                    return;
                }
                setRoomCount(data.roomCount);
                setParticipants(data.participants);
            })
    }, [])

    useEffect(() => {
        if (messages.length === 0) {
            return;
        }
        let lastMessage = messages[messages.length - 1];
        if (lastMessage.type === "announcement") {
            if (lastMessage.data.type === "join") {
                setRoomCount(prevRoomCount => prevRoomCount + 1);
                setParticipants(prevParticipants => [...prevParticipants, lastMessage.data.name]);
            } else if (lastMessage.data.type === "leave") {
                setRoomCount(prevRoomCount => prevRoomCount - 1);
                setParticipants(prevParticipants => prevParticipants.filter(participant => participant !== lastMessage.data.name));
            }
        }
    }, [messages])

    return (
        <div className={`col-3 ${s.Container}`}>
            <h3 className={s.H3}>Room Information</h3>
            <hr/>
            <p className={``}><b>Room Number: </b>{room}</p>
            <p className={``}><b>Room Count: </b>{roomCount}</p>
            <p className={``}><b>Room Participants: </b></p>
            <div className={s.Participants}>
                {participants.map((participant, index) => {
                    return (
                        <p key={index} className={`${s.Participant}`}>{participant}</p>
                    )
                })}
            </div>
        </div>
    )
        ;
}

export default SidePanel;