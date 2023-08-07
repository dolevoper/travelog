import "dotenv/config";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import mongoose from "mongoose";
import LogEntry from "./LogEntry";

const app = express();

app.use(cors());
app.use(json());

app.get("/feed", async (_, res) => {
    const entries = await LogEntry.find();

    entries.sort((a, b) => (+b.date!) - (+a.date!));

    res.status(200);
    res.json(entries);
    res.end();
});

app.post("/logEntry/post", async (req, res) => {
    await LogEntry.create({
        ...req.body,
        author: "dolevoper",
        date: new Date()
    });

    res.status(200);
    res.end();
});

const port = process.env.PORT ?? 3000;
const server = createServer(app);

async function init() {
    const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

    if (!mongoConnectionString) {
        throw new Error("must configure mongo connection string");
    }

    await mongoose.connect(mongoConnectionString);

    server.listen(port, () => console.log(`server started on http://localhost:${port}`));
}

init();
