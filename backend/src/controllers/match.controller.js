import { Match } from "../model/match.model.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
/**
 * Note hardcoded season id has been utilized due to free nature of this project
 *
 * @type {number}
 * @param {number}seasonYear
 * @return {{object}}
 
 */

/** 

* @reason {every match info in db would have that matches seasonYear}


*/
export const matchesInfo = asyncHandler(async (req, res) => {
  const seasonYear = req?.query?.seasonYear ?? 2025;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  console.log(seasonYear, page, limit, skip);

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

  if (seasonYear) {
    matchesDetails = await Match.find({ season: String(seasonYear) })
      .skip(skip)
      .limit(limit);
    total = await Match.countDocuments({ season: String(seasonYear) });
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

export const liveMatchInfo = asyncHandler(async (req, res) => {});
