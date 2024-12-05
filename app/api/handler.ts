import { User, UserSignUp, UserSignIn } from "@/utils/types";
import { API_URL } from "../../utils/config";
import { UserVerification } from '../../utils/types';

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

export const userHomePage = async (token: string) => {

  const response = await fetch(`${API_URL}/user`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok)
    throw new Error("Failed to fetch user data...");

  console.log(response.body);
  const userData = response.body as unknown as User;
  return userData;
}

export const userVerification = async (data: UserVerification) => {

  const response = await fetch(`${API_URL}/user/verification`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  if (!response.ok)
    throw new Error("Failed to verify user account...")

  return response.ok;
}