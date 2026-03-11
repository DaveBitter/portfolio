import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dave Bitter",
    short_name: "Dave Bitter",
    description:
      "I am a Senior Front-end Consultant, Developer Advocate, and Google Developer Expert for Web. Here, you can find my resume, a collection of my articles covering a wide range of topics and get in contact.",
    start_url: "/",
    display: "standalone",
    background_color: "#222222",
    theme_color: "#222222",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
