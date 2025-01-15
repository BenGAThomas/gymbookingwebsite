import mongoose from 'mongoose';

export const connectDatabase = async () => {
    try {
        // eslint-disable-next-line no-undef
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected to ${connection.connection.host}`)
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    }
}