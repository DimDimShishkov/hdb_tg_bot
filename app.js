import dotenv from "dotenv";
import express from "express";
import { Telegraf } from "telegraf";
import axios from "axios";
import { getAuthMenu, getMainMenu } from "./utils/keyboards.js";
import { handleAuth } from "./middlewares/auth.js";
import sqlite from "sqlite-sync";
import { handleCreateDataBase, handleSearchUserInDB } from "./utils/sqlBase.js";
import { contactDataWizard } from "./middlewares/scenes.js";
import { Scenes, session } from "telegraf";

dotenv.config();

const { PORT, apiKey } = process.env;
const app = express();
const bot = new Telegraf(apiKey || "");

handleCreateDataBase();

const stage = new Scenes.Stage([contactDataWizard]);
bot.use(session()); // to  be precise, session is not a must have for Scenes to work, but it sure is lonely without one
bot.use(stage.middleware());

bot.start((ctx) =>
  handleSearchUserInDB(ctx)
    ? ctx.scene.enter("CONTACT_DATA_WIZARD_SCENE_ID")
    : // ctx.reply(
      //     "Добрый день! Для начала работы требуется авторизация:",
      //     getAuthMenu()
      //   )

      ctx.reply("Добрый день! Чем могу помочь?", getMainMenu())
);

bot.hears("Авторизоваться", (ctx, next) => {
  let email = "";
  let password = "";
  ctx.reply("Введите почту"),
    console.log(1),
    bot.on("message", (ctx) => {
      console.log(1),
        (email = ctx.message.text),
        ctx.reply("Введите пароль"),
        bot.on("message", (ctx) => {
          (password = ctx.message.text), ctx.reply(`${email}:${password}`);
        });
    });
});

bot.command("ethereum", (ctx) => {
  axios
    .get(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
    )
    .then((response) => {
      const message = `Hello, today the ethereum price is ${response.data.ethereum.usd}USD`;
      bot.telegram.sendMessage(ctx.chat.id, message, {});
    });
});

// bot.use((ctx, next) => {
//   console.log(getUserRole(ctx.message));
//   // console.log(ctx.state);
//   // ctx.state.role = getUserRole(ctx.message);
//   return next();
// });

bot.on("text", (ctx) => {
  // return ctx.reply(`Hello ${ctx.state.role}`);
});

bot.on("text", (ctx) => {
  if (ctx.update.message.from.is_bot) return;
  // handleAuth(ctx.update.message.text);
  // ctx.replyWithHTML(
  //   `Вы действительно хотите добавить задачу:\n\n` +
  //     `<i>${ctx.message.text}</i>`,
  //   handleAuth(ctx.message.text)
  // );
});

bot.on("text", (ctx) => {
  ctx.reply("just text");
});

bot.launch();
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`));
