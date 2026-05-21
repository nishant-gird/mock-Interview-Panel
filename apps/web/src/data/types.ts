export type Difficulty = 'easy' | 'medium' | 'hard';

export type Interviewer = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar?: string;
};

export type Session = {
  id: string;
  date: string;
  role: string;
  panel: string[];
  difficulty: Difficulty;
  score: number | null;
  status: 'scheduled' | 'completed' | 'cancelled';
};

export type SkillScores = {
  communication: number;
  problemSolving: number;
  technical: number;
  systemDesign: number;
  behavioral: number;
};

export type Report = {
  id: string;
  sessionId: string;
  overall: number;
  verdict: string;
  skills: SkillScores;
  questions: {
    q: string;
    answer: string;
    feedback: string;
    modelAnswer: string;
    score: number;
  }[];
};

export type HeatmapDay = {
  date: string;
  count: number;
};
