import { liveMatchAxiosInstance } from "../configs/axios/liveMatchAxiosInstance.js";
import dotenv from "dotenv";
import { DateTime } from "luxon";

dotenv.config();

export const liveMatchInfo = async () => {
  try {
    const { data } = await liveMatchAxiosInstance.get(
      process.env.CURRENT_IPL_ENDPOINT
    );

    const matchData = data?.sports_results?.game_spotlight;
    if (!matchData) return null;

    const rawDateStr = matchData.date?.replace(/\u202f/g, "");
    const [day, timeStr] = rawDateStr.split(",").map((s) => s.trim());

    let baseDate = DateTime.now().setZone("Asia/Kolkata");

    if (day.toLowerCase() === "tomorrow") {
      baseDate = baseDate.plus({ days: 1 });
    }

    const time = DateTime.fromFormat(timeStr, "h:mm a");
    if (!time.isValid) {
      throw new Error(`Invalid time format: ${timeStr}`);
    }

    const matchDateIST = baseDate.set({
      hour: time.hour,
      minute: time.minute,
      second: 0,
      millisecond: 0,
    });

    const liveMatchData = {
      stadium: matchData.stadium,
      stage: matchData.stage,
      team1: matchData.teams[0],
      team2: matchData.teams[1],
      date: matchDateIST.toFormat("cccc, dd LLL yyyy, hh:mm a"), // Example: "Saturday, 25 May 2025, 10:00 AM"
    };

    return liveMatchData;
  } catch (error) {
    console.error("liveMatchInfo error:", error);
    return { error: error.message || "Failed to fetch live match info" };
  }
};
