import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined');
        }

        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "share_prompt",
        });

        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}
