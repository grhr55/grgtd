/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "peaceful-youtiao-a888bf.netlify.app",
      },
    ],
  },
};

export default nextConfig;
