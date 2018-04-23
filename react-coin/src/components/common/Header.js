import React from 'react';
import logo from './logo.png';
import './Header.css';


// Defined component Header as a class which has some additional features
// local components are only available to their classes

const Header = () => {
    return (
        <div className="Header">
            <img src={logo} alt="logo" className="Header-logo"/>
        </div>
    );
}

export default Header;