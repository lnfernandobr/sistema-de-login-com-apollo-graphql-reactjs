import React from "react";
import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles({
  field: {
    marginBottom: 10
  }
});

export const MyInput = ({
  propsInput = { error: null },
  dispatch = () => {},
  type,
  title,
  myClasses = false,
  ...others
}) => {
  const c = useStyles();

  console.log(myClasses);

  const classes = myClasses ? myClasses : c;


  return (
    <FormControl fullWidth={true}>
      <InputLabel className={classes.textFieldDescription}>{title}</InputLabel>
      <Input

        {...propsInput}
        {...others}
        error={Boolean(propsInput.error)}
        className={classes.field}
        onChange={({ target: { value } }) => {
          dispatch({
            value,
            type
          });
        }}
      />
      <p style={propsInput.error ? { color: "red" } : { opacity: 0 }}>
        {propsInput.error ? propsInput.error : "Campo não pode ser vazio!\n"}
      </p>
    </FormControl>
  );
};
