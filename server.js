import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";  // Import cors
import path from "path";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";  // Sử dụng 0.0.0.0 để lắng nghe tất cả

const __dirname = path.resolve();

// Cấu hình CORS cho phép truy cập từ frontend
app.use(cors({
  origin: process.env.CLIENT_URL, // Cho phép từ domain frontend của bạn
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  connectDB();
});
