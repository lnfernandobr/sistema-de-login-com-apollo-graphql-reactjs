import React, { createContext, useContext, useReducer } from "react";

export const MessageContext = createContext();

const SHOW_MESSAGE = "showMessage";
const HIDE_MESSAGE = "hideMessage";
export { SHOW_MESSAGE, HIDE_MESSAGE };

export const MessageProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case SHOW_MESSAGE:
        return {
          ...state,
          open: true,
          text: action.text,
          variant: action.variant
        };
      case HIDE_MESSAGE:
        return {
          ...state,
          open: false,
          text: null,
          variant: "info"
        };
      default:
        return state;
    }
  };

  return (
    <MessageContext.Provider
      value={useReducer(reducer, { open: false, text: null, variant: "info" })}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageState = () => useContext(MessageContext);
