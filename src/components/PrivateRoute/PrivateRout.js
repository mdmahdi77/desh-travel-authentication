import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivateRout = ({ children, ...rest }) => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    return (
        <Route
        {...rest}
            render={({ location }) =>
                loggedIn.name ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
                )
            }
        />
    );
};

export default PrivateRout;