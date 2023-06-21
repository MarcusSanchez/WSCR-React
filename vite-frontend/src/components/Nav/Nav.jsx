import s from "./nav.module.css"
import LogoBox from "./LogoBox/LogoBox.jsx";

function Nav() {

    function handleClick() {
        // refresh the page:
        window.location.reload();
    }

    return (
        <nav className={`navbar ${s.Navbar}`}>
            <div onClick={handleClick} className={`mx-xl-0 mx-lg-0 mx-md-0 mx-auto d-flex p-1 ${s.Div}`}>
                <LogoBox letter="W" color="blue"/>
                <LogoBox letter="S" color="red"/>
                <LogoBox letter="C" color="blue"/>
                <LogoBox letter="R" color="red"/>
            </div>
        </nav>
    );
}

export default Nav