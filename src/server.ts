import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import planRouter from "./routes/plan";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // allow frontend

app.use(bodyParser.json());

// Routes
app.use("/api/plan", planRouter);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});