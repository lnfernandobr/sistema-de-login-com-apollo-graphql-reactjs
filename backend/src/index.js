import { ApolloServer } from "apollo-server";
import sgMail from "@sendgrid/mail";
import "dotenv/config";
import "./configureDb";
import { SEND_GRID_API_KEY } from "./User/UserConstants";
import { UserSchema } from "./User/UserSchema";
import { UserResolver } from "./User/UserResolver";
import { getUser } from "./Utils/UserMethods";

sgMail.setApiKey(SEND_GRID_API_KEY);

const server = new ApolloServer({
  typeDefs: UserSchema,
  resolvers: UserResolver,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || "";

    const token = tokenWithBearer.split(" ")[1];
    const user = getUser(token);

    return {
      user
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
