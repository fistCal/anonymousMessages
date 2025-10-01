import mongoose, { ConnectOptions } from "mongoose";

type ConnectionObject = {
    isConnected?: number        //optional return value
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connected");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        console.log(db);

        connection.isConnected = db.connections[0].readyState

        console.log("DB connected!!");
        
    } catch (error) {
        console.log("DB connection failed", error);
        
        process.exit(1)
    }
}

export default dbConnect;