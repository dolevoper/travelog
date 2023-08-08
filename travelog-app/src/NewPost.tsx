import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogEntryProps } from "./LogEntry"
import * as travelogClient from "./travelogClient";
import classes from "./Feed.module.css";
import { useState } from "react";

function NewPost() {
    const queryClient = useQueryClient();
    const logEntry = useMutation({
        mutationFn: travelogClient.post,
        async onMutate(newLogEntry) {
            await queryClient.cancelQueries({ queryKey: ["feed"] });

            const previousFeed = queryClient.getQueryData(["feed"]);

            queryClient.setQueryData<LogEntryProps[]>(["feed"], (old) => [{ ...newLogEntry, author: "dolevoper", date: new Date() }, ...(old ?? [])]);

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
    const [image, setImage] = useState("");
    const [imageAlt, setImageAlt] = useState("");

    const rows = (content.match(/\n/g)?.length ?? 0) + 1;

    return (
        <form className={classes.form} onSubmit={(e) => {
            e.preventDefault();

            logEntry.mutate({
                title,
                content,
                image,
                imageAlt
            });

            setTitle("");
            setContent("");
            setImage("");
            setImageAlt("");
        }}>
            <h2>Tell us about your latest travel</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={logEntry.isLoading} />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={rows} disabled={logEntry.isLoading}></textarea>
            <div className={classes.imageSection}>
                <img src={image || "https://placehold.co/200?text=Preview"} alt={imageAlt} />
                <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} disabled={logEntry.isLoading} />
                <input type="text" placeholder="Image alt" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} disabled={logEntry.isLoading} />
            </div>
            <button type="submit" disabled={logEntry.isLoading}>Post</button>
        </form>
    )
}

export default NewPost
