/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/i,
      use: ["postcss-loader"],
    })
    return config
  },
  postcssLoaderOptions: {
    plugins: ["tailwindcss", "autoprefixer"],
  },
}

module.exports = nextConfig
