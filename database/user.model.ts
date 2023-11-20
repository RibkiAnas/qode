import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	username?: string;
	email: string;
	bio?: string;
	picture: string;
	location?: string;
	portfolioWebsite?: string;
	reputation?: number;
	saved?: Schema.Types.ObjectId[];
	joinedAt: Date;
}

const UserSchema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: false, unique: true },
	email: { type: String, required: true, unique: true },
	bio: { type: String },
	picture: { type: String, required: true },
	location: { type: String },
	portfolioWebsite: { type: String },
	reputation: { type: Number, default: 0 },
	saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
	joinedAt: { type: Date, default: Date.now },
});
const User = models.User || model("User", UserSchema);

export default User;
