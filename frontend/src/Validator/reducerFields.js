import { validator } from "./validator";

export const reducer = (state, action) => {
  const { type, value } = action;
  const error = validator(value, type);

  return {
    ...state,
    ...Object.assign(
      {},
      {
        [type]: {
          ...state[type],
          value,
          error
        }
      }
    )
  };
};
