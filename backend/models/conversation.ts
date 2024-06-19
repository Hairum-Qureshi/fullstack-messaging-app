import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const conversationSchema = new Schema({
	conversationID: {
		type: String,
		unique: true
	},
	participants: {
		type: [mongoose.Types.ObjectId]
	},
	groupChat_name: {
		type: String,
		trim: true
	},
	num_participants: {
		type: Number,
		default: 2
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	admin: {
		type: mongoose.Types.ObjectId,
		ref: "User"
	}
	// isKicked: {
	// 	type: Boolean,
	// 	default: false
	// }
});

type Conversation = InferSchemaType<typeof conversationSchema>;
export default model<Conversation>("Conversation", conversationSchema);
