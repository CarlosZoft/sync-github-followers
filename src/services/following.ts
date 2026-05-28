import { githubHeaders } from "@/config/github";

export async function followingService(
  username: string,
  limit: number = 100,
  page: number = 1
) {
  const response = await fetch(
    `https://api.github.com/users/${username}/following?per_page=${limit}&page=${page}`,
    {
      headers: githubHeaders(),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Error fetching following (${response.status} ${response.statusText}): ${body}`
    );
  }

  return await response.json();
}
