import { Match } from "../model/match.model.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import { liveMatchInfo } from "../utilities/liveMatchInfo.js";
/**
 * @type {number}
 * @param {number}seasonYear
 * @return {object}
 * @reason {every matchinfo document in db has season attribute which matches against  seasonYear}
 */
export const matchesInfo = asyncHandler(async (req, res) => {
  const seasonYear = req?.query?.seasonYear ?? 2025;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let matchesDetails;
  let total;
  const currentYear = new Date().getFullYear();

  if (String(seasonYear) < 2008 || String(seasonYear) > currentYear) {
    return res
      .status(400)
      .json(
        new ApiError(400, "Invalid IPL Season Year", ["season year error"], "")
      );
  }
  const seasonStr = String(seasonYear);

  if (seasonYear) {
    matchesDetails = await Match.find({ season: seasonStr })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });
    total = await Match.countDocuments({ season: seasonStr });
  }

  if (!matchesDetails || matchesDetails.length === 0) {
    return res
      .status(404)
      .json(new ApiError(404, "Failed to fetch match data"));
  }

  const data = {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: matchesDetails,
  };
  return res.status(200).json(new ApiResponse(200, data, "Match data fetched"));
});

export const liveMatchDetails = asyncHandler(async (req, res) => {
  let liveMatch = await liveMatchInfo();

  if (!liveMatch) {
    return res
      .status(404)
      .json(new ApiError(404, "Live match data not found", null, null));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, liveMatch, "Live match info fetched"));
});
