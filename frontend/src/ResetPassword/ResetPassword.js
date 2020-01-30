import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { MyInput } from "../Input/Input";
import { fieldPassword } from "../Validator/typeFields";
import { reducer } from "../Validator/reducerFields";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  btn: {
    backgroundColor: "#6b906a",
    marginTop: 20,
    fontVariant: "unicase",
    fontFamily: "monospace",
    fontSize: 20,
    padding: 0,
    borderRadius: "30px"
  },
  card: {
    padding: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  img: {
    width: 75,
    marginBottom: 20
  }
});

const initialState = {
  fieldPassword
};

export const ResetPasswordComponent = ({ reset, location }) => {
  const classes = useStyles();
  const [stateLogin, dispatch] = useReducer(reducer, initialState);
  const { value: password = "", ...propsPassword } = stateLogin.fieldPassword;

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("tk");
  console.log(token);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <img
          src="login-images/reset.svg"
          alt="Resetar senha"
          className={classes.img}
        />
        <form
          onSubmit={e => {
            e.preventDefault();
            reset(token, password);
          }}
        >
          <MyInput
            title="*Nova senha"
            dispatch={dispatch}
            propsInput={propsPassword}
            type="fieldPassword"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth={true}
            className={classes.btn}
            type="submit"
          >
            Redefinir
          </Button>
        </form>
      </Card>
    </div>
  );
};
