import { z } from 'zod';
import { formatNumbeWithDecimal } from './utils';

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumbeWithDecimal(Number(value))),
    'Price must have exactly two decimal places'
  );

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be atleast 3 characters'),
  slug: z.string().min(3, 'Slug must be atleast 3 characters'),
  category: z.string().min(3, 'Category must be atleast 3 characters'),
  brand: z.string().min(3, 'Brand must be atleast 3 characters'),
  description: z.string().min(3, 'Description must be atleast 3 characters'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have atleast one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be atleast 6 characters'),
});

// Schema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be atleast 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be atleast 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be atleast 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
