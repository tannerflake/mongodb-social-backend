import { Schema, model, Types, Document } from "mongoose";

// 1️⃣ Reaction Interface (Subdocument)
interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date; // Stored as Date in MongoDB
}

// 2️⃣ Thought Interface (Main Document)
export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date; // Stored as Date in MongoDB
  username: string;
  reactions: IReaction[]; // Array of subdocuments
}

// 3️⃣ Reaction Schema (Subdocument)
const ReactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    // Define as a standard Date field
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { getters: true }, // Apply getters
    id: false,
  }
);

// Attach a getter *after* schema creation
ReactionSchema.path("createdAt").get(function (value: Date) {
  return value.toISOString();
});

// 4️⃣ Thought Schema (Main)
const ThoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // Also define as standard Date
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    // Embed Reaction subdocuments
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// Attach a getter for Thought's createdAt
ThoughtSchema.path("createdAt").get(function (value: Date) {
  return value.toISOString();
});

// 5️⃣ Virtual Property: reactionCount
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// 6️⃣ Create and export the Thought model
const Thought = model<IThought>("Thought", ThoughtSchema);
export default Thought;