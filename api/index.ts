import cors from 'cors';
import express from 'express';
import albumsRouter from './routes/albums';
import artistsRouter from './routes/artists';
import tracksRouter from './routes/tracks';
import usersRouter from './routes/users';
import trackHistoryRouter from './routes/trackHistory';
import adminRouter from './routes/admin';
import config from "./config";
import mongoose from "mongoose";

const corsOptions = {
  origin: '*',
};


const app = express();
const PORT= process.env.PORT || 8080;

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', trackHistoryRouter);
app.use('/unpublished', adminRouter);

const url = config.url || '';

try {
  mongoose.connect(url);

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });

} catch (e) {
  console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));
