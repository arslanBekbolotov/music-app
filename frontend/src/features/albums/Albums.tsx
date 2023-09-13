import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAlbums} from "./albumsThunk";
import {useParams} from "react-router-dom";
import AlbumsItem from "./components/AlbumsItem";

const Albums = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams() as {id:string};
    const {albums,fetchLoading} = useAppSelector(state => state.albumsStore)

    useEffect(() => {
        dispatch(fetchAlbums(id))
    }, []);

    return (
        <div>
            {albums.map(album=>(
                <AlbumsItem key={album._id}/>
            ))}
        </div>
    );
};

export default Albums;