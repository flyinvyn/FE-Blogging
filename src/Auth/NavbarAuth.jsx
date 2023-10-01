import React from 'react';
import NavbarLogin from '../Components/Navbar/NavbarLogin';
import Navbar from '../Components/Navbar/Navbar';

const NavbarAuth = () => {
    const isLogin = localStorage.getItem('token');
    if (!isLogin) {
        return <NavbarLogin />;
    }
    return <Navbar />;
};

export default NavbarAuth;