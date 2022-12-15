import {
  followersService,
  followingService,
  followUser,
  unfollowUser,
} from "@/services";
import { asyncGeneratorPaginate, makeChunksDifference } from "@/helpers";

export async function syncFollowing(username: string) {
  const CHUNK_SIZE = 10;
  const [asyncGenFollowing, asyncGenFollowers] = [
    followingService,
    followersService,
  ].map((func) => asyncGeneratorPaginate(func, [username]));

  const following = [];
  const followers = [];

  // Populate following and followers
  for await (const data of asyncGenFollowing) following.push(...data);
  for await (const data of asyncGenFollowers) followers.push(...data);

  // Make chunks of promises to unfollow and follow
  const chunkedFollowingNotFollowers = makeChunksDifference(
    following,
    followers,
    "id",
    CHUNK_SIZE,
    unfollowUser
  );
  const chunkedFollowersNotFollowing = makeChunksDifference(
    followers,
    following,
    "id",
    CHUNK_SIZE,
    followUser
  );

  // Execute promises
  const outstandingPromises = [
    chunkedFollowingNotFollowers,
    chunkedFollowersNotFollowing,
  ];

  for (const promises of outstandingPromises) {
    for (const chunk of promises) {
      try {
        await Promise.all(chunk);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
