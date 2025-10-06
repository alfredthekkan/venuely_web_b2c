// src/schemas/auth.ts
import { z } from 'zod';

// Step 1: Phone Number Input
export const PhoneSchema = z.object({
  phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }).regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, {
    message: 'Invalid phone number format (e.g., +1 555-555-5555)',
  }),
});

export type PhoneFormData = z.infer<typeof PhoneSchema>;

// Step 2: OTP Code Input
export const OtpSchema = z.object({
  otp: z.string().min(6, {
    message: 'The OTP must be 6 digits.',
  }).max(6, {
    message: 'The OTP must be 6 digits.',
  }),
});

export type OtpFormData = z.infer<typeof OtpSchema>;