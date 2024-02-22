const schedule = require("node-schedule");
const axios = require("axios");
const { format } = require("date-fns-tz");
const { addDays } = require("date-fns");
require("dotenv").config();

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

const timeZone = "Asia/Seoul";

const sayGoodMorning = schedule.scheduleJob(
  { hour: 6, minute: 30, tz: timeZone },
  async () => {
    const today = Date.now();
    const formattedToday = format(addDays(today, 1), "yy. MM. dd. (eee)");
    console.log("Good Morning, it's " + formattedToday);
    const response = await axios.post(slackWebhookUrl, {
      text: `<!channel>\n\n${formattedToday}\n굿모닝! :일출:\n1. 시작시간\n2. 종료 시간\n3. 업무 내용`,
    });
    console.log(response.data);
  }
);
