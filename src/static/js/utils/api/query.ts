let baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : `https://davebitter.com`;

export default async (path: string) => await fetch(`${baseUrl}/api${path}`).then((res) => res.json()).catch(console.error);
