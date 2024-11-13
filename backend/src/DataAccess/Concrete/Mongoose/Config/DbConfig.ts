import mongoose from "mongoose";

export default class DbConfig {
  public static ConnectDb() {
    mongoose
      .connect(process.env.MONGO_URI || "", {
        dbName: process.env.DB_NAME,
      })
      .then(() => {
        console.log("Connected to database");
      })
      .catch((error) => {
        console.log("Error while connecting to database");
        console.log(error);
      });
  }
}
