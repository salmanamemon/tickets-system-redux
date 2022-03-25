import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { loginSuccess } from "../login/loginSlice";
import { DefaultLayout } from "../../layout/DefaultLayout";

// const isAuth = true;
export const PrivateRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.login);
  useEffect(() => {
    sessionStorage.getItem('authToken') && dispatch(loginSuccess())
  }, [dispatch]);
  
  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? <DefaultLayout>{children}</DefaultLayout> : <Redirect to="/" />
      }
    />
  );
};
