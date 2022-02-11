import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import isLogin from 'functions/isLogin'
import PropTypes from 'prop-types'

const PublicRoute = ({ component: Component, restricted, exact, path }) => (
    <Route
        path={path}
        exact={exact}
        render={() =>
            isLogin() && restricted ? <Redirect to="/login" /> : <Component />
        }
    />
)

PublicRoute.defaultProps = {
    exact: false,
    restricted: false,
}

PublicRoute.propTypes = {
    component: PropTypes.func.isRequired,
    restricted: PropTypes.bool,
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
}

export default PublicRoute
