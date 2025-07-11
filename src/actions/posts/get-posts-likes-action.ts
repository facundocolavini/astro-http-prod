import { defineAction } from 'astro:actions';
import { db, eq, Posts } from 'astro:db';
import { z } from 'astro:schema';

export const getPostLikes = defineAction({
  input: z.string(),
  handler: async (postId) => {
    const [post] = await db.select().from(Posts).where(eq(Posts.id, postId));

    if (!post) {
      return { likes: 0, exists: false };
    }

    console.log('TURSO_DATABASE_URL:', process.env.TURSO_DATABASE_URL);
    console.log('TURSO_AUTH_TOKEN:', process.env.TURSO_AUTH_TOKEN ? 'Present' : 'Missing');

    return {
      likes: post.likes,
      exists: true,
    };
  },
});