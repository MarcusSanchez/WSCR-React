import s from "./NewMessageAlert.module.css";

function NewMessageAlert() {
    return (
        <div key={props.key} className={`d-flex justify-content-center`}>
            <b className={`${s.Alert}`}>{props.message}</b>
        </div>
    );
}

export default NewMessageAlert