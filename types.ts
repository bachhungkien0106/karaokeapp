export interface UserPreferences {
  mood: string;
  genre: string;
  difficulty: string;
  era: string;
  occasion: string;
  nation: string;
  vocalRange: string;
  danceability: string;
}

export interface SongRecommendation {
  title: string;
  artist: string;
  reason: string;
  difficultyRating: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  singingTip: string;
  vibe: string;
  youtubeQuery: string;
  performanceType: 'Singing' | 'Dancing';
}

export interface RecommendationResult {
  songs: SongRecommendation[];
  story: string;
}

export type AppState = 'HOME' | 'FORM' | 'DJ_FORM' | 'LOADING' | 'RESULTS' | 'ERROR' | 'FAVORITES';