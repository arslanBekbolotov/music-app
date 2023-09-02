import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.POST || 8080;

app.use(cors());
app.use(express.json());

const run = async () => {
    await mongoose.connect("mongodb://localhost:27017/music");

    app.listen(PORT, () => {
        console.log(`Server started on ${PORT} port!`);
    });

    process.on("exit", () => {
        mongoose.disconnect();
    });
};

run().catch((e) => console.log(e));