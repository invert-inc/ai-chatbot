// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'o1-preview',
    label: 'o1 preview',
    apiIdentifier: 'o1-preview',
    description: 'For complex reasoning tasks',
  },
  {
    id: 'gpt-4o',
    label: 'gpt-4o',
    apiIdentifier: 'gpt-4o',
    description: 'For general multi-step tasks',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'gpt-4o';
