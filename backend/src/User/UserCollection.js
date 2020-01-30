import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nick: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

const user = mongoose.model("User", UserSchema);

export const User = Object.assign(user, {
  async saveUser(user) {
    const newUser = await new User(user);

    return new Promise((resolve, reject) => {
      newUser.save((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  }
});
