import { z } from 'zod';

// Password complexity rules:
// - At least 8 characters
// - At least one uppercase letter
// - At least one lowercase letter
// - At least one number
// - At least one special character
export const passwordRules = [
  { id: 'length', label: 'At least 8 characters', test: (val) => val && val.length >= 8 },
  { id: 'uppercase', label: 'At least one uppercase letter (A-Z)', test: (val) => /[A-Z]/.test(val || '') },
  { id: 'lowercase', label: 'At least one lowercase letter (a-z)', test: (val) => /[a-z]/.test(val || '') },
  { id: 'number', label: 'At least one number (0-9)', test: (val) => /[0-9]/.test(val || '') },
  { id: 'special', label: 'At least one special character (!@#$%^&*)', test: (val) => /[^A-Za-z0-9]/.test(val || '') }
];

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid institutional or personal email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
  rememberMe: z.boolean().optional()
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(60, 'Full name cannot exceed 60 characters'),
    email: z
      .string()
      .min(1, 'Email address is required')
      .email('Please enter a valid institutional or personal email address'),
    role: z.enum(['student', 'teacher'], {
      required_error: 'Please select whether you are a Student or a Teacher'
    }),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must include at least one uppercase letter')
      .regex(/[a-z]/, 'Must include at least one lowercase letter')
      .regex(/[0-9]/, 'Must include at least one number')
      .regex(/[^A-Za-z0-9]/, 'Must include at least one special character (!@#$%^&*)'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the Academic Code of Conduct and Terms'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });
