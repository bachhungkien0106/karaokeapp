# KaraokeGenius 🎤✨

**Don't Just Sing. Perform.**

KaraokeGenius is an intelligent, AI-powered assistant designed to curate the perfect karaoke setlist. Whether you need a song that fits your vocal range or a playlist to match a specific party theme, KaraokeGenius uses Google's Gemini API to act as your personal DJ and vocal coach.

## 🌟 Features

### 1. Two Unique Modes
*   **Quick Filter Mode:** Build a setlist by selecting specific parameters:
    *   **Mood:** Energetic, Sentimental, Funny, etc.
    *   **Difficulty:** From "Easy (Safe bets)" to "Expert (Whitney/Mariah level)".
    *   **Vocal Range:** Soprano, Alto, Tenor, Baritone/Bass.
    *   **Era & Genre:** 70s Disco, 2000s Pop, K-Pop, and more.
    *   **Danceability:** Filter for ballads or high-energy dance tracks.
*   **DJ Agent Mode:**
    *   Describe your vision in plain English (e.g., *"A messy breakup party where we scream power ballads"* or *"80s Miami Vice birthday"*).
    *   Specify the crowd type (e.g., Co-workers, Close Friends, Strangers).
    *   The AI Agent creates a cohesive narrative and playlist to match the vibe.

### 2. Smart Recommendations
Every song recommendation includes detailed metadata to help you choose:
*   **Difficulty Rating:** Know before you sing.
*   **Pro Tip:** Specific advice on how to nail the song (e.g., *"Watch out for the key change in the bridge"*).
*   **Vibe Tag:** Quick emotional reference.
*   **Reason:** Why this song fits your specific request.

### 3. Performance & Storytelling
*   **Narrative Intros:** The AI generates a "Story" for every playlist, setting the scene for your performance.
*   **Smart Links:** 
    *   If it's a vocal track, it links to a **Karaoke Version** on YouTube.
    *   If it's a performance/dance track, it links to the **Official Video** or **Dance Practice**.

### 4. Favorites System
*   Save your go-to anthems to a persistent "Favorites" list stored locally in your browser.

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript
*   **Styling:** Tailwind CSS (Glassmorphism design system)
*   **AI Model:** Google Gemini 3.0 Flash Preview via `@google/genai` SDK
*   **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites
*   A Google AI Studio API Key.
*   A modern web browser.

### Environment Setup
The application requires the `API_KEY` environment variable to be set with your Google Gemini API key.

```typescript
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
```

### Usage
1.  **Launch the App:** You will see the Home screen with two options.
2.  **Select a Mode:**
    *   Click **Quick Filter** to dial in specific settings.
    *   Click **DJ Agent** to type in a creative prompt.
3.  **View Results:** Read the AI-generated story, browse the songs, and click the button to practice on YouTube.
4.  **Save Favorites:** Click the heart icon on any song card to save it for later.

## 📄 License

This project is open source.

---
*Powered by Google Gemini 3.0*