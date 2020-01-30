import { compose, withHandlers } from "recompose";
import { ResetPasswordComponent } from "./ResetPassword";
import { graphql } from "@apollo/react-hoc";
import { gql } from "apollo-boost";
import { withMessage } from "../Snackbar/withMessage";
import { withRouter } from "react-router-dom";
import { Router } from "@material-ui/icons";
import { RouterPaths } from "../Routes/RouterPaths";

const RESET_PASSWORD_MUTATION = graphql(
  gql`
    mutation resetPassword($token: String!, $password: String!) {
      resetPassword(token: $token, password: $password) {
        message
        code
      }
    }
  `,
  { name: "resetPassword" }
);

export const ResetPassword = compose(
  RESET_PASSWORD_MUTATION,

  withRouter,
  withMessage,

  withHandlers({
    reset: ({ resetPassword, showMessage, history }) => async (
      token,
      password
    ) => {
      try {
        const { data } = await resetPassword({
          variables: { token, password }
        });
        const { code } = data.resetPassword;

        if (code === 103) {
          showMessage("Você não tem permisão para alterar a senha", "error");
        }
        if (code === 200) {
          showMessage("Senha alterada com sucesso!", "success");
        }

        history.push(RouterPaths.SIGN_IN);
      } catch (e) {
        showMessage(e, "error");
      }
    }
  })
)(ResetPasswordComponent);
