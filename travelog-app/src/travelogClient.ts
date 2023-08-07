import { LogEntryProps } from "./LogEntry";

export async function getFeed() {
    const entries = await fetch("http://localhost:3000/feed")
        .then((res) => res.json()) as any[];

    return entries.map(({ date, ...entry }) => ({
        ...entry,
        date: new Date(date as string)
    } as LogEntryProps));
}

export async function post(data: { title: string, content: string, image: string, imageAlt: string }) {
    await fetch("http://localhost:3000/logEntry/post", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json"
        }
    });
}
