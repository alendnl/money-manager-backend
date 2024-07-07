import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: true,
			updatedAt: true,
		},
	}
);

const UserDetails = mongoose.model("userDetails", userSchema);
export default UserDetails;
