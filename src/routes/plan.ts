import { Router } from "express";
import { runTravelPlanner } from "../utils/travelPlanner";
import { generateICS } from "../utils/icsGenerator";

const router = Router();

router.post("/", async (req, res) => {
  const { destination, numDays, preferences, budget, startDate } = req.body;

  console.log("Incoming request:", { destination, numDays, preferences, budget, startDate });

  if (!destination) return res.status(400).json({ error: "Missing destination" });
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: "OpenAI API key not set" });

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
    console.error("Error in /api/plan:", err);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

export default router;