import { liveMatchAxiosInstance } from "../configs/axios/liveMatchAxiosInstance.js";
import dotenv from "dotenv";
import { DateTime } from "luxon"; // install with: npm i luxon

dotenv.config();

export const liveMatchInfo = async () => {
  try {
    const { data } = await liveMatchAxiosInstance.get(
      process.env.CURRENT_IPL_ENDPOINT
    );

    let matchData = data?.sports_results?.game_spotlight;
    if (!matchData) return null;

    // Parse "today, 10:00 AM" or "tomorrow, 6:00 PM"
    const [day, timeStr] = matchData.date.split(",").map((str) => str.trim());

    // Get base date
    let baseDate = DateTime.now();
    if (day.toLowerCase() === "tomorrow") {
      baseDate = baseDate.plus({ days: 1 });
    }

    // Combine date and time, assume time is in UTC (or correct as needed)
    const timeParts = DateTime.fromFormat(timeStr, "h:mm a");
    const matchDateTimeUTC = DateTime.fromObject(
      {
        year: baseDate.year,
        month: baseDate.month,
        day: baseDate.day,
        hour: timeParts.hour,
        minute: timeParts.minute,
      },
      { zone: "UTC" }
    ); // Change if source is not UTC

    const matchDateTimeIST = matchDateTimeUTC.setZone("Asia/Kolkata");

    const liveMatchData = {
      stadium: matchData.stadium,
      stage: matchData.stage,
      team1: matchData.teams[0],
      team2: matchData.teams[1],
      date: matchDateTimeIST.toFormat("MMMM d, yyyy 'at' hh:mm a 'IST'"),
    };

    return liveMatchData;
  } catch (error) {
    return error;
  }
};
