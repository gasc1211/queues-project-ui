"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userHomePage } from "../api/handler";
import { User } from "../../utils/types";

export default function Home() {

  const router = useRouter();
  const [user, setUser] = useState<User>();

  const idToken = localStorage.getItem("idToken");

  useEffect(() => {

    if (!idToken) {
      router.push("/auth/signin");
      return;
    }

    const fetchUserData = async () => {
      const userData = await userHomePage(idToken);
      setUser(userData);
    }

    fetchUserData();

  }, [router, idToken]);

  return (
    <main>
      <h1 className="font-bold text-xl">HomePage</h1>
      {user && <p>{user.email}</p>}
    </main>
  );
}