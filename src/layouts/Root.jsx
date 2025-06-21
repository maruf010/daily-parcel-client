import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/shared/Navbar/Navbar';
import Footer from '../Pages/shared/Footer/Footer';

const Root = () => {
    return (
        <>
            <div className='max-w-7xl mx-auto'>
                <Navbar></Navbar>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Root;