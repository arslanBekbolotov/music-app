import {
    Box,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {LoadingButton} from "@mui/lab";
import SendIcon from  "@mui/icons-material/Send";
import FileInput from "../../components/FileInput";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {fetchArtists} from "../artists/artistsThunk";
import {selectArtists} from "../artists/artistsSlice";
import {ITrackFormMutation} from "../../types";
import {fetchAlbumsByQuery, fetchAllAlbums} from "../albums/albumsThunk";
import {selectAlbums} from "../albums/albumsSlice";
import { createTrack } from './tracksThunk';

const NewTrack = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const artists = useAppSelector(selectArtists);
    const albums = useAppSelector(selectAlbums);
    const {createTrackLoading,tracksValidationError} = useAppSelector(state => state.tracksStore)
    const [artist,setArtist] = useState<string>("");
    const [state,setState] = useState<ITrackFormMutation>({
        name: "",
        album: "",
        image: null,
        youtubeLink: "",
        number: "",
        duration:"",
        mp3File: null,
    });

    useEffect(() => {
        dispatch(fetchArtists());
        dispatch(fetchAllAlbums());
    }, [dispatch]);

    const onChangeSelect = async (e: SelectChangeEvent)=>{
        const {value,name} = e.target

        if(name === "album"){
            setState(prevState => ({...prevState,album:value}));
        }else{
            setState(prevState => ({...prevState,album:""}));
            setArtist(value);
            await dispatch(fetchAlbumsByQuery(value));
        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value,name} = e.target
        setState(prevState => ({...prevState,[name]:value}));
    };

    const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const files = e.target.files;

        if (files) {
            setState((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    const onSubmit = async (e:React.FormEvent) =>{
        e.preventDefault();

        try{
            await dispatch(createTrack(state)).unwrap();
            navigate('/');
        }catch {
            //nothing
        }
    }

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={onSubmit} sx={{ mt: 3}} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="set name of album"
                            name="name"
                            required
                            fullWidth
                            value={state.name}
                            label="Name"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            type="number"
                            label="Number"
                            name="number"
                            value={state.number}
                            onChange={handleChange}
                            error={Boolean(tracksValidationError?.errors.number.message)}
                            helperText={tracksValidationError?.errors.number.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="track_artist_select">Artists</InputLabel>
                            <Select
                                labelId="track_artist_select"
                                value={artist}
                                name="artist"
                                label="Artists"
                                onChange={onChangeSelect}
                            >
                                {artists.map(item=>(
                                    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="track_album_select">Albums</InputLabel>
                            <Select
                                required
                                labelId="track_album_select"
                                name="album"
                                value={state.album}
                                label="Albums"
                                onChange={onChangeSelect}
                            >
                                {albums.map(item=>(
                                    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{pt:'16px'}}>
                        <FileInput
                            onChange={filesInputChangeHandler}
                            name="image"
                            label="image"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{pt:'16px'}}>
                        <FileInput
                            onChange={filesInputChangeHandler}
                            name="MP3file"
                            label="MP3file"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="youtubeLink"
                            fullWidth
                            value={state.youtubeLink}
                            label="Youtube Link"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="duration"
                            fullWidth
                            value={state.duration}
                            label="Duration"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid container item xs={12} justifyContent="center">
                        <LoadingButton
                            loading={createTrackLoading}
                            type="submit"
                            endIcon={<SendIcon/>}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2,maxWidth:'25%'}}
                        >
                            Send
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default NewTrack;