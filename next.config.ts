import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'c4.wallpaperflare.com' },
      { protocol: 'https', hostname: 'static.wikia.nocookie.net' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'www.detectiveconanworld.com' },
      { protocol: 'https', hostname: 'detectiveconanworld.com' },
    ],
  },
};

export default nextConfig;
