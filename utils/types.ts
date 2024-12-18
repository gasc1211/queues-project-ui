export interface UserSignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export interface UserVerification {
  email: string;
  verification_code: number;
}

export interface Post {
  post_id: number;
  content: string;
}