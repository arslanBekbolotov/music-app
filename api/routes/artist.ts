import express from "express";
import {imagesUpload} from "../multer";
import {Artist} from "../models/Artist";

const artistsRouter = express.Router();

artistsRouter.post('/',imagesUpload.single('image'),async (req, res,next)=>{
    const{name,info} = req.body;
    const image = req.file ? req.file.filename : null;

    const artist = new Artist({name,info,image});

    try{
        await artist.save();
        return res.send(artist);
    }catch (e){
        next(e);
    }
});

artistsRouter.get('/',async (req, res)=>{
    try {
        const artist = await Artist.find();
        return res.send(artist);
    } catch(e) {
        return res.sendStatus(500);
    }
});

export default artistsRouter;