import mongoose, { Schema, model } from "mongoose";

export interface User extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  age: Number;
  profilePic: string;
  dateOfBirth: string;
  Gender: Gender;
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
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
  },
  { timestamps: true }
);

export default model<User>("Users", UserSchema);
