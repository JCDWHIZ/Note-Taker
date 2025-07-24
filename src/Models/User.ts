import mongoose, { Schema, model } from "mongoose";
import CryptoJS from "crypto-js";

export interface User extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  age: Number;
  profilePic: string;
  dateOfBirth: string;
  Gender: Gender;
  // role varchar1
  bio: string;
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  is_verified: boolean;
  posts: Schema.Types.ObjectId[];
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  ATTACK_HELICOPTER = "ATTACK_HELICOPTER",
}

const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: Number,
    profilePic: {
      type: String,
      default: "https://example.com/default-profile-pic.png",
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },
    bio: String,
    is_verified: {
      type: Boolean,
      default: false,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Posts",
        default: null,
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
        default: null,
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
        default: null,
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this as User;
  if (user.isModified("password") && process.env.CRYPTO_SECRET) {
    const encryptedPassword = CryptoJS.AES.encrypt(
      user.password,
      process.env.CRYPTO_SECRET
    ).toString();
    user.password = encryptedPassword;
  }
  next();
});

export default model<User>("Users", UserSchema);
