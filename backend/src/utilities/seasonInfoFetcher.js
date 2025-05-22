import { seasonIds } from "../configs/database/seasonIds";

const isValidSeason = (seasonYear) => {
  const seasonValidity = seasonIds.some((season) => season.year == seasonYear);
  return seasonValidity;
};

export const getSeasonId = (seasonYear) => {
  if (isValidSeason(seasonYear)) {
    const seasonInfo = seasonIds.find((entry) => entry.year == seasonYear);

    return seasonInfo;
  } else {
    const defaultLatestSeason = seasonIds.find((entry) => entry.year == "2025");
    return defaultLatestSeason;
  }
};
