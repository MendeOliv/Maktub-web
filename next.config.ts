import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF to supporting browsers, WebP to everything else.
    formats: ['image/avif', 'image/webp'],
    // Optimized variants are immutable per source; cache them for 31 days.
    minimumCacheTTL: 2678400,
    deviceSizes: [360, 420, 640, 768, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
