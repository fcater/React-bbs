import React from "react";
import auth from "../../services/authServices";
import { Route, Redirect } from "react-router-dom";

const AdminProtectedRoute = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUserOffLine().isAdmin) return <Redirect to="/" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AdminProtectedRoute;
