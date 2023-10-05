import path from 'path';
import dotenv from 'dotenv';

const rootPath = __dirname;
dotenv.config();

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://localhost:27017/music',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET_KEY,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
};

export default config;
