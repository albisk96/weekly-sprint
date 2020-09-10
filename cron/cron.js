var cron = require('node-cron');
const sprintJob = require('./cron-jobs/sprint-job');

cron.schedule("0 0 * * MON", sprintJob.newSprint);
//cron.schedule("30 * * * * *", sprintJob.newSprint);