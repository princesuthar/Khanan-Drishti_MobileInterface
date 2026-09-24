import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Enter your email or username.'),
  password: z
    .string()
    .min(6, 'Password must contain at least 6 characters.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
