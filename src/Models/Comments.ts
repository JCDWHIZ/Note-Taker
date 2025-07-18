import mongoose, { Schema, model } from "mongoose";

interface Comments extends mongoose.Document {
  caption: String;
  likes: number;
  dislikes: number;
  media: String[];
  userId: Schema.Types.ObjectId;
}

const CommentSchema: Schema<Comments> = new Schema({
  caption: {
    type: String,
  },
  likes: {
    type: Number,
  },
  dislikes: {
    type: Number,
  },
  media: {
    type: [String],
    default: [],
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
});

export default model<Comments>("Comments", CommentSchema);
/**
 * Bearer asdhjasdkahdkajdhka
 * ["Bearere", "skjfhsjdfksdjfhksdf"]
 *
 */
