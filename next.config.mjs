/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
];

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    const animationCacheControl =
      process.env.NODE_ENV === "development"
        ? "no-store, max-age=0"
        : "public, max-age=0, must-revalidate";

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/animations/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: animationCacheControl,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
