import wscrLogo from "./assets/wscr-logo.png"
import s from "./assets/nav.module.css"

function Nav() {
    return (
        <nav className={`navbar ${s.Navbar}`}>
            <div className="mx-xl-0 mx-lg-0 mx-md-0 mx-auto">
                <img className={`mx-auto ${s.WscrLogo}`} src={wscrLogo} alt="wscr-logo.png"/>
            </div>
        </nav>
    );
}

export default Nav