import classes from "./LogEntry.module.css";

export type LogEntryProps = {
    _id?: string,
    date: Date,
    author: string,
    title: string,
    content: string,
    image: string,
    imageAlt: string
};

const dateParser = Intl.DateTimeFormat();

function LogEntry({ _id, image, imageAlt, date, author, title, content }: LogEntryProps) {
    const displayDate = dateParser.format(date);

    return (
        <article className={`${classes.logEntry}${_id ? "" : ` ${classes.pending}`}`}>
            <img src={image} alt={imageAlt} />
            <div className={classes.details}>
                <time dateTime={date.toISOString()}>{displayDate}</time>
                <p>{author}</p>
                <h2>{title}</h2>
                <p>{content}</p>
            </div>
        </article>
    )
}

export default LogEntry
