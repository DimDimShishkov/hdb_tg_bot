import dotenv from "dotenv";
import express from "express";
import { Telegraf } from "telegraf";
import { getMainMenu } from "./keyboards.js";

dotenv.config();
const { PORT, apiKey } = process.env;
const app = express();
const bot = new Telegraf(apiKey);

bot.start((ctx) => {
  ctx.reply(
    "Добрый день! Для начала работы, требуется авторизация:",
    getMainMenu()
  );
});

// bot.on("text", (ctx) => {
//   ctx.reply("just text");
// });

bot.launch();
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`));
