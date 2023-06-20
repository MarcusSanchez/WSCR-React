import Joiner from './Joiner/Joiner.jsx';
import Room from './Room/Room.jsx';
import {createContext, useState} from "react";

export const NameContext = createContext(null);

function App() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    let [isJoined, setIsJoined] = useState(false);
    if (!isJoined) {
        return <Joiner setIsJoined={setIsJoined} setName={setName} setRoom={setRoom}/>;
    }
    return (
        <NameContext.Provider value={name}>
            <Room name={name} room={room}/>
        </NameContext.Provider>
    );
}

export default App