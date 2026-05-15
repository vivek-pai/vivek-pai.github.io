import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    caption: z.string(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().default(''),
    tags: z.array(z.string()),
    date: z.coerce.date(),
    domain: z.enum(['hci', 'research', 'fabrication', 'music', 'about']),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    videoId: z.string().optional(),
    noEmbed: z.boolean().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
          type: z
            .enum(['paper', 'github', 'demo', 'video', 'press'])
            .optional(),
        })
      )
      .optional(),
  }),
});

export const collections = { projects };
