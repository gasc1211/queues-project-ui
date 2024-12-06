"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userHomePage } from "../api/handler";
import { User } from "../../utils/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserPosts } from "@/components/UserPosts";

const formatter = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto'
});

export default function Home() {

  let idToken: string | null = "";
  const router = useRouter();
  const [user, setUser] = useState<User>();

  if (typeof window !== "undefined")
    idToken = localStorage.getItem("idToken");

  useEffect(() => {

    if (!idToken)
      router.push("/auth/signin");

    const fetchUserData = async () => {
      try {
        const userData = await userHomePage(idToken!);
        console.log(userData);
        setUser(userData);
      } catch (err) {
        console.error(err);
        localStorage.clear();
        router.push("/auth/signin");
      }
    }
    fetchUserData();

  }, [idToken, router]);

  return (
    <main className="my-8 mx-12">
      <h1 className="font-bold text-xl">HomePage</h1>
      {user &&
        <div className="mt-8 p-4">
          <p>
            Welcome <strong>{`${user.first_name} ${user.last_name}`}</strong> (
            {user.email}
            )
          </p>
          <p>Your accout was created {formatter.format(Math.round((Date.now() - Date.parse(user.created_at)) / 3600000), 'hour')}.</p>
          <Button variant={"secondary"} className="font-bold text-lg mt-4">
            <Link href="/auth/signout">Sign Out</Link>
          </Button>
          <UserPosts userId={user.user_id} token={idToken as string} />
        </div>
      }
    </main>
  );
}