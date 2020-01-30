import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TokensUserBlackListSchema = new Schema({
  token: {
    type: String,
    required: true
  }
});

export const TokensUserBlackList = mongoose.model(
  "TokensUserBlackList",
  TokensUserBlackListSchema
);
