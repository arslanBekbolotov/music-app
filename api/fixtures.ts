import mongoose from "mongoose";
import config from "./config";
import { Artist } from "./models/Artist";
import { Album } from "./models/Album";
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

  const [michaelJackson, theBeatles] = await Artist.create(
    {
      name: "Michael Jackson",
      image: "fixtures/michaelJackson.jpeg",
    },
    {
      name: "The Beatles",
      image: "fixtures/beatles.webp",
    },
  );

  const [album1, album2, album3, album4] = await Album.create(
    {
      name: "Help!",
      artist: theBeatles._id,
      release: "1965",
      image: "fixtures/helpAlbum.jpeg",
    },
    {
      name: "Let It Be",
      artist: theBeatles._id,
      release: "1970",
      image: "fixtures/letItBeAlbum.jpeg",
    },
    {
      name: "Thriller",
      artist: michaelJackson._id,
      release: "1982",
      image: "fixtures/thrillerAlbum.png",
    },
    {
      name: "Bad",
      artist: michaelJackson._id,
      release: "1987",
      image: "fixtures/badAlbum.jpeg",
    },
  );

  const [album1Track1, album1Track2, album1Track3, album1Track4, album1Track5] =
    await Track.create(
      {
        name: "Yesterday",
        number: 1,
        album: album1._id,
        youtubeLink: "https://www.youtube.com/watch?v=wXTJBr9tt8Q",
        duration: "3:37",
        image: "fixtures/Yesterday.jpeg",
        mp3File: "fixtures/Yesterday.mp3",
      },
      {
        name: "Come Together",
        number: 2,
        album: album1._id,
        duration: "4:34",
      },
      {
        name: "Let It Be",
        number: 3,
        album: album1._id,
        duration: "3:21",
      },
      {
        name: "BlackBird",
        number: 4,
        album: album1._id,
        duration: "3:20",
      },
      {
        name: "Here Comes The Sun",
        number: 5,
        album: album1._id,
        duration: "3:39",
        image: "fixtures/herecomesthesun.jpeg",
        mp3File: "fixtures/HereComesTheSun.mp3",
      },
    );

  const [album2Track1, album2Track2, album2Track3, album2Track4, album2Track5] =
    await Track.create(
      {
        name: "A Day in the Life",
        number: 1,
        album: album2._id,
        duration: "3:37",
      },
      {
        name: "Something",
        youtubeLink: "https://www.youtube.com/watch?v=UelDrZ1aFeY",
        number: 4,
        album: album2._id,
        duration: "4:34",
      },
      {
        name: "I Want to Hold Your Hand",
        number: 7,
        album: album2._id,
        duration: "3:21",
      },
      {
        name: "Hey Jude",
        number: 2,
        album: album2._id,
        duration: "3:20",
      },
      {
        name: "Across the Universe",
        number: 6,
        album: album2._id,
        duration: "3:39",
      },
    );

  const [album3Track1, album3Track2, album3Track3, album3Track4, album3Track5] =
    await Track.create(
      {
        name: "Billie Jean",
        number: 1,
        youtubeLink: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
        album: album3._id,
        duration: "3:37",
      },
      {
        name: "Beat It",
        number: 3,
        album: album3._id,
        duration: "4:34",
      },
      {
        name: "Remember the Time",
        number: 2,
        album: album3._id,
        duration: "3:21",
      },
      {
        name: "Ghosts",
        number: 5,
        album: album3._id,
        duration: "3:20",
      },
      {
        name: "Thunderstruck",
        number: 4,
        youtubeLink: "https://www.youtube.com/watch?v=v2AC41dglnM",
        album: album3._id,
        duration: "3:39",
      },
    );

  const [album4Track1, album4Track2, album4Track3, album4Track4, album4Track5] =
    await Track.create(
      {
        name: "Bad",
        album: album4._id,
        number: 1,
        youtubeLink: "https://www.youtube.com/watch?v=dsUXAEzaC3Q",
        duration: "3:37",
        image: "fixtures/bad.jpeg",
        mp3File: "fixtures/Bad.mp3",
      },
      {
        name: "Smooth Criminal",
        number: 2,
        album: album4._id,
        duration: "4:34",
      },
      {
        name: "Speed Demon",
        number: 3,
        album: album4._id,
        duration: "3:21",
      },
      {
        name: "Man in the Mirror",
        number: 6,
        album: album4._id,
        duration: "3:20",
      },
      {
        name: "They Don't Care About Us",
        album: album4._id,
        number: 5,
        duration: "3:39",
        image: "fixtures/theyDontCare.jpeg",
        mp3File: "fixtures/TheyDon'tCareAboutUs.mp3",
      },
    );

  await db.close();
};

run().catch(console.error);
