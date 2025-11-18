"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(4, "4 characters minimum."),
  remember: z.boolean().optional().default(false),
});

type LoginRequestResponse = {
  access: string;
  refresh: string;
};

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      const res = await axios.post<LoginRequestResponse>(
        "/api/login/",
        formData
      );
      toast.success("Your have successfully logged in! Redirecting in 2s!");
      form.reset();
      console.log(res.data);
      // authToken.set(res.data.access);
      // refreshToken.set(res.data.refresh);
      setTimeout(() => {
        router.push("/todos");
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
        <div className="flex items-center justify-between w-full">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal text-sm text-muted-foreground">
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />

          {/* Forgot password */}
          <Link
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full text-white bg-indigo-500 hover:bg-indigo-600"
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
}
