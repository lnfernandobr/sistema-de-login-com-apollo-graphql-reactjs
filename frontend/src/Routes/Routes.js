import { Route, Switch } from "react-router-dom";
import { RouterPaths } from "./RouterPaths";
import React from "react";
import { PageError } from "../PageError/PageError";
import { SignUp } from "../Login/SignUp/SignUpContainer";
import { SignIn } from "../Login/SignIn/SignInContainer";
import { ResetPassword } from "../ResetPassword/ResetPasswordContainer";

const Home = () => {
  return <h1>main</h1>;
};

export const Routes = () => (
  <Switch>
    <Route exact path={RouterPaths.ROOT} component={Home} />
    <Route path={RouterPaths.SIGN_IN} component={SignIn} />
    <Route path={RouterPaths.SIGN_UP} component={SignUp} />
    <Route path={RouterPaths.RESET_PASSWORD} component={ResetPassword} />

    <Route path={RouterPaths.NOT_FOUND} component={PageError} />
  </Switch>
);
