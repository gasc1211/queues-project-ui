"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Landing() {

  const router = useRouter();

  if (typeof window !== "undefined") {
    const idToken = localStorage.getItem("idToken");
    if (idToken)
      router.push('/home');
  }

  return (
    <main className="h-dvh flex items-center justify-around text-2xl">
      <div>
        <h1>Welcome to <strong>Queues Project</strong></h1>
        <Button variant={"secondary"} className="font-bold text-lg mt-4">
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </div>
    </main>
  );
}
