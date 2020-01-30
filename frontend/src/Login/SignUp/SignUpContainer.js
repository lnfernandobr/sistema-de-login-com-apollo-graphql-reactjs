import { compose, withHandlers } from "recompose";
import { withMessage } from "../../Snackbar/withMessage";
import { SignUpComponent } from "./signUp";

import { graphql } from "@apollo/react-hoc";
import { gql } from "apollo-boost";
import { RouterPaths } from "../../Routes/RouterPaths";
import { withRouter } from "react-router-dom";

const CREATE_USER_MUTATION = graphql(
  gql`
    mutation createUser($user: InputUser) {
      createUser(user: $user) {
        _id
        status {
          message
          code
        }
      }
    }
  `,
  { name: "createUser" }
);

export const SignUp = compose(
  CREATE_USER_MUTATION,

  withMessage,
  withRouter,

  withHandlers({
    newUser: ({ showMessage, createUser, history }) => async (
      stateLogin,
      dispatch
    ) => {
      const email = stateLogin.fieldEmail.value;
      const password = stateLogin.fieldPassword.value;
      const nick = stateLogin.fieldName.value;

      dispatch({
        value: password,
        type: "fieldPassword"
      });
      dispatch({
        value: nick,
        type: "fieldName"
      });
      dispatch({
        value: email,
        type: "fieldEmail"
      });

      if (
        stateLogin.fieldPassword.error ||
        stateLogin.fieldEmail.error ||
        stateLogin.fieldName.error
      ) {
        showMessage("Preencha os campos em vermelho.", "error");
        return;
      }

      try {
        const { data } = await createUser({
          variables: { user: { nick, password, email } }
        });

        const { message, code } = data.createUser.status;

        if (code === 102) {
          showMessage(message, "warning");
          return;
        }

        if (code === 200) {
          showMessage("Usuario criado com sucesso, faça o login :)");
          history.push(RouterPaths.SIGN_IN);
        }
      } catch (e) {
        showMessage(e, "error");
      }

      return {
        name: "fer"
      };
    }
  })
)(SignUpComponent);
