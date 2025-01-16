import "reflect-metadata";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRouter from "./src/Api/Concrete/Routers/UserRouter";
import authRouter from "./src/Api/Concrete/Routers/AuthRouter";
import productRouter from "./src/Api/Concrete/Routers/ProductRouter";
import materialRouter from "./src/Api/Concrete/Routers/MaterialRouter";
import supplierRouter from "./src/Api/Concrete/Routers/SupplierRouter";
import DbConfig from "./src/DataAccess/Concrete/Mongoose/Config/DbConfig";
import customerOrdersRouter from "./src/Api/Concrete/Routers/CustomerOrdersRouter";
import supplierOrdersRouter from "./src/Api/Concrete/Routers/SupplierOrdersRouter";
import customerRouter from "./src/Api/Concrete/Routers/CustomerRouter";
import mrpRouter from "./src/Api/Concrete/Routers/MrpRouter";
import warehouseRouter from "./src/Api/Concrete/Routers/WarehouseRouter";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE,PATCH",
    credentials: true,
  })
);


const server = http.createServer(app);
const io = new Server(server)


// WebSocket bağlantısı
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Kullanıcı rolü güncellenirse, ilgili event'i yay
  socket.on("updateRole", (data) => {
    console.log("Rol güncelleme isteği alındı:", data);
    const { userId, newRole } = data;
    io.emit("roleUpdated", { userId, newRole });
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});










// routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/materials", materialRouter);
app.use("/api/suppliers", supplierRouter);
app.use("/api/orders/customer-orders", customerOrdersRouter);
app.use("/api/orders/supplier-orders", supplierOrdersRouter);
app.use("/api/customers", customerRouter);
app.use("/api/mrp", mrpRouter);
app.use("/api/warehouses", warehouseRouter);

async function startServer() {
  try {
    await DbConfig.ConnectDb();
    app.listen(PORT, () => {
      console.log(`Sunucu ${PORT} portunda çalışıyor.`);
    });
  } catch (error) {
    console.error("Veritabanı bağlantısı başarısız oldu:", error);
    process.exit(1); // Uygulamayı sonlandır
  }
}

startServer();

// app.listen(PORT, () => {
//   DbConfig.ConnectDb();
//   console.log(`Server is running on port ${PORT}`);
// });
