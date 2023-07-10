import { useQuery } from "@tanstack/react-query";
import LogEntry from "./LogEntry"
import * as travelogClient from "./travelogClient";
import classes from "./Feed.module.css";

function Feed() {
    const { data, isFetching } = useQuery(["feed"], travelogClient.getFeed);

    return (
        <>
            <div className={classes.loadingIndicator} style={{ visibility: isFetching ? "visible" : "hidden" }}>Loading...</div>
            {data && <ol className={classes.feed}>
                {data.map((entry, index) => (
                    <li key={index}><LogEntry {...entry} /></li>
                ))}
            </ol>}
            {!data?.length && <div>Your feed is empty.</div>}
        </>
    )
}

export default Feed
