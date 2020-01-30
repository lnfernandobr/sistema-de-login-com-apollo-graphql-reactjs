import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { MessageProvider } from "../src/Snackbar/SnackbarProvider";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { LoggedUserProvider } from "./User/LoggedUser";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin",
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <MessageProvider>
        <LoggedUserProvider>
          <App />
        </LoggedUserProvider>
      </MessageProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
