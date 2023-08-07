import LogEntryComponent from "./LogEntry"
import { fetchFeed } from "./travelogClient";
import classes from "./Feed.module.css";
import { useQuery } from "@tanstack/react-query";

function Feed() {
    const { data, isFetching } = useQuery(["feed"], fetchFeed);

    return (
        <>
            {isFetching && <div>Loading...</div>}
            {!!data?.length && <ol className={classes.feed}>
                {data.map((entry, index) => (
                    <li key={index}><LogEntryComponent entry={entry} /></li>
                ))}
            </ol>}
            {data && !data.length && <div>Your feed is empty.</div>}
        </>
    )
}

export default Feed
