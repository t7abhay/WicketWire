import { seasonIds } from "../configs/seasonIds.js";
import { seasonValidator } from "../utilities/seasonInfoFetcher.js";
import { Match } from "../model/match.model.js";
/**
 * Note hardcoded season id has been utilized due to free nature of this project
 *
 * @type {number}
 * @param {number}seasonYear
 * @return {{object}}
 
 */

/** 

* @reason {every match info in db would have that matches seasonId}


*/
export const matchesInfo = asyncHandler(async (req, res) => {
  const { seasonYear } = req?.body?.seasonYear;

  const seasonId = seasonValidator(seasonYear);

  if (seasonId) {
    const matchesDetails = await Match.findOne(
      {
        id: seasonId,
      },
      {
        _id: 1,
        shortenedUrl: 1,
      }
    );
  }

  /* 
    
    we want match info based on the selected season years



    
    */
});

/**
 * Description placeholder
 *
 * @type {*}
 */
export const playerInfo = asyncHandler(async (req, res) => {});
