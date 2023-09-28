import React from "react";
import { Route, Routes } from "react-router-dom";
import Artists from "./features/artists/Artists";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./components/Layout";
import Albums from "./features/albums/Albums";
import Tracks from "./features/tracks/Tracks";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import YoutubeModel from "./components/YoutubeModel";
import NewAlbum from "./features/albums/NewAlbum";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppSelector } from "./app/hooks";
import { selectUser } from "./features/users/usersSlice";
import TrackHistory from "./features/trackHistory/TrackHistory";
import NewArtist from "./features/artists/NewArtist";
import NewTrack from "./features/tracks/NewTrack";
import AdminTable from "./features/admin/AdminTable";

function App() {
  const user = useAppSelector(selectUser);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/albums/:id" element={<Albums />} />
            <Route path="/tracks/:id" element={<Tracks />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/unpublished"
              element={
                <ProtectedRoute isAllowed={user?.role === "admin"}>
                  <AdminTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/track_history"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <TrackHistory />
                </ProtectedRoute>
              }
            />
            <Route path="/iframe" element={<YoutubeModel />} />
            <Route
              path="/new_album"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <NewAlbum />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new_track"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <NewTrack />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new_artist"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <NewArtist />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
