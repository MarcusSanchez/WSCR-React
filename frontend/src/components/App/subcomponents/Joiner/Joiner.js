import './assets/joiner.css';
import {useState} from "react";
import {validateName, validateRoom} from "./assets/helpers";

let conn;
let appendLog = function (item) {};

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

function Joiner(props) {

    const [roomNumber, setRoomNumber] = useState('');
    const [uName, setUName] = useState('');
    const [joinButton, setJoinButton] = useState('...');

    function setJoinButtonHelper(roomNumber, uName) {
        if (roomNumber.length > 0 && uName.length > 0) {
            setJoinButton(`Join Room ${roomNumber} as ${uName}`);
        } else if (roomNumber.length > 0) {
            setJoinButton(`Join Room ${roomNumber}`);
        } else if (uName.length > 0) {
            setJoinButton(`Join Room as ${uName}`);
        } else {
            setJoinButton(`Join Room`);
        }
    }

    function handleFormChange(event) {
        let newName = uName;
        let newRoom = roomNumber;
        if (event.target.id === 'name') {
            // replaces all non-alphanumeric characters with empty string, then limits to 16 characters
            newName = event.target.value.replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
            setUName(newName);
        } else if (event.target.id === 'room') {
            // replaces all non-digits with empty string, then limits to 4 characters
            newRoom = event.target.value.replace(/\D/g, '').substring(0, 4);
            setRoomNumber(newRoom);
        }
        setJoinButtonHelper(newRoom, newName);
    }

    function generateRoom() {
        fetch("http://10.0.0.94:8000/generateRoom")
            .then((response) => response.text())
            .then((text) => {
                setRoomNumber(text);
                setJoinButtonHelper(text, uName);
            })
            .catch((error) => {
                setRoomNumber(error);
                setJoinButtonHelper("...", uName);
            });
    }

    function handleSubmit(e) {
        e.preventDefault();
        let name = document.getElementById("name").value;
        let room = document.getElementById("room").value;
        if (!name && !room) {
            alert("Please enter a name and room number.");
            return false;
        } else if (!name) {
            alert("Please enter a name.");
            return false;
        } else if (!room) {
            alert("Please enter a room number.");
            return false;
        }

        if (!validateName(name)) {
            alert("Name must be 3-16 characters long and may only consist of letters and numbers.");
            return false;
        }
        if (!validateRoom(room)) {
            alert("Room must be a 4 digit number 0000-9999");
            return false;
        }

        start(name, room);
        props.setIsJoined(true)
        return true;
    }


    return (
        <div id="joiner">
            <form id="roomForm" className="form-signin" onSubmit={handleSubmit}>
                <h1 className="mb-3" id="header">Join or Create a Room</h1>
                <input onChange={handleFormChange} type="text" id="name" className="form-control bottom" size="64" autoFocus autoComplete="off" placeholder="Name" value={uName}/>
                <div id="wrapper">
                    <input onChange={handleFormChange} type="text" id="room" className="form-control bottom" size="64" autoFocus autoComplete="off" placeholder="Room" value={roomNumber}/>
                    <button className="btn btn-lg btn-outline-dark" type="button" id="generateRoom" onClick={generateRoom}>Generate New Room</button>
                </div>
                <input type="submit" className="btn btn-lg btn-dark form-control" id="joinRoom" value={joinButton}/>
            </form>
        </div>
    );
}

export default Joiner;