import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { getPostLikes as getPostLikesUtil } from '../../lib/post-likes';

export const getPostLikes = defineAction({
  input: z.string(),
  handler: async (postId) => getPostLikesUtil(postId),
});