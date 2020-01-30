import sgMail from "@sendgrid/mail";
import bcrypt from "bcryptjs";

import { User } from "./UserCollection";
import { TokensUserBlackList } from "./TokensBlackListCollection";
import { findUser, getUser, newToken } from "../Utils/UserMethods";
import { validInputs } from "../Utils/validator";
import {
  FORGET_PASSWORD_SHIPPING_EMAIL,
  FORGET_PASSWORD_SUBJECT,
  FORGET_PASSWORD_TEMPLATE
} from "./UserConstants";
import { RETURN_CODES } from "../returnCodes";

export const UserResolver = {
  Query: {
    getUser(_, args, { user }) {
      if (user) {
        return User.findOne({ _id: user.id });
      }

      return null;
    }
  },
  Mutation: {
    /// create user and return _id
    async createUser(_, { user }) {
      /// validates inputs to ensure data consistency when saving to DB

      const error = validInputs(user);
      console.log(error);
      if (error) {
        return {
          _id: null,
          status: {
            message: RETURN_CODES.inputError.message,
            code: RETURN_CODES.inputError.code
          }
        };
      }

      // check if the user is already registered in DB
      const isFind = await User.findOne({ email: user.email });
      if (isFind) {
        return {
          _id: null,
          status: {
            message: RETURN_CODES.alreadyRegisteredUser.message,
            code: RETURN_CODES.alreadyRegisteredUser.code
          }
        };
      }

      // save user in DB and return _id
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const { _id } = await User.saveUser({
        ...user,
        password: hashedPassword
      });
      console.log(_id);

      return {
        _id,
        status: {
          message: RETURN_CODES.success.message,
          code: RETURN_CODES.success.code
        }
      };
    },

    /// receive email and password, if the user is successfully authenticated returns
    /// it together with token
    async loginUser(_, { email, password }) {
      const error = validInputs({ email, password });
      console.log(email, password);

      if (error) {
        return {
          token: null,
          status: {
            message: RETURN_CODES.inputError.message,
            code: RETURN_CODES.inputError.code
          }
        };
      }

      /// find user and check password match, passwordMatch is boolean
      const { passwordMatch, user } = await findUser(email, password);

      if (!passwordMatch) {
        return {
          token: null,
          status: {
            message: RETURN_CODES.userNotFound.message,
            code: RETURN_CODES.userNotFound.code
          }
        };
      }

      /// generates a new login registration token
      const token = newToken(user, "1d");
      const ob = {
        token,
        status: {
          message: RETURN_CODES.success.message,
          code: RETURN_CODES.success.code
        }
      };
      console.log(ob);
      return ob;
    },

    // received email to locate user and path to redirect, the token is sent to the user's email
    async forgetPassword(_, { email, path }) {
      const error = validInputs({ email, path });
      if (error) {
        return {
          message: RETURN_CODES.inputError.message,
          code: RETURN_CODES.inputError.code
        };
      }

      const user = await User.findOne({ email });

      if (!user) {
        return {
          message: RETURN_CODES.userNotFound.message,
          code: RETURN_CODES.userNotFound.code
        };
      }

      const token = newToken(user, "1d");

      const r = await sgMail
        .send({
          to: email,
          from: FORGET_PASSWORD_SHIPPING_EMAIL,
          subject: FORGET_PASSWORD_SUBJECT,
          html: FORGET_PASSWORD_TEMPLATE(path, token)
        })
        .then(() => true)
        .catch(error => console.log(error.message, error.code));

      return (
        r && {
          message: RETURN_CODES.success.message,
          code: RETURN_CODES.success.code
        }
      );
    },

    // received token and password, if the user is successfully authenticated return a boolean
    async resetPassword(root, { token, password }) {
      const error = validInputs({ password });
      if (error) {
        return {
          message: RETURN_CODES.inputError.message,
          code: RETURN_CODES.inputError.code
        };
      }

      const user = getUser(token);

      if (!user) {
        return {
          message: RETURN_CODES.invalidToken.message,
          code: RETURN_CODES.invalidToken.code
        };
      }

      const isFind = await TokensUserBlackList.findOne({ token });

      if (isFind) {
        return {
          message: RETURN_CODES.invalidToken.message,
          code: RETURN_CODES.invalidToken.code
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const response = await User.updateOne(
        { _id: user.id },
        { password: hashedPassword }
      );

      const blackToken = await new TokensUserBlackList({ token });

      blackToken.save(err => {
        if (err) {
          console.error(err);
        }
      });

      return !!response.ok
        ? {
            code: RETURN_CODES.success.code,
            message: RETURN_CODES.success.message
          }
        : {
            code: RETURN_CODES.errorUpdatePassword.code,
            message: RETURN_CODES.errorUpdatePassword.message
          };
    },

    async logout(_, { token }, { user }) {
      console.log(user);
      const userToken = getUser(token);
      if (userToken) {
        const blackToken = await new TokensUserBlackList({ token });

        blackToken.save(err => {
          if (err) {
            console.error(err);
          }
        });
      }
    }
  }
};
