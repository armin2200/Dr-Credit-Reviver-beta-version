import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      render={props =>
        rest.isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: rest.redirectPath,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
