import React, { useReducer, useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { MyInput } from "../../Input/Input";
import { fieldEmail, fieldPassword } from "../../Validator/typeFields";
import { reducer } from "../../Validator/reducerFields";
import { RouterPaths } from "../../Routes/RouterPaths";
import { Link } from "react-router-dom";
import { useStyles } from "../Styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import BackupIcon from "@material-ui/icons/Backup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const initialState = {
  fieldPassword,
  fieldEmail
};

export const SignInComponent = ({ login, recoveryPassword }) => {
  const classes = useStyles();
  const [stateLogin, dispatch] = useReducer(reducer, initialState);

  const [open, setOpen] = useState(false);

  const { value: password = "", ...propsPassword } = stateLogin.fieldPassword;
  const { value: email = "", ...propsEmail } = stateLogin.fieldEmail;

  const userLogin = e => {
    e.preventDefault();
    login(password, email, dispatch, propsEmail, propsPassword);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.styleCard}>
        <img
          className={classes.img}
          src="login-images/login.svg"
          alt="Login do usuario"
        />

        <div className={classes.container}>
          <form onSubmit={userLogin}>
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

            <FormControlLabel
              onClick={() => setOpen(prevState => !prevState)}
              control={<BackupIcon className={classes.forgotPasswordIcon} />}
              className={classes.labelForgotPassword}
              label="Esqueci minha senha"
            />

            <div>
              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                className={classes.btn}
                type="submit"
              >
                Login
              </Button>
            </div>
            <Link
              className={classes.btnMakeLogin}
              to={RouterPaths.SIGN_UP}
              component={Button}
              fullWidth={true}
              color="primary"
              variant="contained"
            >
              <i>Fazer Cadastro!</i>
            </Link>
          </form>
        </div>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(prevState => !prevState)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Recuperação de senha</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para que possamos recuperar sua senha, por gentileza nos enforme o
            e-mail cadastrado em nosso site, enviaremos para você um email de
            redefinição de senha.
          </DialogContentText>
          <TextField
            autoFocus
            helperText={propsEmail.error}
            value={email}
            onChange={({ target: { value } }) => {
              dispatch({
                value,
                type: "fieldEmail"
              });
            }}
            margin="dense"
            id="name"
            label="Endereço de Email"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary">Cancelar</Button>
          <Button
            disabled={propsEmail.error}
            color="primary"
            onClick={() => {
              recoveryPassword(email);
              setOpen(false);
            }}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
