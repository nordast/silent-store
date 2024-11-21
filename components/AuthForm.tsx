"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Link from "next/link";
import { createUser, signInUser } from "@/lib/actions/user.actions";
import OtpModal from "@/components/OtpModal";
import AppLoader from "@/components/base/AppLoader";
import styles from "./styles/AuthForm.module.css";
import { ROUTING } from "@/app/routing.js"

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) =>
  z.object({
    email: z.string().email().max(50),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState("");
  const pageName = type === "sign-in" ? "Login" : "Create Account";
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user =
        type === "sign-up"
          ? await createUser({
              email: values.email,
              fullName: values.fullName || "",
            })
          : await signInUser(values.email);

      setAccountId(user.accountId);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to create account. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.root}>
          <h1 className={styles.title}>{pageName}</h1>

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full Name</FormLabel>

                    <FormControl>
                      <Input
                        className="shad-input"
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>

                  <FormControl>
                    <Input
                      type="email"
                      className="shad-input"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <Button
            className="primary-btn h-[66px]"
            type="submit"
            disabled={isLoading}
          >
            {pageName}
            {isLoading && <AppLoader />}
          </Button>

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}

              <Link
                href={type === "sign-in" ? ROUTING.signUp : ROUTING.signIn}
                className="link ml-1 font-medium"
              >
                {type === "sign-in" ? "Create Account" : "Login"}
              </Link>
            </p>
          </div>
        </form>

        {accountId && (
          <OtpModal email={form.getValues("email")} accountId={accountId} />
        )}
      </Form>
    </>
  );
};

export default AuthForm;
