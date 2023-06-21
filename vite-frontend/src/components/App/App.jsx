import Joiner from './Joiner/Joiner.jsx';
import Room from './Room/Room.jsx';
import {createContext, useState} from "react";

export const NameRoomContext = createContext(null);

function App() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    let [isJoined, setIsJoined] = useState(false);
    if (!isJoined) {
        return <Joiner setIsJoined={setIsJoined} setName={setName} setRoom={setRoom}/>;
    }
    return (
        <NameRoomContext.Provider value={[name, room]}>
            <Room name={name} room={room}/>
        </NameRoomContext.Provider>
    );
}

export default App