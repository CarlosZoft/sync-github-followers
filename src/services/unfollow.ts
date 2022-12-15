export async function unfollowUser({ login }: { login: string }) {
  const { ok, status } = await fetch(
    `https://api.github.com/user/following/${login}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_GITHUB}`,
      },
      method: "DELETE",
    }
  );

  if (!ok) throw new Error("Error when trying to unfollow");

  console.log("User unfollowed!");
  return { status };
}
