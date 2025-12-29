import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, RecommendationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    story: { 
      type: Type.STRING,
      description: "A short, immersive, 2-3 sentence narrative description setting the scene for this playlist vibe."
    },
    songs: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          artist: { type: Type.STRING },
          reason: { type: Type.STRING },
          difficultyRating: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard', 'Expert'] },
          singingTip: { type: Type.STRING },
          vibe: { type: Type.STRING },
          performanceType: { type: Type.STRING, enum: ['Singing', 'Dancing'] },
          youtubeQuery: { type: Type.STRING }
        },
        required: ['title', 'artist', 'reason', 'difficultyRating', 'singingTip', 'vibe', 'performanceType', 'youtubeQuery']
      }
    }
  },
  required: ['story', 'songs']
};

export const getKaraokeRecommendations = async (prefs: UserPreferences): Promise<RecommendationResult> => {
  try {
    const prompt = `
      Act as an expert Karaoke DJ and Voice Coach.
      I need a setlist based on:
      - Mood: ${prefs.mood}
      - Genre: ${prefs.genre}
      - Difficulty: ${prefs.difficulty}
      - Vocal Range: ${prefs.vocalRange}
      - Era: ${prefs.era}
      - Occasion: ${prefs.occasion}
      - Region: ${prefs.nation}
      - Danceability: ${prefs.danceability}

      1. Generate a "story" (string): A creative, immersive 2-3 sentence intro that sets the scene for this specific playlist. Make the user feel like the star.
      2. Generate 6 song recommendations.
      
      For each song:
      - Title & Artist
      - Reason (The "Why")
      - Difficulty Rating
      - Pro Tip
      - Vibe Tag
      - performanceType (Singing/Dancing)
      - youtubeQuery ("Title Artist Karaoke Version" or "Title Artist Dance Practice")
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No data returned from Gemini");

    return JSON.parse(jsonText) as RecommendationResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateDJPlaylist = async (vision: string, crowd: string): Promise<RecommendationResult> => {
  try {
    const prompt = `
      You are "DJ Gemini", a world-class party curator.
      VISION: "${vision}"
      CROWD: "${crowd}"

      1. Generate a "story" (string): A short, hype-building narrative intro. "Okay, picture this..." type of energy that describes the vibe of the room this playlist will create.
      2. Create a cohesive 6-song setlist that fits this specific narrative.

      For each song:
      - Title & Artist
      - Reason
      - Difficulty Rating
      - Singing Tip
      - Vibe Tag
      - performanceType (Singing/Dancing)
      - youtubeQuery
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No data returned from Gemini");

    return JSON.parse(jsonText) as RecommendationResult;
  } catch (error) {
    console.error("Gemini API DJ Error:", error);
    throw error;
  }
};