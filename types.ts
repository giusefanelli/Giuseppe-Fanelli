export interface UserData {
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  height: number;
  weight: number;
  equipment: 'gym' | 'homegym' | 'dumbbells_bands';
  trainingDays: number;
  goal: 'hypertrophy' | 'strength' | 'fat_loss';
  experience: 'beginner' | 'intermediate' | 'advanced';
  trainingType: 'monofrequenza' | 'multifrequenza';
  focusMuscleGroups: string[];
  recommendedSplit?: string;
  previousPlan?: {
    content: string; // base64 for image, raw text for txt
    type: 'image' | 'text';
    mimeType?: string; // e.g., 'image/jpeg'
  };
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  note?: string;
}

export interface DayPlan {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlanType {
  title: {
    mainTitle: string;
    subtitle: string;
  };
  description: string;
  notes: string[];
  plan: DayPlan[];
}
