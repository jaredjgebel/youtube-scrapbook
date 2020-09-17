import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import Loading from "../components/views/Loading";

const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
      returnTo: "/books",
    })}
    {...args}
  />
);

export default PrivateRoute;
