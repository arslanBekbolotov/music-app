import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import albumsRouter from "./routes/album";
import artistsRouter from "./routes/artist";
import tracksRouter from "./routes/track";

const app = express();
const PORT = 8001;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);

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
