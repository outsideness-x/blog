/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    // server components support for mdx is handled via next-mdx-remote
  },
};

export default nextConfig;