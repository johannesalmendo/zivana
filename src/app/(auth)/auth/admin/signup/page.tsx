"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { signUpAdminFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { z } from "zod";

interface SignUpPageProps {}

const SignUpPage: FC<SignUpPageProps> = ({}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpAdminFormSchema>>({
    resolver: zodResolver(signUpAdminFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (val: z.infer<typeof signUpAdminFormSchema>) => {
    try {
      setIsLoading(true);
      await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(val),
      });
      await router.push("/auth/admin/signin");
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Please Try Again",
      });
      console.log(error);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="mb-2 text-2xl font-semibold text-center">
          Register Admin
        </div>
        <div className="text-sm text-gray-500">
          Buat akun Admin Anda untuk mengelola produk
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Masukkan nama anda" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Masukkan email anda" {...field} />
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
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Masukkan password anda"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full">
              {isLoading ? (
                <ClipLoader
                  color="#ffffff"
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Submit"
              )}
            </Button>

            <div className="text-sm text-center">
              Sudah punya akun?{" "}
              <Link href="/auth/admin/signin" className="text-primary font-semibold">
                Masuk
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
