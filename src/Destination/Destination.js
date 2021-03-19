import React, { useContext } from 'react';
import './Destination.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../App';
import { useHistory, useLocation } from 'react-router';


const Destination = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)

    let history = useHistory()
    let location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig)
    }

    const handleGoogleSignIn = () => {
        var glProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(glProvider)
            .then((result) => {
                const {displayName, email} = result.user;
                const newUserInfo = {name: displayName, email}
                setLoggedIn(newUserInfo)
                history.push(from)
               
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
        });
    }

    const handleFacebookSignIn = () => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var {displayName, email} = result.user;
                const newUserInfo = {name: displayName, email}
                setLoggedIn(newUserInfo)
                history.push(from)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
        });
    }
    return (
        <div className="logInAuth">
            <h1 className="orHeadingOne">Create Your Account</h1>
            <button className="googleBtn" onClick={handleGoogleSignIn}>Continue With Google</button>
            <br/>
            <h2 className="orHeading">Or</h2>
            <br/>
            <button className="googleBtn" onClick={handleFacebookSignIn}>Continue With Facebook</button>
        </div>
    );
};

export default Destination;