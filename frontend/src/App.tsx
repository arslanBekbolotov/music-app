import React from 'react';
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Layout from "./components/Layout";
import Albums from "./features/albums/Albums";

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
  return (
    <div className="App">
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Layout>
              <Routes>
                  <Route path='/' element={<Artists/>}/>
                  <Route path='/albums/:id' element={<Albums/>}/>
              </Routes>
            </Layout>
        </ThemeProvider>
    </div>
  );
}

export default App;
