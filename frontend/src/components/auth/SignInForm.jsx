"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/validations/auth";
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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "+20",
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    // Handle form submission here
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[var(--color-primary)]">Full Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your Name" 
                  className="text-[var(--color-primary)]"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[var(--color-primary)]">Phone Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="+201234567890" 
                  className="text-[var(--color-primary)]"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[var(--color-primary)]">SUT Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="name230100000@sut.edu.eg"
                  type="email"
                  className="text-[var(--color-primary)]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[var(--color-primary)]">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="text-[var(--color-primary)]"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-primary)]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;