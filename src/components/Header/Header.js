import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    return (
        <nav className="navSection">
            <div className="logo">
                <h1>Desh <span>Travels</span></h1>
            </div>
            <ul className="navList">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/logIn">Destination</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li className="userLogIn">User: <span>{loggedIn.name}</span></li>
                <li className="logIn"><Link to="/logIn">LogIn</Link></li>
            </ul>
        </nav>
    );
};

export default Header;