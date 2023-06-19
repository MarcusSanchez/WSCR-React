import Joiner from './Joiner/Joiner';
import Room from './Room/Room';
import Footer from './Footer/Footer';
import { useState } from "react";


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
                <Footer />
            </>
        );
    }
    return <Room name={name} room={room}/>;
}

export default App