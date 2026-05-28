import { githubHeaders } from "@/config/github";

export async function followersService(
  username: string,
  limit: number = 100,
  page: number = 1
) {
  const response = await fetch(
    `https://api.github.com/users/${username}/followers?per_page=${limit}&page=${page}`,
    {
      headers: githubHeaders(),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Error fetching followers (${response.status} ${response.statusText}): ${body}`
    );
  }

  return await response.json();
}
