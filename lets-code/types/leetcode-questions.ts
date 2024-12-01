export interface Example {
    input: string;
    output: string;
    explanation?: string;
  }
  
  export interface Constraint {
    text: string;
  }
  
  export interface LeetCodeQuestionProps {
    number: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    examples: Example[];
    constraints: Constraint[];
  }
  
  