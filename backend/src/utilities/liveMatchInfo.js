import { getDate } from "./liveDateCatcher.js";
import { liveMatchAxiosInstance } from "../configs/axios/liveMatchAxiosInstance.js";

export const liveMatchInfo = async () => {
  let currentDate = getDate();
  try {
    const data = await liveMatchAxiosInstance
      .get(process.env.CURRENT_IPL_ENDPOINT);
    let matchData = data?.data?.data?.matchList;

    let liveMatchStats = matchData.find(
      (match) => match.date === currentDate
    );
    return liveMatchStats;
  } catch (error) {
    return error;
  }
};
