import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	date_joined: {
		type: Date
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profile_picture: {
		type: String,
		default:
			"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
	},
	num_contacts: {
		type: Number,
		default: 0
	}
});

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);
