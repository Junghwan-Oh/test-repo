import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Edge Runtime에서 환경 변수 사용 가능하도록 설정
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // worktree 디렉토리 제외
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/worktree/**', '**/node_modules/**'],
    };
    return config;
  },
};

export default nextConfig;
