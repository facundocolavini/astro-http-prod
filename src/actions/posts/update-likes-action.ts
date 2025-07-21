import { defineAction } from 'astro:actions';
import { db, eq, Posts } from 'astro:db';
import { z } from 'astro:schema';
import { getPostLikes } from '../../lib/post-likes';
import { getCollection } from 'astro:content';

export const updatePostLikes = defineAction({
  accept: 'json',
  input: z.object({
    postId: z.string(),
    increment: z.number(),
  }),
  handler: async ({ postId, increment }) => {
    const { exists, likes } = await getPostLikes(postId);

    if (!exists) {
      // Buscar el post en la content collection
      const posts = await getCollection('blog');
      const postContent = posts.find((p) => p.id === postId);
      const title = postContent ? postContent.data.title : 'Post not found';

      await db.insert(Posts).values({
        title,
        likes: increment,
      });
      return true;
    }

    // Actualiza los likes
    await db
      .update(Posts)
      .set({
        likes: likes + increment,
      })
      .where(eq(Posts.id, postId));

    return true;
  },
});