import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';

const RootLayout = () => {
    return (
        <>
          <Navbar></Navbar>
           <Outlet></Outlet> 
           <Footer></Footer>
        </>
    );
};

export default RootLayout;