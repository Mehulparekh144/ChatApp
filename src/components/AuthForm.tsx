"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { use, useCallback, useEffect, useState } from "react";
import { Form } from "./ui/form";
import { FcGoogle } from "react-icons/fc";
import FormInput from "./FormInput";
import { Button } from "./ui/button";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "./ui/use-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [socialIsLoading, setSocialIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
  }, [session.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const form = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          setVariant("LOGIN");
        })
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong",
            description: "Try again later !",
          });
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast({
              variant: "destructive",
              title: "Invalid Credentials",
            });
          } if(callback?.ok && !callback.error) {
            toast({
              variant: "default",
              title: "Logged in",
            });
            router.push("/users");

            // Redirect to new page
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = () => {
    setSocialIsLoading(true);
    signIn("google", { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast({
            variant: "destructive",
            title: "Invalid Credentials",
          });
        }  if (callback?.ok && !callback.error) {
          router.push("/users");
          // Redirect to new page
        }
      })
      .finally(() => setSocialIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-zinc-100 px-4 md:px-6 py-4 dark:bg-primary-foreground rounded-md shadow-md w-full">
        <Form {...form}>
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {variant === "REGISTER" && (
              <FormInput
                id="name"
                title="Name"
                type="text"
                control={form.control}
                disabled={isLoading}
                required={true}
                placeholder="John Doe"
              />
            )}
            <FormInput
              id="email"
              title="Email"
              type="email"
              control={form.control}
              disabled={isLoading}
              required={true}
              placeholder="john@mail.com"
            />
            <FormInput
              id="password"
              title="Password"
              type="password"
              control={form.control}
              disabled={isLoading}
              required={true}
              placeholder=""
            />
            <Button type="submit" className="gap-3" disabled={isLoading}>
              {" "}
              {isLoading && (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
              )}{" "}
              Submit{" "}
            </Button>
          </form>
        </Form>
        <div className="flex text-xs items-center my-4">
          <div className="border-t border-gray-300 flex-grow mr-3"></div>
          <span className="text-gray-500 font-medium">Or continue with</span>
          <div className="border-t border-gray-300 flex-grow ml-3"></div>
        </div>
        <Button
          disabled={socialIsLoading}
          variant={"outline"}
          onClick={socialAction}
          className="w-full gap-4"
        >
          {socialIsLoading && (
            <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
          )}
          <FcGoogle className="h-5 w-5" />
        </Button>
        <div className="flex my-4 items-center justify-center gap-2">
          <div className="text-center text-sm text-zinc-500 font-medium ">
            {variant === "LOGIN"
              ? "New to Messenger ?"
              : "Already have an account ?"}
          </div>
          <div
            onClick={toggleVariant}
            className="cursor-pointer underline-offset-1 underline text-center text-sm text-zinc-500 font-medium"
          >
            {variant === "LOGIN" ? "Create an account" : "Signup"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
