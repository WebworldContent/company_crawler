"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = require("node-cron");
const main_1 = require("./main");
// Here we can use PM2 module to keep and track cron job
(0, node_cron_1.schedule)("0 1 * * *", // Runs cron jon every data @ 1:00 AM
() => {
    console.log("Running a job at 01:00 at Asia/Calcutta timezone");
    (0, main_1.crawler)();
}, {
    scheduled: true,
    timezone: "Asia/Calcutta",
});
