import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import albumsRouter from "./routes/albums";
import artistsRouter from "./routes/artists";
import tracksRouter from "./routes/tracks";
import usersRouter from "./routes/users";
import trackHistoryRouter from "./routes/trackHistory";
import config from "./config";
import adminRouter from "./routes/admin";

const app = express();
const PORT = 8001;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);
app.use("/users", usersRouter);
app.use("/track_history", trackHistoryRouter);
app.use("/unpublished", adminRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port!`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch((e) => console.log(e));
