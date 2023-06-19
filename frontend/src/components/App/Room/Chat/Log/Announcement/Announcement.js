import s from './Announcement.module.css';

function Announcement(props) {
    return (
        <div key={props.key} className={`d-flex justify-content-center`}>
            <b className={`${s.Announcement}`}>{props.message}</b>
        </div>
    );
}

export default Announcement;