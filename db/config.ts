import { column, defineDb, defineTable,  } from 'astro:db';

export const Clients = defineTable({
    columns: {
        id: column.number({primaryKey: true}),
        name: column.text(),
        age: column.number(),
        isActive: column.boolean(),
    }
});

export const Posts = defineTable({
    columns: {
        id: column.text({primaryKey: true}),
        title: column.text(),
        likes: column.number(),
    }
});

export default defineDb({ 
  tables: { Clients, Posts },
})