import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            connectTimeoutMS: 60000, // 60 seconds
            socketTimeoutMS: 60000,
        });

        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.log("Error connecting to MongoDB:", error, "*End of error message*");
    }
}
