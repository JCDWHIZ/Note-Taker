import mongoose, { Schema, model } from "mongoose";

interface Post extends mongoose.Document {
  likes: number;
  dislikes: number;
  caption: String;
  media: String[];
  comments: [Schema.Types.ObjectId];
  userId: Schema.Types.ObjectId;
}

const PostSchema: Schema<Post> = new Schema({
  caption: {
    type: String,
  },
  likes: Number,
  dislikes: Number,
  media: {
    type: [String],
    default: [],
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments",
      default: null!,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default model<Post>("Posts", PostSchema);
