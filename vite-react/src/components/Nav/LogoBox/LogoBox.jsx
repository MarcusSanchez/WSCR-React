import s from "./LogoBox.module.css";

function LogoBox(props) {
    if (props.color === "blue") {
        return (
            <div className={`d-flex justify-content-center align-content-center ${s.Blue}`}>
                <h1>{props.letter}</h1>
            </div>
        );
    } else if (props.color === "red") {
        return (
            <div className={`d-flex justify-content-center align-content-center ${s.Red}`}>
                <h1>{props.letter}</h1>
            </div>
        );
    }
}

export default LogoBox;