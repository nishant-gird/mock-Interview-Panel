import { Interviewer, Session, Report, HeatmapDay } from './types';

export const INTERVIEWERS: Interviewer[] = [
  { id: '1', name: 'Sarah Chen', role: 'Senior Engineer', specialty: 'System Design' },
  { id: '2', name: 'James Wilson', role: 'Hiring Manager', specialty: 'Behavioral' },
  { id: '3', name: 'Priya Sharma', role: 'Tech Lead', specialty: 'Problem Solving' },
  { id: '4', name: 'Marcus Johnson', role: 'HR Manager', specialty: 'Communication' },
  { id: '5', name: 'Lisa Rodriguez', role: 'Principal Eng', specialty: 'Technical Depth' },
];

export const QUESTIONS_BY_ROLE: Record<string, string[]> = {
  frontend: [
    'Design a responsive navbar component',
    'Explain React hooks and their lifecycle',
    'How would you optimize bundle size?',
    'Describe CSS Grid vs Flexbox',
    'Implement a custom hook for API calls',
    'What is virtual scrolling and when to use it?',
    'Explain server-side rendering benefits',
    'How do you handle state management at scale?',
  ],
  backend: [
    'Design a distributed caching system',
    'Explain microservices architecture',
    'How do you handle database transactions?',
    'Design an API rate limiter',
    'Explain database indexing strategies',
    'How do you handle system load and scaling?',
    'Design a message queue system',
    'Explain ACID properties with examples',
  ],
  fullstack: [
    'Design a real-time notification system',
    'Explain the full request lifecycle',
    'How do you secure API endpoints?',
    'Design a file upload system',
    'Explain database schema design patterns',
    'How do you optimize frontend and backend together?',
    'Design a search functionality',
    'Explain deployment strategies',
  ],
};

export const SAMPLE_SESSIONS: Session[] = [
  {
    id: 's1',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    role: 'Frontend',
    panel: ['1', '2'],
    difficulty: 'medium',
    score: 78,
    status: 'completed',
  },
  {
    id: 's2',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    role: 'Backend',
    panel: ['3', '4'],
    difficulty: 'hard',
    score: 82,
    status: 'completed',
  },
  {
    id: 's3',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    role: 'Full Stack',
    panel: ['1', '5'],
    difficulty: 'medium',
    score: 71,
    status: 'completed',
  },
  {
    id: 's4',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    role: 'Frontend',
    panel: ['2', '3'],
    difficulty: 'easy',
    score: null,
    status: 'scheduled',
  },
  {
    id: 's5',
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    role: 'Backend',
    panel: ['4', '5'],
    difficulty: 'medium',
    score: 65,
    status: 'completed',
  },
  {
    id: 's6',
    date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    role: 'Frontend',
    panel: ['1', '4'],
    difficulty: 'hard',
    score: 85,
    status: 'completed',
  },
  {
    id: 's7',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    role: 'Full Stack',
    panel: ['3', '5'],
    difficulty: 'medium',
    score: 72,
    status: 'completed',
  },
  {
    id: 's8',
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    role: 'Backend',
    panel: ['2', '1'],
    difficulty: 'medium',
    score: 68,
    status: 'completed',
  },
];

export const SAMPLE_REPORT: Report = {
  id: 'r1',
  sessionId: 's1',
  overall: 78,
  verdict: 'Hire',
  skills: {
    communication: 75,
    problemSolving: 80,
    technical: 82,
    systemDesign: 70,
    behavioral: 77,
  },
  questions: [
    {
      q: 'Design a responsive navbar component',
      answer: 'I would use CSS Flexbox with media queries for responsiveness...',
      feedback: 'Good understanding of flexbox. Consider CSS Grid for more complex layouts.',
      modelAnswer: 'Use CSS Flexbox or Grid with mobile-first approach and hamburger menu...',
      score: 8,
    },
    {
      q: 'Explain React hooks and their lifecycle',
      answer: 'Hooks are functions that let you use state and other React features...',
      feedback: 'Accurate explanation. Good knowledge of useEffect dependencies.',
      modelAnswer: 'Hooks enable functional components to have state and side effects...',
      score: 9,
    },
  ],
};

export function generateHeatmapData(): HeatmapDay[] {
  const data: HeatmapDay[] = [];
  const today = new Date();

  for (let i = 83; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5),
    });
  }

  return data;
}
