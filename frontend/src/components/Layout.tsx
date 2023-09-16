import React, { PropsWithChildren } from "react";
import { Container } from "@mui/material";
import Header from "./AppToolbar/Header";
import MusicPlayer from "./Player";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <Container>
        <main>{children}</main>
        <MusicPlayer />
      </Container>
    </div>
  );
};

export default Layout;
