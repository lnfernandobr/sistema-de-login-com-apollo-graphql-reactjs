import { gql } from "apollo-boost";
import { compose, withHandlers } from "recompose";
import { withMessage } from "../../Snackbar/withMessage";
import { RouterPaths } from "../../Routes/RouterPaths";
import { withRouter } from "react-router-dom";
import { SignInComponent } from "./SignIn";
import { graphql } from "@apollo/react-hoc";

const AUTH_TOKEN = "token";
const LOGIN_USER_MUTATION = graphql(
  gql`
    mutation loginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        token
        status {
          message
          code
        }
      }
    }
  `,
  { name: "loginUser" }
);

export const FORGET_PASSWORD_MUTATION = graphql(
  gql`
    mutation forgetPassword($email: String!, $path: String!) {
      forgetPassword(email: $email, path: $path) {
        message
        code
      }
    }
  `,
  { name: "forgetPassword" }
);

export const SignIn = compose(
  LOGIN_USER_MUTATION,
  FORGET_PASSWORD_MUTATION,

  withMessage,
  withRouter,

  withHandlers({
    login: ({ loginUser, showMessage, history }) => async (
      password,
      email,
      dispatch,
      propsEmail,
      propsPassword
    ) => {
      dispatch({
        value: password,
        type: "fieldPassword"
      });

      dispatch({
        value: email,
        type: "fieldEmail"
      });

      if (propsEmail.error || propsPassword.error) {
        showMessage("Preencha os campos em vermelho.", "error");
        return;
      }
      try {
        const { data } = await loginUser({
          variables: { email, password }
        });

        const { code, message } = data.loginUser.status;

        if (code === 101) {
          // error invalid user
          showMessage(message, "error");
          return;
        }

        if (code === 100) {
          // invalid inputs
          showMessage(message, "error");
          return;
        }

        if (code === 200) {
          const tk = data.loginUser.token || "";

          if (tk) {
            window.localStorage.setItem(AUTH_TOKEN, tk);
            history.push(RouterPaths.ROOT);
          }
        }
      } catch (e) {
        showMessage(e, "error");
      }
    },

    recoveryPassword: ({ forgetPassword, showMessage }) => async email => {
      try {
        const { data } = await forgetPassword({
          variables: { email, path: RouterPaths.REDEFINITION_PASSWORD }
        });

        const { code, message } = data.forgetPassword;

        if (code === 200) {
          showMessage("Email enviado com sucesso!", "success");
          return;
        }

        if (code === 101) {
          showMessage(message, "warning");
        }
      } catch (e) {
        showMessage(e);
      }
    }
  })
)(SignInComponent);
