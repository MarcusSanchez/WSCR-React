import './assets/footer.css';

function Footer() {
    let year = new Date().getFullYear();
    return (
        <footer>
            <h3>Made by Marcus ©{year}</h3>
        </footer>
    )
}

export default Footer;