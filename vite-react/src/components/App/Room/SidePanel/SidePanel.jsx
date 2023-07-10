import s from './SidePanel.module.css';
import {useContext, useEffect, useState} from "react";
import {NameRoomContext} from "../../App.jsx";
import {MessagesContext} from "../Room.jsx";

let href = window.location.href;
let queryIndex = href.indexOf('?') !== -1 ? href.indexOf('?') : href.length;

function SidePanel() {
  const [, room] = useContext(NameRoomContext);
  const [messages,] = useContext(MessagesContext);
  let [roomCount, setRoomCount] = useState(0);
  let [participants, setParticipants] = useState([]);

  let [clipboardClasses, setClipboardClasses] = useState(`fa-regular fa-clipboard ${s.Clipboard}`);
  let [copiedClasses, setCopiedClasses] = useState(`ps-2 visually-hidden`);

  let inviteLink = href.substring(0, queryIndex) + `?room=${room}`;

  function fetchRoomInfo() {
    fetch(`http://localhost:3000/info/${room}`)
      .then(response => response.json())
      .then(data => {
        setRoomCount(data["roomCount"]);
        setParticipants(data["participants"]);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    if (messages.length === 1 && messages[0].data.type === "join") {
      fetchRoomInfo();
      return;
    }
    let lastMessage = messages[messages.length - 1];
    if (lastMessage !== undefined && lastMessage.type === "announcement") {
      if (lastMessage.data.type === "join") {
        setRoomCount(prevRoomCount => prevRoomCount + 1);
        setParticipants(prevParticipants => [...prevParticipants, lastMessage.data.name]);
      } else if (lastMessage.data.type === "leave") {
        setRoomCount(prevRoomCount => prevRoomCount - 1);
        const index = participants.indexOf(lastMessage.data.name);
        setParticipants(prevParticipants => prevParticipants.splice(index, 1));
      }
    }
  }, [messages])

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(inviteLink)
      .then(() => {
        setClipboardClasses(`fa-solid fa-check ${s.Clipboard}`);
        setCopiedClasses(`ps-2`);
        setTimeout(() => {
          setClipboardClasses(`fa-regular fa-clipboard ${s.Clipboard}`);
          setCopiedClasses(`ps-2 visually-hidden`);
        }, 1000);
      })
  }

  return (
    <div className={`col-3 ${s.Container}`}>
      <h3 className={s.H3}>Room Information</h3>
      <hr />
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
      <p className={`mt-3 mb-1`}><b>Invite Link:</b></p>
      <p onClick={handleCopyToClipboard} className={`mb-0 ${s.Link}`}>
        {inviteLink}
        <i className={clipboardClasses}></i>
      </p>
      <b className={copiedClasses}>Copied!</b>
    </div>
  );
}

export default SidePanel;