export async function followingService(
  username: string,
  limit: number = 100,
  page: number = 1
) {
  const response = await fetch(
    `https://api.github.com/users/${username}/following?per_page=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_GITHUB}`,
      },
    }
  );

  if (!response.ok) throw new Error("Error fetching following");

  return await response.json();
}
