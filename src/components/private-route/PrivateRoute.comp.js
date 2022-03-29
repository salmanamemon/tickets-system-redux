import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { loginSuccess } from "../login/loginSlice";
import { DefaultLayout } from "../../layout/DefaultLayout";
import { getUserProfile } from "../../pages/dashoard/userAction"




// const isAuth = true;
export const PrivateRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    !user.id && dispatch(getUserProfile())

    !isAuth && sessionStorage.getItem('authToken') && dispatch(loginSuccess())
  }, [dispatch, isAuth, user.id]);
  
  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? <DefaultLayout>{children}</DefaultLayout> : <Redirect to="/" />
      }
    />
  );
};
