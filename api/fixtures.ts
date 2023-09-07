import mongoose from "mongoose";
import config from "./config";
import { Artist } from "./models/Artist";
import { User } from "./models/User";
import { Album } from "./models/Album";
import { TrackHistory } from "./models/TracksHistory";
import { Track } from "./models/Track";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("artists");
    await db.dropCollection("users");
    await db.dropCollection("albums");
    await db.dropCollection("tracks");
    await db.dropCollection("trackhistories");
  } catch (error) {
    console.log("Collection were not present, skipping drop...");
  }

  const [artistJohn, artistDoe] = await Artist.create(
    {
      name: "John",
      image: "fixtures/artistJohn.jpg",
    },
    {
      name: "Doe",
    },
  );

  const user1 = new User({
    username: "username#23",
    password: "123",
  });

  user1.generateToken();
  await user1.save();

  const [firstAlbum, secondAlbum] = await Album.create(
    {
      name: "album1",
      artist: artistJohn._id,
    },
    {
      name: "album2",
      artist: artistDoe._id,
    },
  );

  const [firstTrack, secondTrack] = await Track.create(
    {
      name: "track1",
      album: firstAlbum._id,
      duration: "2:30",
    },
    {
      name: "track2",
      album: secondAlbum._id,
      duration: "3:30",
    },
  );

  const [firstTrackHistory, secondTrackHistory] = await TrackHistory.create(
    {
      user: user1._id,
      track: firstTrack._id,
    },
    {
      user: user1._id,
      track: secondTrack._id,
    },
  );

  await db.close();
};

run().catch(console.error);
