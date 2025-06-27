import { defineAction } from 'astro:actions';
import { db, eq, Posts } from 'astro:db';
import { z } from 'astro:schema';

export const updatePostLikes = defineAction({
  accept: 'json',
  input: z.object({
    postId: z.string(),
    increment: z.number(),
  }),
  handler: async ({ postId, increment }) => {
    // Busca el post en la base de datos
    const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
    const exists = posts.length > 0;
    const likes = exists ? posts[0].likes : 0;

    if (!exists) {
      const newPost = {
        id: postId,
        title: 'Post not found',
        likes: increment, // O 0, según tu lógica
      };
      await db.insert(Posts).values(newPost);
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