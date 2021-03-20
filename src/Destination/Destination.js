import React, { useContext, useState } from 'react';
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

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }

//handle email and password login
    const [newUser, setNewUser] = useState(false)

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signOutUser = {
                    isSignIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setLoggedIn(signOutUser)
            })
            .catch(err => {
                console.log(err)
            })
        console.log("sign out")
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6
            const passwordHasNumber = /\d{1,}/.test(e.target.value)
            isFieldValid = (isPasswordValid && passwordHasNumber)
        }
        if (isFieldValid) {
            const newUserInfo = { ...loggedIn }
            newUserInfo[e.target.name] = e.target.value
            setLoggedIn(newUserInfo)
        }
    }
    const handleSubmit = (e) => {
        if (newUser && loggedIn.email && loggedIn.password) {
            firebase.auth().createUserWithEmailAndPassword(loggedIn.email, loggedIn.password)
                .then(res => {
                    const newUserInfo = { ...loggedIn }
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    setLoggedIn(newUserInfo)
                    history.push(from)
                    updateUserName(loggedIn.name)
                })
                .catch(error => {
                    const newUserInfo = { ...loggedIn };
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setLoggedIn(newUserInfo)

                });
        }
        if (!newUser && loggedIn.email && loggedIn.password) {
            firebase.auth().signInWithEmailAndPassword(loggedIn.email, loggedIn.password)
                .then(res => {
                    const newUserInfo = { ...loggedIn }
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    setLoggedIn(newUserInfo)
                    history.push(from)
                    console.log('sign in user info', res.loggedIn)
                })
                .catch(error => {
                    const newUserInfo = { ...loggedIn };
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setLoggedIn(newUserInfo)
                });
        }

        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('update successfully')
        }).catch(function (error) {
            console.log(error)
        });
    }



//Handle google login

    const handleGoogleSignIn = () => {
        var glProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(glProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const newUserInfo = { name: displayName, email }
                setLoggedIn(newUserInfo)
                history.push(from)

            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }


    //handle facebook sign
    const handleFacebookSignIn = () => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var { displayName, email } = result.user;
                const newUserInfo = { name: displayName, email }
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
            {
                loggedIn.isSignIn ? <button onClick={handleSignOut}>Sign Out</button> : <button className="mainBtn">Sign in</button>
            }
            <br />
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign Up</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name" />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email Address" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password at list 6 character 1 number" required />
                <br />
                <input type="submit" className="mainBtn" value="Submit" />
            </form>
            <br />
            <p style={{ color: "red" }}>{loggedIn.error}</p>
            {
                loggedIn.success && <p style={{ color: "green", textAlign: 'center' }}>User {newUser ? 'created' : 'Logged In'} Successfully</p>
            }
            <br/>
            <h2 className="orHeading">Or</h2>

            <button className="googleBtn" onClick={handleGoogleSignIn}>Continue With Google</button>
            <br />
            <br/>
            <button className="googleBtn" onClick={handleFacebookSignIn}>Continue With Facebook</button>
        </div>
    );
};

export default Destination;