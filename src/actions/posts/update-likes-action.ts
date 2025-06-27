import { defineAction } from 'astro:actions';
 
import { db, eq, Posts } from 'astro:db';
import { z } from 'astro:schema';
import { getPostLikes } from './get-posts-likes-action';

export const updatePostLikes = defineAction({
  accept: 'json',
  input: z.object({
    postId: z.string(),
    increment: z.number(),
  }),
  handler: async ({ postId, increment }) => {
    const result = await getPostLikes(postId);
    if (result.error) throw result.error;
    const { exists, likes } = result.data;

    if (!exists) {
      const newPost = {
        id: postId,
        title: 'Post not found',
        likes: 0,
      };
      await db.insert(Posts).values(newPost);
    }

    await db
      .update(Posts)
      .set({
        likes: likes + increment,
      })
      .where(eq(Posts.id, postId));

    return true;
  },
});