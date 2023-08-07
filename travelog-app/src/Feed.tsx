import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LogEntry, { LogEntryProps } from "./LogEntry"
import * as travelogClient from "./travelogClient";
import classes from "./Feed.module.css";
import { useEffect, useState } from "react";

function Feed() {
    const { data, isFetching } = useQuery(["feed"], travelogClient.getFeed);
    const queryClient = useQueryClient();
    const logEntry = useMutation({
        mutationFn: travelogClient.post,
        async onMutate(newLogEntry) {
            await queryClient.cancelQueries({ queryKey: ["feed"] });

            const previousFeed = queryClient.getQueryData(["feed"]);

            queryClient.setQueryData<LogEntryProps[]>(["feed"], (old) => [...(old ?? []), { ...newLogEntry, author: "dolevoper", date: new Date() }]);

            return { previousFeed };
        },
        onError(_, __, context) {
            context && queryClient.setQueryData(["feed"], context.previousFeed);
        },
        onSettled() {
            return queryClient.invalidateQueries({ queryKey: ["feed"] });
        },
    });
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rows, setRows] = useState(0);
    const [image, setImage] = useState("");
    const [imageAlt, setImageAlt] = useState("");

    useEffect(() => {
        console.log("hello", content, content.match(/\n/g));
        setRows(content.match(/\n/g)?.length ?? 0);
    }, [content]);

    return (
        <>
            <form className={classes.form} onSubmit={(e) => {
                e.preventDefault();

                logEntry.mutate({
                    title,
                    content,
                    image,
                    imageAlt
                });
            }}>
                <h2>Tell us about your latest travel</h2>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={rows}></textarea>
                <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
                <input type="text" placeholder="Image alt" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} />
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
