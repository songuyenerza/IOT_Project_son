import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({ children, ...rest }) => {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                !auth.user ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default AuthRoute
