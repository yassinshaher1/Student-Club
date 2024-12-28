"use client"
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import ParallaxImage from "@/common/ParallaxImage";
import AnimatedButton from "@/common/AnimatedButton";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block w-1/2 relative">
        <ParallaxImage
          src="/images/10.png"
          alt="NextGen Tech"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-white text-center p-8">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-xl">Continue your journey with NextGen Tech</p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[var(--color-secondary)]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h2>
            <p className="mt-2 text-[var(--color-primary)]">
              Sign in to access your account
            </p>
          </div>
          <LoginForm>
            <div className="flex justify-center">
              <AnimatedButton color="white" className="w-full text-[var(--color-secondary)]">
                Login
              </AnimatedButton>
            </div>
          </LoginForm>
          <div className="text-center">
            <p className="text-[var(--color-primary)] text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[var(--color-accent-hover)]">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 