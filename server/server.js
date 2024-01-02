// Import dependencies
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/index.js";
import { connectToDB } from "./config/database.js";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./config/.env" });

// Create an express app
const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Connect to database
connectToDB();

// Routes
app.use("/api", allRoutes);

// error handler
app.use((err, req, res, next) => {
  console.log({ err });
  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(status).json({ message, stack: err.stack });
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start server
const httpServer = createServer(app);
httpServer.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);

const io = new Server(httpServer, {
  cors: {
    origin: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket connection established");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("User disconnected");
    socket.leave(userData._id);
  });
});
