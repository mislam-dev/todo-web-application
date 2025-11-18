import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://images.pexels.com/**"),
      new URL("http://127.0.0.1:8000/**"),
      new URL(
        "https://pioneer-alpha-website-django-s3-bucket-new-2.s3.amazonaws.com/**"
      ),
    ],
  },
};

export default nextConfig;
