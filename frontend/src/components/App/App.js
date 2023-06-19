import Joiner from './Joiner/Joiner';
import Room from './Room/Room';
import Footer from './Footer/Footer';
import { createContext, useState } from "react";

export const NameContext = createContext(null);

function App() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    let [isJoined, setIsJoined] = useState(false);
    if (!isJoined) {
        return (
            <>
                <main>
                    <Joiner setIsJoined={setIsJoined} setName={setName} setRoom={setRoom}/>
                </main>
                <Footer/>
            </>
        );
    }
    return (
        <NameContext.Provider value={name}>
            <Room name={name} room={room}/>
        </NameContext.Provider>
    );
}

export default App