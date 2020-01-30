import React, { Fragment } from "react";
import { Routes } from "./Routes/Routes";
import "./App.css";
import { HIDE_MESSAGE, useMessageState } from "./Snackbar/SnackbarProvider";
import Message from "./Snackbar/Message";

export const App = () => {
  const [{ open, text, variant }, dispatch] = useMessageState();

  return (
    <Fragment>
      <Routes />

      <Message
        open={open}
        text={text}
        variant={variant}
        hideMessage={() => dispatch({ type: HIDE_MESSAGE })}
      />
    </Fragment>
  );
};
