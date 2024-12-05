"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { userSignIn } from "@/app/api/handler";
import { useState } from "react";
import { useRouter } from "next/navigation";

const UserSignInSchema = z.object({
  email: z.string(),
  password: z.string()
})

export default function Signin() {

  const form = useForm<z.infer<typeof UserSignInSchema>>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof UserSignInSchema>) => {
    try {
      const response = await userSignIn(values);
      localStorage.setItem("idToken", response.idToken);
      router.push(`/home`);
    } catch (err) {
      const error = err as { message: string };
      setError(error.message);
    }
  }

  return (
    <main className="h-dvh flex items-center justify-evenly">
      <Card className="[&>*]:mt-4 w-1/3 px-8 py-4">
        <h2 className="font-bold text-center text-2xl">Queues Project</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="[&>*]:mt-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input placeholder="user@example.com" type="email" {...field} />
                <FormDescription>Enter your account email</FormDescription>
              </FormItem>
            )}
            />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input placeholder="********" type="password" {...field} />
                <FormDescription>Enter your account password</FormDescription>
              </FormItem>
            )}
            />
            {error && <p>{error}</p>}
            <div className="flex flex-col align-middle">
              <Button type="submit">Sign In</Button>
            </div>
          </form>
        </Form>
        <p className="text-sm text-center">Don&apos;t have an account yet?
          <Button variant="outline" className="ml-2">
            <Link href="/auth/signup">Sign up</Link>
          </Button>
        </p>
      </Card>
    </main>
  );
}