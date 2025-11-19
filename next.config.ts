import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/', 
        destination: '/refund',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.jumpapay.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "payment-gateway.bacod.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drive.gamaloka.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "standalone"
};

export default nextConfig;
