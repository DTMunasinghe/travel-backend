import OpenAI from "openai";

export async function runTravelPlanner(
    destination: string,
    numOfDays: number,
    preferences: string,
    budget: number,
    openaiKey: string,
    googleMapsKey: string
) {
    const client = new OpenAI({ apiKey: openaiKey });

    const prompt = `
        Generate a detailed ${numOfDays}-day travel plan for ${destination}.
        Budget: $${budget}. Preferences: ${preferences}.
        Include addresses, times, activities, and cost estimates.`;
    
    const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }]
    });

    return response.choices[0].message?.content || "No plan generated.";
}