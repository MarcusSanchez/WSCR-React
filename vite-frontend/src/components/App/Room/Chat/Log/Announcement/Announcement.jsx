import s from './Announcement.module.css';

function Announcement(props) {
    return (
        <div className={`d-flex justify-content-center`}>
            <b className={`${s.Announcement}`}>{props.message}</b>
        </div>
    );
}

export default Announcement;