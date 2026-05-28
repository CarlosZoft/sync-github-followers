import { githubHeaders } from "@/config/github";

export async function followUser({ login }: { login: string }) {
  const response = await fetch(
    `https://api.github.com/user/following/${login}`,
    {
      headers: githubHeaders(),
      method: "PUT",
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Error when trying to follow ${login} (${response.status} ${response.statusText}): ${body}`
    );
  }

  console.log(`User followed: ${login}`);
  return { status: response.status };
}
