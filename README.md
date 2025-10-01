# 🗺️ Travel Planner Backend

This is an Express + TypeScript backend that generates multi-day travel itineraries using **OpenAI GPT-4o** and optionally integrates **Google Maps API** for location details. It also generates downloadable `.ics` calendar files for easy trip scheduling.

---

## ✨ Features
- 📍 Generate AI-powered travel plans (activities, times, costs, addresses).  
- 📅 Export itineraries as `.ics` calendar files.  
- 🔑 Uses **OpenAI API** + **Google Maps API**.  
- ⚡ Handles API rate limits with retries + mock fallback.  
- 🛡️ TypeScript + Express backend structure.  

---

## 🛠️ Tech Stack
- **Node.js + Express** (API server)  
- **TypeScript**  
- **OpenAI GPT-4o** (itinerary generation)  
- **Google Maps API** (addresses / geo info)  
- **ICS Generator** (calendar export)  

## Configure Environment Variables

Create a `.env` file in the root:

```env
OPENAI_API_KEY=your_openai_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
PORT=5000
