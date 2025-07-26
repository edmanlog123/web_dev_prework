// src/db/models/Creator.ts

import mongoose, { Types } from "mongoose";

const LinkSchema = new mongoose.Schema({
  type: { type: String, required: true },
  url: { type: String, required: true },
});

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
  links: { type: [LinkSchema], default: [] },
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

export interface Link {
  type: string;
  url: string;
}

export interface ICreator {
  _id: Types.ObjectId;
  name: string;
  userId: Types.ObjectId;
  links: Link[];
  bio?: string;
  image?: string;
}

export default Creator;
