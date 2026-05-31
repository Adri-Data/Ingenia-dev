
export interface Message {
  id?: string;
  role: 'user' | 'model';
  content: string;
  feedback?: {
    isLike: boolean;
    comment?: string;
  };
  createdAt?: string;
}

export interface Project {
  id: string;
  name: string;
  objective: string;
  createdAt: string;
  messages?: Message[];
}

export interface UserMe {
  id: string;
  captcha_passed: boolean;
  projects_count: number;
  role?: string;
}
