import express from "express";
import {imagesUpload} from "../multer";
import {Album} from "../models/Album";

const albumsRouter = express.Router();

albumsRouter.post('/',imagesUpload.single('image'),async (req, res,next)=>{
    const{name,artist,release} = req.body;
    const image = req.file ? req.file.filename : null;

    const album = new Album({name,artist,release,image});

    try{
        await album.save();
        return res.send(album);
    }catch (e){
        next(e);
    }
});

albumsRouter.get('/',async (req, res,next)=>{
    const {artist} = req.query;

    try{
        if(artist){
            const albums = await Album.find({artist});
            return res.send(albums);
        }

        const albums = await Album.find();
        return res.send(albums);
    }catch (e){
        next(e);
    }
});

albumsRouter.get('/:id',async (req, res,next)=>{
    const {id} = req.params;

    try{
        const albums = await Album.findOne({_id:id}).populate('artist');
        return res.send(albums);
    }catch (e){
        next(e);
    }
});

export default albumsRouter;