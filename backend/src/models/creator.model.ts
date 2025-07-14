// src/db/models/Creator.ts

import mongoose, { Types } from "mongoose";

const creatorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
    category: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Creator = mongoose.model("Creator", creatorSchema);

export interface ICreator {
  _id: Types.ObjectId;
  name: string;
  userId: Types.ObjectId;
  category: string;
  bio?: string;
  image?: string;
}

export default Creator;
