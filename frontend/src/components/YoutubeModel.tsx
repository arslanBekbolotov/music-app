import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {onClose, selectYoutubeLink} from '../features/tracks/tracksSlice';

const YoutubeModel = () => {
  const dispatch = useAppDispatch();
  const youtubeLink = useAppSelector(selectYoutubeLink);

  return (
    <Dialog onClose={() => dispatch(onClose())} open={!!youtubeLink}>
      <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
        Youtube Music Player
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => dispatch(onClose())}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <div>
          <iframe
            width="560"
            height="315"
            src={youtubeLink.replace('watch?v=', 'embed/')}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YoutubeModel;
