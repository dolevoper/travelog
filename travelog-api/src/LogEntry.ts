import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    date: Date,
    author: String,
    title: String,
    content: String,
    image: String,
    imageAlt: String
});

export default mongoose.model("LogEntry", schema);
