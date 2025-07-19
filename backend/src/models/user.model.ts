import { Document, Schema, model, Types } from "mongoose";

export interface IUser extends Document {
	username: string;
	name: string;
	password: string;
	profilePicture?: string;
	gender: "male" | "female";
	savedCreators?: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
			default: "",
		},
		gender: {
			type: String,
			enum: ["male", "female"],
			required: true,
		},
		savedCreators: [{ type: Schema.Types.ObjectId, ref: "Creator" }],
	},
	{ timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;