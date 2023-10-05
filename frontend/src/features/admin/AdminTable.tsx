import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUnpublishedSubjects } from './adminThunk';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import AdminTableRow from './components/AdminTableRow';
import Spinner from '../../components/Spinner';

const AdminTable = () => {
  const dispatch = useAppDispatch();
  const { tracks, albums, artists, fetchLoading } = useAppSelector((state) => state.adminStore);

  useEffect(() => {
    dispatch(fetchUnpublishedSubjects());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: '10px' }}>
        Table of Unpublished Items
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ border: '1px solid #ccc' }}>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Publish</TableCell>
              </TableRow>
            </TableHead>
            {fetchLoading ? (
              <Spinner />
            ) : (
              <TableBody>
                {artists.map((artist) => (
                  <AdminTableRow key={artist._id} item={artist} subjectName="artist" />
                ))}

                {albums.map((album) => (
                  <AdminTableRow key={album._id} item={album} subjectName="album" />
                ))}

                {tracks.map((track) => (
                  <AdminTableRow key={track._id} item={track} subjectName="track" />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default AdminTable;
