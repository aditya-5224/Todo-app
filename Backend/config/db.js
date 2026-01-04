import mongoose from "mongoose";
//create a function to create mongo connection uri from port host amd db name
  const createMongoUri = (host, port, dbName) => {
    return `mongodb://${host}:${port}/${dbName}`;
  };


export const connectDB = async () => {
  
  try {
    await mongoose.connect(createMongoUri(process?.env?.DB_HOST || 'localhost', process.env.DB_PORT || '27017', process.env.DB_NAME || 'todo-app'));
    console.log(`Connected to MongoDB: ${mongoose.connection.host}`);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);

  }
};

