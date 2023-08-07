import classes from "./LogEntry.module.css";

export type LogEntry = {
    image: string,
    imageAlt: string,
    user: string,
    title: string,
    content: string;
};

type LogEntryProps = { entry: LogEntry };

function LogEntry({ entry }: LogEntryProps) {
    return (
        <article className={classes.logEntry}>
            <img src={entry.image} alt={entry.imageAlt} />
            <div className={classes.details}>
                <p>{entry.user}</p>
                <h2>{entry.title}</h2>
                <p>{entry.content}</p>
            </div>
        </article>
    );
}

export default LogEntry
