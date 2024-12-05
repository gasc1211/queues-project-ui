"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { FormEventHandler, useEffect, useState } from "react";
import { userVerification } from "@/app/api/handler";
import { useRouter } from "next/navigation";

export default function VerifyAccount({ params }: { params: Promise<{ email: string }> }) {

  const router = useRouter();
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchEmail = async () => {
      setEmail((await params).email.replace("%40", "@"));
    }
    fetchEmail();
  }, [params]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    const isVerified = await userVerification({
      email: email,
      verification_code: parseInt(value)
    });

    if (isVerified)
      router.push("/auth/signin");
  }

  return (
    <main className="h-dvh flex items-center justify-around">
      <Card className="p-8 w-2/5">
        <form className="[&>*]:mt-4 flex flex-col align-middle" onSubmit={onSubmit}>
          <h2 className="text-center font-bold">Verification Code</h2>
          <p className="text-sm font-light text-center">Enter the verification code sent to your email address: <strong>{email}</strong></p>
          <div className="mb-4 flex align-middle justify-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button type="submit">Verify Account</Button>
        </form>
      </Card>
    </main>
  );
}