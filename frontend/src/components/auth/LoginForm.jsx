'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
import { useAuth } from "@/hooks/use-auth";
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
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/services/users";

export default function LoginForm({ children }) {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    try {
      const response = await loginUser(data.email, data.password);
      if (response) {
        const userRole = response.role;
        setMessage(response.message || "Login successful");
        
        switch (userRole) {
          case 'admin':
            router.push('/admin');
            break;
          case 'member':
            router.push('/');
            break;
          default:
            setMessage("Invalid user role");
            break;
        }
      } else {
        setMessage("Login failed");
      }
    } catch (error) {
      console.error('Login failed:', error);
      setMessage(error.message || "Login failed");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
}