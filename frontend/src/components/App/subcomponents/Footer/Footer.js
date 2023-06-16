import s from './assets/footer.module.css';

function Footer() {
    let year = new Date().getFullYear();
    return (
        <footer>
            <h3 className={s.FooterH3}>Made by Marcus ©{year}</h3>
        </footer>
    )
}

export default Footer;