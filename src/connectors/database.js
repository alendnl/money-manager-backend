import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_DB_URI);
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(`Error: ${err.message}`);
		process.exit(1); // Exit process with failure
	}
};

export default connectDB;
