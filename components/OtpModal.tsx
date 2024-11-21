"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import AppLoader from "@/components/base/AppLoader";
import { Button } from "@/components/ui/button";
import { sendEmailOtp, verifyEmailOtp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ROUTING } from "@/app/routing.js"

const OtpModal = ({
  email,
  accountId,
}: {
  email: string;
  accountId: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Call API to verify OTP
      const sessionId = await verifyEmailOtp({ accountId, otp });
      if (sessionId) router.push(ROUTING.home);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    // Call API to resend OTP
    await sendEmailOtp(email);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter OTP
            <Image
              src="/assets/icons/close-dark.svg"
              alt="Close"
              width={20}
              height={20}
              onClick={() => setIsOpen(false)}
              className="absolute -right-1 -top-7 cursor-pointer sm:-right-2 sm:-top-4"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We've sent a code to{" "}
            <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP
          maxLength={6}
          value={otp}
          onChange={setOtp}
          pattern={REGEXP_ONLY_DIGITS}
          autoFocus={true}
        >
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex flex-col w-full gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="shad-submit-btn h-12 w-full"
              type="button"
              disabled={isLoading}
            >
              Submit
              {isLoading && <AppLoader />}
            </AlertDialogAction>

            <div className="subtitle-2 mt-2 text-light-100 text-center">
              Didn’t get a code?{" "}
              <Button
                type="button"
                variant="link"
                className="pl-1 text-brand"
                onClick={handleResendOtp}
              >
                Click to resend.
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
