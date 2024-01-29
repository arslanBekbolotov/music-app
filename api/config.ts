import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

const rootPath = __dirname;
dotenv.config();

cloudinary.config({
  cloud_name: "dgvk1tj1n",
  api_key: "256835579516456",
  api_secret: "r1ka1RAyIhBBU68IBmb3UdUtjqA"
});

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  url:process.env.MONGO_URL,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
};

export default config;
