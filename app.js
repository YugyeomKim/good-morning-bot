const schedule = require("node-schedule");
const axios = require("axios");
const { format } = require("date-fns-tz");
require("dotenv").config();

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

const timeZone = "Asia/Seoul";

const sayGoodMorning = schedule.scheduleJob(
  { hour: 6, minute: 30, tz: timeZone },
  async () => {
    const today = Date.now();
    const formattedToday = format(today, "yy. MM. dd. (eee)", { timeZone });
    console.log("Good Morning, it's " + formattedToday);
    const response = await axios.post(slackWebhookUrl, {
      blocks: [
        {
          type: "section",
          text: {
            type: "plain_text",
            text: `<!channel>\n\n${formattedToday}\n굿모닝! :일출:\n1. 시작시간\n2. 종료 시간\n3. 업무 내용`,
            emoji: true,
          },
        },
      ],
    });
    console.log(response.data);
  }
);
