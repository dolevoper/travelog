import { useQuery } from "@tanstack/react-query";
import LogEntry from "./LogEntry"
import * as travelogClient from "./travelogClient";
import classes from "./Feed.module.css";
import { useEffect, useState } from "react";

function Feed() {
    const { data, isFetching } = useQuery(["feed"], travelogClient.getFeed);
    const [content, setContent] = useState("");
    const [rows, setRows] = useState(0);

    useEffect(() => {
        console.log("hello", content, content.match(/\n/g));
        setRows(content.match(/\n/g)?.length ?? 0);
    }, [content]);

    return (
        <>
            <form className={classes.form}>
                <h2>Tell us about your latest travel</h2>
                <input type="text" placeholder="Title" />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={rows}></textarea>
                <input type="text" placeholder="Image URL" />
                <input type="text" placeholder="Image alt" />
                <button type="submit">Post</button>
            </form>
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
