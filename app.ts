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
import fs from "fs";
import https from "https";
import { Server, Socket } from "socket.io";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const privateKey = fs.readFileSync("/app/selfsigned.key", "utf8");
const certificate = fs.readFileSync("/app/selfsigned.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,PUT,POST,DELETE,PATCH",
    credentials: true,
  })
);

const httpServer = https.createServer(app);
const httpsServer = https.createServer(credentials, app);

const io = new Server(httpsServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// Socket.io custom interface for extending socket with userId
interface CustomSocket extends Socket {
  userId?: string;
}

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Kullanıcıdan gelen role güncelleme isteği
  socket.on("updateRole", ({ userId, newRole }) => {
    console.log(`Role update received for user ${userId}: ${newRole}`);
    console.log(`Role update received for user: ${userId}, new role: ${newRole}`);

    // Tüm istemcilere güncellenen rol bilgisini ilet
    io.emit("roleUpdated", { userId, newRole });
    console.log(`roleUpdated event emitted for user: ${userId}, new role: ${newRole}`);
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
    // HTTP sunucusunu başlat
    httpServer.listen(PORT, () => {
      console.log(`HTTP server is running on port ${PORT}`);
    });

    // HTTPS sunucusunu başlat
    httpsServer.listen(443, () => {
      console.log("HTTPS server is running on port 443");
    });
  } catch (error) {
    console.error("Veritabanı bağlantısı başarısız oldu:", error);
    process.exit(1); // Uygulamayı sonlandır
  }
}

startServer();
