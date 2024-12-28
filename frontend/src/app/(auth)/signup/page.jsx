"use client"
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import SignInForm from "@/components/auth/SignInForm";
import ParallaxImage from "@/common/ParallaxImage";
import AnimatedButton from "@/common/AnimatedButton";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block w-1/2 relative">
        <ParallaxImage
          src="/images/2.png"
          alt="NextGen Tech"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-white text-center p-8">
            <h1 className="text-4xl font-bold mb-4">Join NextGen Tech</h1>
            <p className="text-xl">Start your journey in tech innovation</p>
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
            <h2 className="text-3xl font-bold tracking-tight text-white">Create Account</h2>
            <p className="mt-2 text-[var(--color-primary)]">
              Join our community of innovators
            </p>
          </div>
          <SignInForm>
            <div className="flex justify-center">
              <AnimatedButton color="white" className="w-full text-[var(--color-secondary)]">
                Create Account
              </AnimatedButton>
            </div>
          </SignInForm>
          <div className="text-center">
            <p className="text-[var(--color-primary)] text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-[var(--color-accent-hover)]">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}