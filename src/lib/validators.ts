import { z } from 'zod';

export const NewsSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 chars").max(150),
    category: z.enum(['Fan Theory', 'Merchandise', 'Interview', 'Breaking News', 'General']).default('General'),
    image: z.string().url().optional().or(z.literal('')),
    content: z.string().min(10, "Content is too short"),
    link: z.string().url().optional().or(z.literal(''))
});

export const CaseSchema = z.object({
    title: z.string().min(1).max(200),
    type: z.enum(['canon', 'anime', 'movie']).default('canon'),
    description: z.string().min(1),
    image: z.string().url().optional().or(z.literal(''))
});

export const CharacterSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    image: z.string().url().optional().or(z.literal('')),
    faction: z.enum(['main', 'black_organization', 'police', 'fbi']).default('main')
});
