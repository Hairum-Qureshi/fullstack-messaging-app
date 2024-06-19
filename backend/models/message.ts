import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const messageSchema = new Schema(
	{
		sender_userID: {
			type: mongoose.Types.ObjectId,
			ref: "User"
		},
		receiver_userID_s: {
			type: [mongoose.Types.ObjectId], // it's an array because there might be group chats with more than 2 people.
			ref: "User"
		},
		message: {
			type: String,
			trim: true,
			ref: "Conversation"
		},
		// latest_message: {
		// 	type: String
		// },
		message_read: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true
	}
);

type Message = InferSchemaType<typeof messageSchema>;
export default model<Message>("Message", messageSchema);
