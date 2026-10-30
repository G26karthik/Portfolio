import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One collection, two kinds. A case study is a deep technical write-up (a competition solution,
// a paper). A product is something built and shipped: what it does, who it is for, stack, links.
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    kind: z.enum(['case', 'product']),
    title: z.string(),
    kicker: z.string(),
    hook: z.string(),
    users: z.string().optional(), // who a product is for
    placement: z.string().optional(),
    year: z.number(),
    order: z.number(),
    specimen: z.enum(['bizmatch', 'parallax', 'qnc', 'router', 'nishchay', 'triage']),
    field: z.string(),
    role: z.string(),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).min(3).max(4),
    skills: z.array(z.string()).min(3),
    stack: z.array(z.string()),
    links: z.array(z.object({ label: z.string(), href: z.url() })),
    pipeline: z.array(z.object({ name: z.string(), detail: z.string() })).min(3).max(6),
    next: z.array(z.string()).min(1),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    minutes: z.number(),
    og: z.string().default('home'), // an image in public/og
    skills: z.array(z.string()).min(3),
  }),
});

export const collections = { work, writing };
