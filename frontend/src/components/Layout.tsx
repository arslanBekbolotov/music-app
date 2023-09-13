import React, {PropsWithChildren} from 'react';
import {Container} from "@mui/material";
import Header from "./Header";

const Layout:React.FC<PropsWithChildren> = ({children}) => {
    return (
        <div>
            <header>
                <Header/>
            </header>
            <Container>
                <main>
                    {children}
                </main>
            </Container>
        </div>
    );
};

export default Layout;