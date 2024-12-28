import * as z from "zod";

const emailSchema = z
  .string()
  .email()
  .regex(
    /^[a-zA-Z]+(?:2301|2401)0\d{4}@sut\.edu\.eg$/,
    "Email must be in the format: name230100000@sut.edu.eg or name240100000@sut.edu.eg"
  );

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

export const signInSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must not exceed 50 characters"),
  phoneNumber: z
    .string()
    .regex(
      /^\+20[0-9]{10}$/,
      "Phone number must be an Egyptian number starting with +20"
    ),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignInInput = z.infer<typeof signInSchema>;
export type LoginInput = z.infer<typeof loginSchema>;