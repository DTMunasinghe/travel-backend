import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { runTravelPlanner } from "./utils/travelPlanner";
import { generateICS } from "./utils/icsGenerator";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // allow frontend

app.use(bodyParser.json());

app.post("/api/plan", async (req, res) => {
  const { destination, numDays, preferences, budget, startDate } = req.body;

  console.log("Incoming request:", { destination, numDays, preferences, budget, startDate });

  if (!destination) throw new Error("Missing destination");
  if (!process.env.OPENAI_API_KEY) throw new Error("OpenAI API key not set");

  try {
    const itinerary = await runTravelPlanner(
      destination,
      numDays,
      preferences,
      budget,
      process.env.OPENAI_API_KEY!,
      process.env.GOOGLE_MAPS_API_KEY!
    );

    const icsFile = generateICS(itinerary, startDate);

    res.json({ itinerary, icsFile: Buffer.from(icsFile).toString("base64") });
  } catch (err) {
    console.error("❌ Error in /api/plan:", err);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

app.listen(4000, () =>
  console.log("🚀 Backend running at http://localhost:4000")
);