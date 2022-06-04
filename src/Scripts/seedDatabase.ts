import * as dotenv from "dotenv";
import { connectDatabase } from "@helpers/Database.helper";
import { runSeedDatabase } from "../helpers/Seed.helper";

dotenv.config();

connectDatabase().then(async () => {
  await runSeedDatabase();

  process.exit(0);
});