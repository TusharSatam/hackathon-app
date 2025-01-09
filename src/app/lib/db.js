import mongoose from 'mongoose';

const connectMongo = async () => {
    const uri = process.env.MONGODB_URI;
    console.log(uri);
    
    if (!uri) {
        throw new Error("Missing MONGODB_URI. Please check your environment variables.");
    }

    if (mongoose.connection.readyState === 1) return; // Already connected
    
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
};

export default connectMongo;
