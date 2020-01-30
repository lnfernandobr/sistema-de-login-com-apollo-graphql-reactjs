import React, { useReducer } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { MyInput } from "../../Input/Input";
import {
  fieldEmail,
  fieldName,
  fieldPassword
} from "../../Validator/typeFields";
import { reducer } from "../../Validator/reducerFields";
import { RouterPaths } from "../../Routes/RouterPaths";
import { Link } from "react-router-dom";
import { useStyles } from "../Styles";

const initialState = {
  fieldPassword,
  fieldEmail,
  fieldName
};

export const SignUpComponent = ({ newUser }) => {
  const classes = useStyles();
  const [stateLogin, dispatch] = useReducer(reducer, initialState);

  const { value: password = "", ...propsPassword } = stateLogin.fieldPassword;
  const { value: email = "", ...propsEmail } = stateLogin.fieldEmail;
  const { value: name = "", ...propsName } = stateLogin.fieldName;

  const createUser = e => {
    e.preventDefault();
    newUser(stateLogin, dispatch);
  };

  console.log(propsEmail);
  return (
    <div className={classes.root}>
      <Card className={classes.styleCard}>
        <img
          className={classes.img}
          src="login-images/sign-up.svg"
          alt="Novo usuario"
        />

        <div className={classes.container}>
          <form onSubmit={createUser}>
            <MyInput
              title="*Nome"
              type="fieldName"
              dispatch={dispatch}
              value={name}
              propsInput={propsName}
            />
            <MyInput
              title="*Email"
              type="fieldEmail"
              value={email}
              dispatch={dispatch}
              propsInput={propsEmail}
            />
            <MyInput
              title="*Senha"
              type="fieldPassword"
              value={password}
              dispatch={dispatch}
              propsInput={propsPassword}
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                className={classes.btn}
                type="submit"
              >
                CADASTRAR
              </Button>
            </div>
            <Link
              className={classes.btnMakeLogin}
              to={RouterPaths.SIGN_IN}
              component={Button}
              fullWidth={true}
              color="primary"
              variant="contained"
            >
              <i>Fazer login!</i>
            </Link>
          </form>
        </div>
      </Card>
    </div>
  );
};
