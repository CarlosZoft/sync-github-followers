export async function followUser({ login }: { login: string }) {
  const { ok, status } = await fetch(
    `https://api.github.com/user/following/${login}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_GITHUB}`,
      },
      method: "PUT",
    }
  );

  if (!ok) throw new Error("Error when trying to follow");

  console.log("User followed!");
  return { status };
}
