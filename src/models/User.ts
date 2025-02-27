import { Schema, model, Types, Document } from "mongoose";

// **Define IUser Interface**
export interface IUser extends Document {
  _id: Types.ObjectId;  // ✅ Explicitly declare _id as an ObjectId
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
}

// **Define the Schema**
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Email validation
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought", // Reference to Thought model
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Self-reference to User model
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// **Virtual Property: friendCount**
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// **Create and export the model**
const User = model<IUser>("User", UserSchema);
export default User;