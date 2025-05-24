import { asyncHandler } from "../utilities/asyncHandler.js";
export const healthController = asyncHandler(async (req, res) => {
  const healthResponse = {
    message: "Service up and running ",
  };

  res.status(200).json(healthResponse);
});
