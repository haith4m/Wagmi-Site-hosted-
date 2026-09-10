import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Explicitly pin the workspace root so Turbopack doesn't try to infer it
    // from a stray lockfile that may exist in a parent directory (e.g. the
    // user's home directory), which produces a noisy build-time warning.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
