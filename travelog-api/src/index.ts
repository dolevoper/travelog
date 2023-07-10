import "dotenv/config";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import LogEntry from "./LogEntry";

let conn: typeof mongoose;
const app = express();

app.use(cors());

app.get("/feed", async (_, res) => {
    const entries = await LogEntry.find();

    entries.sort((a, b) => (+b.date!) - (+a.date!));

    res.status(200);
    res.json(entries);
    res.end();
});

const port = process.env.PORT ?? 3000;
const server = createServer(app);

async function init() {
    const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

    if (!mongoConnectionString) {
        throw new Error("must configure mongo connection string");
    }

    conn = await mongoose.connect(mongoConnectionString);

    server.listen(port, () => console.log(`server started on http://localhost:${port}`));
}

init();
