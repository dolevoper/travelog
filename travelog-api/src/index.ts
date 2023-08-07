import "dotenv/config";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import LogEntry from "./LogEntry";

const app = express();

app.use(cors());

app.get("/feed", async (req, res) => {
    const entries = await LogEntry.find();
    res.status(200);
    res.json(entries);
    res.end();
});

const port = process.env.PORT ?? 3000;
const server = createServer(app);

async function init() {
    if (!process.env.MONGO_CONNECTION_STRING) {
        throw new Error("must provide mongo connection string");
    }

    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);

    server.listen(port, () => console.log(`server started on http://localhost:${port}`));
}

init();
