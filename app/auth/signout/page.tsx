"use client";
import { useRouter } from "next/navigation";

export default function SignOut() {

  const router = useRouter();

  // Remove all local storage variables including token
  if (typeof window !== "undefined")
    localStorage.clear();

  // Return back to landing page
  router.push("/");
}