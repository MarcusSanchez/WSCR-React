import s from './Message.module.css';

function Message(props) {
    return props.fromClient ?
        (
            <div key={props.key} className={`row ${s.RightContainer}`}>
                <div className={`col-6 ${s.Margin15} ${s.RightMessage} text-body`}>
                    <div className={`d-flex justify-content-between w-100`}>
                        <b className={``}>{props.name}:</b>
                        <span className={`${s.ToGrey}`}>{props.time}</span>
                    </div>
                    <span className={s.WordFormatter}>{props.message}</span>
                </div>
            </div>
        ) : (
            <div key={props.key} className={`row ${s.LeftContainer}`}>
                <div className={`col-6 ${s.Margin15} ${s.LeftMessage}`}>
                    <div className={`d-flex justify-content-between w-100`}>
                        <b className={``}>{props.name}:</b>
                        <span className={`${s.ToGrey}`}>{props.time}</span>
                    </div>
                    <span className={``}>{props.message}</span>
                </div>
            </div>
        )
}

export default Message;