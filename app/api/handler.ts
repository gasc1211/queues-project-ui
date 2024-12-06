import { User, UserSignUp, UserSignIn, Post } from "@/utils/types";
import { API_URL, GQL_URL } from "../../utils/config";
import { UserVerification } from '../../utils/types';
import { gql, GraphQLClient } from "graphql-request";

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

  const userData = response.json() as unknown as User;
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

  return response.ok;
}

// Function to create a new GraphQL Client
const createGraphQLClient = (token: string) => {
  return new GraphQLClient(GQL_URL, {
    headers: token ? {
      Authorization: `Bearer ${token}`,
    } : {},
  });
};

// Get Posts from GraphQL Service
export const getPosts = async (user_id: number, token: string): Promise<Post[]> => {
  const graphQLClient = createGraphQLClient(token);

  const query = gql`
    query Users($userId: Int) {
        Users(user_id: $userId) {
            posts {
                post_id
                content
            }
        }
    }
  `;

  const variables = {
    userId: user_id
  };

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await graphQLClient.request(query, variables);
    console.log(response);
    return response.Users[0].posts as unknown as Post[];
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw new Error('Error obtaining posts');
  }
};