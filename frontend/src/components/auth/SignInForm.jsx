"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addUser, loginUser } from "@/lib/services/users";
import { useAuth } from "@/hooks/use-auth";
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

const SignInForm = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "+20",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    try {
      // First, attempt to register the user
      const signupResponse = await addUser({
        name: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phoneNumber,
      });

      // If we get here, registration was successful
      // Now attempt to login
      const loginResponse = await loginUser(data.email, data.password);
      
      if (loginResponse && loginResponse.role) {
        setUser(loginResponse); // Store user data in auth context
        setMessage("Account created successfully!");
        router.push('/'); // Redirect to landing page
      } else {
        setMessage("Registration successful but login failed. Please try logging in manually.");
        router.push('/login');
      }
      
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.message.includes("already exists")) {
        setMessage("This email is already registered. Please try logging in.");
      } else {
        setMessage(error.message || "Registration failed");
      }
    }
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
                  className="text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]"
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
                  className="text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]"
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
                  className="text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]"
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
                    className="text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]"
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
        {message && <p className="text-center text-red-500">{message}</p>}
        {children}
      </form>
    </Form>
  );
};

export default SignInForm;