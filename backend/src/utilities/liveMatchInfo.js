import { liveMatchAxiosInstance } from "../configs/axios/liveMatchAxiosInstance.js";
import dotenv from "dotenv";

dotenv.config();
export const liveMatchInfo = async () => {
  try {
    const data = await liveMatchAxiosInstance.get(
      process.env.CURRENT_IPL_ENDPOINT
    );

    let matchData = data?.data?.sports_results.game_spotlight;
    const liveMatchdata = {
      stadium: matchData.stadium,
      stage: matchData.stage,
      teams1: matchData.teams[0],
      teams2: matchData.teams[1],
      date: matchData.date,
    };

    return liveMatchdata;
  } catch (error) {
    return error;
  }
};
