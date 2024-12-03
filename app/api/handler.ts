import { API_URL } from "../../utils/config";

interface UserSignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface UserSignIn {
  email: string;
  password: string;
}

export const userSignUp = async (user: UserSignUp) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  if (!response.ok)
    throw new Error('User sign up failed...')

  return response.json();
}

export const userSignIn = async (userCredentials: UserSignIn) => {
  const response = await fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredentials),
  })

  if (!response.ok)
    throw new Error('User sign in failed...')

  return response.json();
}