type SiteEnvironment = Record<string, string | undefined>;

/** Resolve at build time: never advertise an unconnected future domain. */
export function getSiteUrl(env: SiteEnvironment = process.env): URL {
  if (env.SITE_URL) return new URL(new URL(env.SITE_URL).origin);

  const deploymentHost = env.VERCEL_ENV === "preview"
    ? env.VERCEL_BRANCH_URL || env.VERCEL_URL
    : env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL;

  return new URL(deploymentHost
    ? `https://${deploymentHost}`
    : `http://localhost:${env.PORT || 3000}`);
}
