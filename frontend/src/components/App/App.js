import Joiner from './subcomponents/Joiner/Joiner';
import Room from './subcomponents/Room/Room';
import Footer from './subcomponents/Footer/Footer';
import {Fragment, useState} from "react";


function App() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    let [isJoined, setIsJoined] = useState(false);
    if (!isJoined) {
        return (
            <Fragment>
                <main>
                    <Joiner setIsJoined={setIsJoined} setName={setName} setRoom={setRoom}/>
                </main>
                <Footer />
            </Fragment>
        );
    }
    return <Room name={name} room={room}/>;
}

export default App