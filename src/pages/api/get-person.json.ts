import type { APIRoute } from 'astro';
// export const prerender = true;
/* 
 # Endpoint para contenido estatico Restful API estaticos
 No es obligatorio meter todo sobre una carpeta api pero si es obligatorio que este dentro de pages.
 - API : api/get-person.json
*/

/* export const GET: APIRoute = async ({ params, request }) => {
  const person = {
    name: 'Fernando Herrera',
    age: 38,
  };

  return new Response(JSON.stringify(person), {
    status: 201,
    headers: {// Contenido que regresamos en esta respuesta
      'Content-Type': 'application/json',
    },
  });
};
 */