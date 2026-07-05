import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.19"],
  output: "export",
  distDir: "out",
};

export default nextConfig;
