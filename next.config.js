/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // domains: ['images.unsplash.com'],
    domains: [
      "fakestoreapi.com",
      "api.lorem.space",
      "placeimg.com",
      "images.unsplash.com",
      "tailwindui.com",
      "flagpack.xyz",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
