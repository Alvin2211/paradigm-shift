import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const connInstance = await mongoose.connect (process.env.MONGODB_URI,{
            dbName:DB_NAME
        });
        console.log(`mongodb connected: ${connInstance.connection.host}`)
    }
    catch (error) {
        console.log("Error connecting to Mongodb:",error);
        process.exit(1);
    }
}