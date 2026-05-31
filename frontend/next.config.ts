import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  // Evita bloqueos de permisos en .next/dev/trace en entornos Windows + Docker/WSL.
  distDir: process.env.NODE_ENV === "development" ? ".next-local" : ".next",
};

const isDev = process.env.NODE_ENV === "development";

const sentryWrappedConfig = withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
  silent: true,
  org: "tu-organizacion",
  project: "frontend",
});

export default isDev ? nextConfig : sentryWrappedConfig;
