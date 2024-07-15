import { schedule } from "node-cron";
import { crawler } from "./main";

// Here we can use PM2 module to keep and track cron job
schedule(
  "0 1 * * *", // Runs cron jon every data @ 1:00 AM
  () => {
    console.log("Running a job at 01:00 at Asia/Calcutta timezone");
    crawler();
  },
  {
    scheduled: true,
    timezone: "Asia/Calcutta",
  }
);
