import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    image: String,
    imageAlt: String,
    user: String,
    title: String,
    content: String,
});

export default mongoose.model("LogEntry", schema);
