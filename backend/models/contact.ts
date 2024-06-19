import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const contactSchema = new Schema({
	user_id: {
		type: mongoose.Types.ObjectId,
		ref: "User"
	},
	contacts: {
		type: [String],
		default: []
	},
	num_contacts: {
		type: Number,
		default: 0
	}
});

type Contact = InferSchemaType<typeof contactSchema>;
export default model<Contact>("Contact", contactSchema);
