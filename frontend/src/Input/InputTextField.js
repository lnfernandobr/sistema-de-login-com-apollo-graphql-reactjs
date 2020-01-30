import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  field: {
    margin: 10
  }
});

export const MyTextField = ({
  propsInput = { error: null },
  dispatch = () => {},
  type,
  value,
  label,
  myClasses = false,
  ...others
}) => {
  const classes = useStyles();

  return (
    <div style={{ width: "100%" }}>
      <TextField
        {...propsInput}
        {...others}
        fullWidth
        value={value}
        label={label}
        variant={"outlined"}
        error={Boolean(propsInput.error)}
        className={classes.field}
        onChange={({ target: { value } }) => {
          dispatch({
            value,
            type
          });
        }}
      />

      <p
        style={
          propsInput.error
            ? { color: "red", margin: 10, marginTop: -10 }
            : { opacity: 0 }
        }
      >
        {propsInput.error ? propsInput.error : "Campo não pode ser vazio!\n"}
      </p>
    </div>
  );
};
