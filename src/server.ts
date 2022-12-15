import "dotenv/config";
import { syncFollowing } from "@/controller/syncFollowing";

const main = async () => {
  await syncFollowing("CarlosZoft");
};

main().catch((e) => console.error(e));
