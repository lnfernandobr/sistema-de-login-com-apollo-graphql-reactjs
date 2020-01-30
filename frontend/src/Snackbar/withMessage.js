import React from "react";
import {
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  useMessageState
} from "./SnackbarProvider";

export const withMessage = Component => props => {
  const [{}, dispatch] = useMessageState();

  console.log("im here");

  function showMessage(text, variant) {
    dispatch({
      type: SHOW_MESSAGE,
      text,
      variant
    });
  }

  function hideMessage() {
    dispatch({ type: HIDE_MESSAGE });
  }

  return (
    <Component {...props} showMessage={showMessage} hideMessage={hideMessage} />
  );
};
