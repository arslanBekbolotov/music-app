import mongoose from "mongoose";
import config from "./config";
import { Artist } from "./models/Artist";
import { Album } from "./models/Album";
import { Track } from "./models/Track";
import { User } from "./models/User";
import { randomUUID } from "crypto";

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

  await User.create(
    {
      username: "user",
      password: "123",
      token: randomUUID(),
      role: "user",
    },
    {
      username: "admin",
      password: "123",
      token: randomUUID(),
      role: "admin",
    },
  );

  const [michaelJackson, theBeatles, ac_dc] = await Artist.create(
    {
      name: "Michael Jackson",
      image: "fixtures/michaelJackson.jpeg",
      isPublished: true,
    },
    {
      name: "The Beatles",
      image: "fixtures/beatles.webp",
      isPublished: true,
    },
    {
      name: "AC/DC",
      image: "fixtures/ac_dc.jpeg",
      isPublished: false,
    },
  );

  const [album1, album2, album3, album4, album5] = await Album.create(
    {
      name: "Help!",
      artist: theBeatles._id,
      release: "1965",
      image: "fixtures/helpAlbum.jpeg",
      isPublished: true,
    },
    {
      name: "Let It Be",
      artist: theBeatles._id,
      release: "1970",
      image: "fixtures/letItBeAlbum.jpeg",
      isPublished: true,
    },
    {
      name: "Thriller",
      artist: michaelJackson._id,
      release: "1982",
      image: "fixtures/thrillerAlbum.png",
      isPublished: true,
    },
    {
      name: "Bad",
      artist: michaelJackson._id,
      release: "1987",
      image: "fixtures/badAlbum.jpeg",
      isPublished: true,
    },
    {
      name: "Highway to Hell",
      artist: ac_dc._id,
      release: "1979",
      mage: "fixtures/ac_dc.jpeg",
      isPublished: false,
    },
  );

  await Track.create(
    {
      name: "Yesterday",
      number: 1,
      album: album1._id,
      youtubeLink: "https://www.youtube.com/watch?v=wXTJBr9tt8Q",
      duration: "3:37",
      image: "fixtures/Yesterday.jpeg",
      mp3File: "fixtures/Yesterday.mp3",
      isPublished: true,
    },
    {
      name: "Come Together",
      number: 2,
      album: album1._id,
      duration: "4:34",
      isPublished: true,
    },
    {
      name: "Let It Be",
      number: 3,
      album: album1._id,
      duration: "3:21",
      isPublished: true,
    },
    {
      name: "BlackBird",
      number: 4,
      album: album1._id,
      duration: "3:20",
      isPublished: true,
    },
    {
      name: "Here Comes The Sun",
      number: 5,
      album: album1._id,
      duration: "3:39",
      image: "fixtures/herecomesthesun.jpeg",
      mp3File: "fixtures/HereComesTheSun.mp3",
      isPublished: true,
    },
  );

  await Track.create(
    {
      name: "A Day in the Life",
      number: 1,
      album: album2._id,
      duration: "3:37",
      isPublished: true,
    },
    {
      name: "Something",
      youtubeLink: "https://www.youtube.com/watch?v=UelDrZ1aFeY",
      number: 4,
      album: album2._id,
      duration: "4:34",
      isPublished: true,
    },
    {
      name: "I Want to Hold Your Hand",
      number: 7,
      album: album2._id,
      duration: "3:21",
      isPublished: true,
    },
    {
      name: "Hey Jude",
      number: 2,
      album: album2._id,
      duration: "3:20",
      isPublished: true,
    },
    {
      name: "Across the Universe",
      number: 6,
      album: album2._id,
      duration: "3:39",
      isPublished: true,
    },
  );

  await Track.create(
    {
      name: "Billie Jean",
      number: 1,
      youtubeLink: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
      album: album3._id,
      duration: "3:37",
      isPublished: true,
    },
    {
      name: "Beat It",
      number: 3,
      album: album3._id,
      duration: "4:34",
      isPublished: true,
    },
    {
      name: "Remember the Time",
      number: 2,
      album: album3._id,
      duration: "3:21",
      isPublished: true,
    },
    {
      name: "Ghosts",
      number: 5,
      album: album3._id,
      duration: "3:20",
      isPublished: true,
    },
    {
      name: "Thunderstruck",
      number: 4,
      youtubeLink: "https://www.youtube.com/watch?v=v2AC41dglnM",
      album: album3._id,
      duration: "3:39",
      isPublished: true,
    },
  );

  await Track.create(
    {
      name: "Bad",
      album: album4._id,
      number: 1,
      youtubeLink: "https://www.youtube.com/watch?v=dsUXAEzaC3Q",
      duration: "3:37",
      image: "fixtures/bad.jpeg",
      mp3File: "fixtures/Bad.mp3",
      isPublished: true,
    },
    {
      name: "Smooth Criminal",
      number: 2,
      album: album4._id,
      duration: "4:34",
      isPublished: true,
    },
    {
      name: "Speed Demon",
      number: 3,
      album: album4._id,
      duration: "3:21",
      isPublished: true,
    },
    {
      name: "Man in the Mirror",
      number: 6,
      album: album4._id,
      duration: "3:20",
      isPublished: true,
    },
    {
      name: "They Don't Care About Us",
      album: album4._id,
      number: 5,
      duration: "3:39",
      image: "fixtures/theyDontCare.jpeg",
      mp3File: "fixtures/TheyDon'tCareAboutUs.mp3",
      isPublished: true,
    },
  );

  await Track.create(
    {
      name: "Thunderstruck",
      number: 1,
      youtubeLink: "https://www.youtube.com/watch?v=v2AC41dglnM",
      album: album5._id,
      isPublished: false,
      duration: "3:32",
    },
    {
      name: "Back in Black",
      number: 2,
      album: album5._id,
      isPublished: false,
      duration: "4:39",
    },
    {
      name: "Highway to Hell",
      number: 4,
      album: album5._id,
      isPublished: false,
      duration: "3:19",
    },
  );

  await db.close();
};

run().catch(console.error);
