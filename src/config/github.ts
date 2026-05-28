export function githubHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${process.env.AUTH_GITHUB}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    // GitHub's REST API rejects requests without a User-Agent (403).
    "User-Agent": "sync-github-followers",
  };
}
