export interface Question {
    id: string;
    text: string;
    type: 'text' | 'multiple';
    options?: string[];
  }