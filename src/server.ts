import "dotenv/config";
import express, { Request, Response } from "express";
import { syncFollowing } from "@/controller/syncFollowing";

const app = express();

app.post(
  "/syncFollowers/:login",
  async (request: Request, response: Response) => {
    try {
      const { login } = request.params;
      await syncFollowing(login);

      response.send("Success");
    } catch (error) {
      response.status(500).send("Unexpected error")
    }
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
