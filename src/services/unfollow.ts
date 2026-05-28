import { githubHeaders } from "@/config/github";

export async function unfollowUser({ login }: { login: string }) {
  const response = await fetch(
    `https://api.github.com/user/following/${login}`,
    {
      headers: githubHeaders(),
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Error when trying to unfollow ${login} (${response.status} ${response.statusText}): ${body}`
    );
  }

  console.log(`User unfollowed: ${login}`);
  return { status: response.status };
}
