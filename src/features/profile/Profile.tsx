"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Camera, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const accountSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  contactNumber: z.string().regex(/^[0-9+\- ]{7,15}$/, "Invalid phone number"),
  birthday: z.string().min(1, "Date is required"),
  photo: z.any().optional(),
});

export type AccountSchema = z.infer<typeof accountSchema>;

export function ProfileContainer() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      contactNumber: "",
      birthday: "",
      photo: null,
    },
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
    form.setValue("photo", file);
  };

  const onSubmit = (data: AccountSchema) => {
    console.log("FORM SUBMIT →", data);
  };

  return (
    <div className="p-10 bg-[#eef6ff] min-h-screen">
      <Card className="bg-white rounded-2xl mt-6 p-8 border-0 shadow-none">
        <div className="">
          <h1 className="text-3xl font-semibold text-[#0d224a]">
            Account Information
          </h1>
          <div className="h-[3px] w-40 bg-primary mt-1 rounded"></div>
        </div>

        <Card className="w-min">
          <CardContent className="flex gap-x-3 items-center">
            <div className="relative w-28 h-28">
              <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
                {photoPreview && (
                  <Image
                    src={photoPreview}
                    alt="Profile"
                    fill
                    className="object-cover rounded-full"
                  />
                )}
              </div>

              <label className="absolute bottom-0 right-0 bg-primary text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer shadow">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>

            <label className=" w-max">
              <div className="cursor-pointer bg-primary hover:bg-[#3f5dea] text-white text-sm px-4 py-3 rounded-lg flex items-center gap-2">
                <Upload className="w-4 h-4" /> Upload New Photo
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
          </CardContent>
        </Card>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 border border-gray-300 rounded-xl p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white border-gray-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white border-gray-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white border-gray-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white border-gray-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white border-gray-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4 relative">
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthday</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="bg-white border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8 flex justify-center gap-4 items-center">
              <Button
                type="submit"
                size={"lg"}
                className="px-8 bg-primary hover:bg-[#3f5dea] h-10"
              >
                Save Changes
              </Button>

              <Button
                type="button"
                size={"lg"}
                className="px-16 bg-[#8CA3CD] text-white h-10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
