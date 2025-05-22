import app from "./app.js";
import { dbInstance } from "./src/configs/database/dbConnection.js";

/**
 * Default Port is fetched via process  & injected by node --watch --env-file=.env
 *
 * @type {number}
 *
 */
const PORT = process.env.SERVER_PORT || 44600;

dbInstance()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
