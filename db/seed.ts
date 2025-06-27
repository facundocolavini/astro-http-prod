import { getCollection } from 'astro:content';
import { db, Clients,Posts } from 'astro:db';

export default async function() {
  const clients = [
    { id: 1, name: "Kasim", age: 20, isActive: true },
    { id: 2, name: "Mina", age: 21, isActive: false },
    { id: 3, name: "John", age: 22, isActive: true },
    { id: 4, name: "Jane", age: 23, isActive: false },
    { id: 5, name: "Jim", age: 24, isActive: true },
    { id: 6, name: "Jill", age: 25, isActive: false },
    { id: 7, name: "Jack", age: 26, isActive: false },
  ];

  await db.insert(Clients).values(clients);
 
  const posts =  await getCollection('blog'); 

  await db.insert(Posts).values(posts.map((post) => ({
    id: post.id,
    title: post.data.title,
    likes: Math.floor(Math.random() * 100),
  })));

  console.log('Seeded database');
}