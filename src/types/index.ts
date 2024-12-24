export interface Job {
    id: string;
    status: 'pending' | 'completed';
    createdAt: string;
    imageUrl: string | null;
  }
  