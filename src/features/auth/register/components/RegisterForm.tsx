"use client";
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
import { Axios } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .regex(/^[A-Za-z ]+$/, "Please enter a valid name format."),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .regex(/^[A-Za-z ]+$/, "Please enter a valid name format."),
    email: z.email("Enter a valid email"),
    password: z.string().min(4, "4 characters minimum."),
    confirmPassword: z.string().min(4, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export function RegisterForm() {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      console.log(key);
      formData.append(key, value);
    });

    try {
      const axios = Axios.getInstance("")!;
      await axios.post("/users/signup/", formData, { headers: {} });
      toast.success(
        "Your account is being created successfully! Redirecting in 2s!"
      );
      form.reset();
      setTimeout(() => {
        router.push("/auth/login");
      }, 2 * 1000);
    } catch (error) {
      let defaultMessage = "Something went wrong! Please try again later!";
      if (isAxiosError(error)) {
        defaultMessage = error.response?.data.detail || defaultMessage;
      }
      setError(defaultMessage);
      toast.error(defaultMessage);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex gap-x-3">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full text-white bg-indigo-500 hover:bg-indigo-600"
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
