import http from 'k6/http';

export function getProducts(baseUrl) {
  return http.get(`${baseUrl}/productsList`);
}

export function createPost() {
  const randomId = Math.floor(Math.random() * 10) + 1;

  return http.post(
    'https://jsonplaceholder.typicode.com/posts',
    JSON.stringify({
      title: `Hola mundo ${randomId}`,
      body: 'Prueba k6',
      userId: randomId,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}