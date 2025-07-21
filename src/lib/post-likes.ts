import { db, eq, Posts } from 'astro:db';

export async function getPostLikes(postId: string) {
  const [post] = await db.select().from(Posts).where(eq(Posts.id, postId));
  return post
    ? { exists: true, likes: post.likes }
    : { exists: false, likes: 0 };
} 