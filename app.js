const schedule = require("node-schedule");
const axios = require("axios");
const { format } = require("date-fns");
require("dotenv").config();

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

const sayGoodMorning = schedule.scheduleJob(
  { hour: 6, minute: 30 },
  async () => {
    const today = Date.now();
    const formattedToday = format(today, "yy. MM. dd. (eee)");
    console.log("Good Morning, it's " + formattedToday);
    const response = await axios.post(slackWebhookUrl, {
      text: `@channel ${formattedToday}\n1. 시작시간\n2. 종료 시간\n3.업무 내용`,
    });
    console.log(response);
  }
);
