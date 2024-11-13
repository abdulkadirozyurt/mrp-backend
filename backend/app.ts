import express from "express";
import dotenv from "dotenv";
import productRouter from "./src/Api/Concrete/Routers/ProductRouter";
import DbConfig from "./src/DataAccess/Concrete/Mongoose/Config/DbConfig";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());


// routes
app.use("/api/products",productRouter);


app.listen(PORT, () => {
  DbConfig.ConnectDb();
  console.log(`Server is running on port ${PORT}`);
});
