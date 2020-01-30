import { makeStyles } from "@material-ui/core";
import React from "react";

export const useStyles = makeStyles(theme => {
  const objBtn = {
    backgroundColor: "#1ba0ff",
    marginTop: 20,
    fontVariant: "unicase",
    fontFamily: "monospace",
    fontSize: 20,
    padding: 0,
    borderRadius: "30px"
  };

  return {
    textField: {
      marginBottom: 15
    },

    forgotPasswordIcon: {
      padding: "10px",
      color: "rgba(1,1,1,0.7)",
      cursor: "pointer",
      "&:hover": {
        color: "rgba(1,1,1,0.9)"
      }
    },
    labelForgotPassword: {
      color: "rgba(1,1,1,0.7)",
      "&:hover": {
        color: "rgba(1,1,1,0.9)"
      }
    },

    textFieldDescription: {
      fontFamily: "monoscape"
    },

    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      height: "100vh"
    },

    container: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      alignItems: "baseline",
      width: "100%"
    },
    styleCard: {
      backgroundColor: "white",
      padding: 30,
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minWidth: 300,
      maxWidth: 300,
      marginLeft: "5%",
      marginRight: "5%",
      "@media(max-width: 500px)": {
        minWidth: 0
        // maxWidth: 0
      }
    },

    img: {
      width: 75,
      marginBottom: 20
    },

    btn: {
      ...objBtn
    },

    btnMakeLogin: {
      ...objBtn,
      backgroundColor: "#ff1f51",
      color: "white"
    }
  };
});
