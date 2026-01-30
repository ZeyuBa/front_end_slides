export interface SlideProps {
  isActive: boolean;
  direction: 'next' | 'prev';
}

export interface Framework {
  name: string;
  stars: string;
  usage: string;
  vibeRating: number;
  color: string;
}

export interface DemoState {
  gpuCount: number;
  duration: number;
  model: string;
  isCalculating: boolean;
  result: {
    totalPrice: number;
    avgPrice: number;
    riskLevel: string;
  } | null;
}

export type FrameworkType = 'gradio' | 'streamlit' | 'react' | 'nicegui' | 'django';
