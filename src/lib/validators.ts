import { z } from 'zod';

// Enhanced validation schemas with security
export const NewsSchema = z.object({
  title: z.string()
    .min(1, 'Title must be at least 1 character')
    .max(255, 'Title must be less than 255 characters')
    .regex(/^[a-zA-Z0-9\s\-'.!?(),:;]+$/, 'Title contains invalid characters')
    .transform(val => val.trim())
    .transform(val => val.replace(/\s+/g, ' ')), // Normalize spaces
  category: z.enum(['Fan Theory', 'Merchandise', 'Interview', 'Breaking News', 'General']).default('General'),
  image: z.string().url().nullable().optional(),
  content: z.string()
    .min(10, 'Content must be at least 10 characters')
    .max(10000, 'Content must be less than 10000 characters')
    .transform(val => val.trim())
    .transform(val => val.replace(/\s+/g, ' ')), // Normalize spaces
  link: z.string().url().nullable().optional(),
  author: z.string()
    .min(1, 'Author name must be at least 1 character')
    .max(100, 'Author name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-'.]+$/, 'Author name contains invalid characters')
    .transform(val => val.trim())
    .transform(val => val.replace(/\s+/g, ' ')) // Normalize spaces
});



export const CharacterSchema = z.object({
  name: z.string()
    .min(1, 'Name must be at least 1 character')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z0-9\s\-'.]+$/, 'Name contains invalid characters')
    .transform(val => val.trim())
    .transform(val => val.replace(/\s+/g, ' ')), // Normalize spaces
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .transform(val => val.trim())
    .transform(val => val.replace(/\s+/g, ' ')), // Normalize spaces
  image: z.string().url().nullable().optional(),
  faction: z.enum(['main', 'black_organization', 'police', 'fbi'])
});

// Security utility functions
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .trim();
};

export const validateCSRFToken = (token: string | undefined, sessionToken: string | undefined): boolean => {
  return !!(token && sessionToken) && token === sessionToken;
};

export const generateSecureId = (): string => {
  return Math.random().toString(36).substring(2, 15) +
    Date.now().toString(36);
};
