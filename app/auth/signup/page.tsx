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
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { userSignUp } from "@/app/api/handler";
import { useRouter } from "next/navigation";

const UserSignUpSchema = z.object({
  first_name: z.string()
    .min(2, {
      message: "First name can't be empty"
    })
    .refine((value) => {
      const sqlInjectionPattern = /['"--;]|\/\*|\*\//; // Match SQL-sensitive characters or sequences
      return !sqlInjectionPattern.test(value);
    }, {
      message: "Input contains forbidden characters or patterns.",
    }),
  last_name: z.string()
    .min(2, {
      message: "Last name can't be empty"
    })
    .refine((value) => {
      const sqlInjectionPattern = /['"--;]|\/\*|\*\//; // Match SQL-sensitive characters or sequences
      return !sqlInjectionPattern.test(value);
    }, {
      message: "Input contains forbidden characters or patterns.",
    }),
  email: z.string()
    .email({
      message: "Email is not optional"
    })
    .refine((value) => {
      const sqlInjectionPattern = /['"--;]|\/\*|\*\//; // Match SQL-sensitive characters or sequences
      return !sqlInjectionPattern.test(value);
    }, {
      message: "Input contains forbidden characters or patterns.",
    }),
  password: z.string()
    .min(8, {
      message: "Password needs to be at least 8 characters long"
    })
    .regex(/[A-Z]/, {
      message: "Password should have at least one uppercas character"
    })
    .regex(/[a-z]/, {
      message: "Password should have at least one lowecase character"
    })
    .regex(/[\W_]/, {
      message: "Password should have at least one special character"
    })
    .refine((value) => {
      const numericSequencePattern = /(012|123|234|345|456|567|678|789|890)/;
      return !numericSequencePattern.test(value);
    }, {
      message: "Your password should not have a sequence of numbers"
    })
    .refine((value) => {
      const sqlInjectionPattern = /['"--;]|\/\*|\*\//; // Match SQL-sensitive characters or sequences
      return !sqlInjectionPattern.test(value);
    }, {
      message: "Input contains forbidden characters or patterns.",
    }),
})

export default function Signup() {

  const form = useForm<z.infer<typeof UserSignUpSchema>>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    }
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof UserSignUpSchema>) => {
    try {
      await userSignUp(values);
      router.push(`/auth/verification/${values.email}`);
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
            <FormField control={form.control} name="first_name" render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <Input placeholder="John" type="text" {...field} />
                <FormDescription>Enter your first name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="last_name" render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder="Doe" type="text" {...field} />
                <FormDescription>Enter your last name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input placeholder="user@example.com" type="email" {...field} />
                <FormDescription>Enter your account email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input placeholder="********" type="password" {...field} />
                <FormDescription>Enter your account password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
            />
            {error && <p>{error}</p>}
            <div className="flex flex-col align-middle">
              <Button type="submit">Sign Up</Button>
            </div>
          </form>
        </Form>
        <p className="text-sm text-center">Already have an account?
          <Button variant="outline" className="ml-2">
            <Link href="/auth/signin">Sign in</Link>
          </Button>
        </p>
      </Card>
    </main>
  );
}