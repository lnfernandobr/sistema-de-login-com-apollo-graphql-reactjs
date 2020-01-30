import { User } from "../User/UserCollection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function findUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      passwordMatch: false,
      user: null
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  return {
    passwordMatch,
    user
  };
}

export const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.KEY_SERVER);
    }
    return null;
  } catch (err) {
    return null;
  }
};

export function newToken(user, time) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      iss: "localhost:3000"
    },
    process.env.KEY_SERVER,
    {
      expiresIn: time
    }
  );
}
