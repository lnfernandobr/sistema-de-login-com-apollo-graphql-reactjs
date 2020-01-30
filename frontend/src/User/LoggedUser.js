import { graphql } from "@apollo/react-hoc";
import { gql } from "apollo-boost";
import React, { createContext, useContext } from "react";
import { compose } from "recompose";

const LoggedUserContext = createContext();

const GET_USER = graphql(
  gql`
    query {
      getUser {
        _id
        nick
        email
      }
    }
  `,
  { name: "userData" }
);

const LOGOUT_USER = graphql(
  gql`
    mutation logout($token: String!) {
      logout(token: $token)
    }
  `,
  { name: "logout" }
);

export const LoggedUserComponent = ({
  children,
  userData: { getUser, loading },
  logout
}) => {
  return (
    <LoggedUserContext.Provider
      value={{ loggedUser: getUser, loading, logout }}
    >
      {children}
    </LoggedUserContext.Provider>
  );
};

export const LoggedUserProvider = compose(
  GET_USER,
  LOGOUT_USER
)(LoggedUserComponent);

export const useLoggedUser = () => useContext(LoggedUserContext);
