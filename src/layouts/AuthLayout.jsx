import React from 'react';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png'
import WebLogo from '../Pages/shared/WebLogo/WebLogo';
const AuthLayout = () => {
    return (
        <div className="p-5 md:p-12 bg-base-200 ">
            <WebLogo></WebLogo>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1 flex justify-center bg-green-200'>
                    <img
                        src={authImage}
                        className=" md:max-w-sm rounded-lg"
                    />
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;