/* This is a database connection function*/
import mongoose from 'mongoose'

let conn = null;

async function dbConnect() {
    /* check if we have connection to our database */
    if (conn !== null) {
        return
    }

    /* connecting to our database */
    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,

        // Attempting to keep the mongoose global by using the mongoose#connect
        // call, but only having 1 connection.
        // See: https://mongoosejs.com/docs/lambda.html
        poolSize: 1,

        // Buffering means mongoose will queue up operations if it gets
        // disconnected from MongoDB and send them when it reconnects.
        // With serverless, better to fail fast if not connected.
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0 // and MongoDB driver buffering
    });

    conn = { readyState: db.connections.readyState }
}

export default dbConnect
