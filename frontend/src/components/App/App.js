import Joiner from './subcomponents/Joiner/Joiner';
import Room from './subcomponents/Room/Room';
import Footer from './subcomponents/Footer/Footer';
import {Fragment, useState} from "react";


function App() {
    let [isJoined, setIsJoined] = useState(false);
    if (!isJoined) {
        return (
            <Fragment>
                <main>
                    <Joiner setIsJoined={setIsJoined} />
                </main>
                <Footer />
            </Fragment>
        );
    }
    return <Room />;
}

export default App