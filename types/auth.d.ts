export type UserRole = 'moderator' | 'productOwner';

export interface User {
  id: number;
  name: string;
  role: UserRole;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}



