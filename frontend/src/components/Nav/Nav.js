import wscrLogo from "./assets/wscr-logo.png"
import "./assets/nav.css"

function Nav() {
    return (
        <nav className="navbar" id="navbar">
            <div className="mx-xl-0 mx-lg-0 mx-md-0 mx-auto">
                <img id="wscr-logo" className="mx-auto" src={wscrLogo} alt="wscr-logo.png"/>
            </div>
        </nav>
    );
}

export default Nav