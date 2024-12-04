"use client";
import { useRouter } from "next/navigation";

export default function SignOut() {

  // Remove all local storage variables including token
  localStorage.clear();

  // Return back to landing page
  const router = useRouter();
  router.push("/");
}