import { LogEntry } from "./LogEntry";

export async function fetchFeed(): Promise<LogEntry[]> {
    const response = await fetch("http://localhost:3000/feed");
    const data = await response.json() as LogEntry[];

    return data;
}
