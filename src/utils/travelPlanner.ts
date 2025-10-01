import OpenAI from "openai";

async function safeCompletion(client: OpenAI, params: any, retries = 3) {
  let delay = 1000;
  for (let i = 0; i < retries; i++) {
    try {
      return await client.chat.completions.create(params);
    } catch (err: any) {
      if (err.status === 429) {
        console.warn(`Rate limit hit, retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // exponential backoff
        continue;
      }
      throw err;
    }
  }
  throw new Error("OpenAI API quota exhausted");
}

export async function runTravelPlanner(
    destination: string,
    numOfDays: number,
    preferences: string,
    budget: number,
    openaiKey: string,
    googleMapsKey: string
) {
    const client: OpenAI = new OpenAI({ apiKey: openaiKey });

    const prompt = `
        Generate a detailed ${numOfDays}-day travel plan for ${destination}.
        Budget: $${budget}. Preferences: ${preferences}.
        Include addresses, times, activities, and cost estimates.`;
    
    try {
    const response = await safeCompletion(client, {
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }]
    });

    return response.choices[0].message?.content || "No plan generated.";
  } catch (err) {
    console.error("Falling back to mock itinerary:", err);

    return `**Trip to ${destination}**
        Day 1: Arrival and local sightseeing
        Day 2: Cultural tour + food experience
        Day 3: Adventure/outdoor activity
        Day 4: Relaxation + shopping
        Day 5: Departure`;
  }
}