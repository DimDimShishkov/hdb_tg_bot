import { Scenes } from "telegraf";
import axios from "axios";
import { emailPattern } from "../utils/constants.js";
import { handleAuth } from "./api.js";

export const contactDataWizard = new Scenes.WizardScene(
  "CONTACT_DATA_WIZARD_SCENE_ID", // first argument is Scene_ID, same as for BaseScene
  (ctx) => {
    ctx.reply("Добрый день! Для начала работы требуется авторизация:");
    ctx.reply("Введите почту:");
    let messageFrom = ctx.message.from;
    ctx.wizard.state.contactData = {
      id: messageFrom.id,
      from: messageFrom.first_name,
    };
    return ctx.wizard.next();
  },
  (ctx) => {
    // validation example
    if (!emailPattern.test(ctx.message.text)) {
      ctx.reply("Неверный формат почты. Попробуйте еще раз");
      return;
    }
    ctx.wizard.state.contactData.Login = ctx.message.text;
    ctx.reply("Введите пароль");
    return ctx.wizard.next();
  },
  // async (ctx) => {
  (ctx) => {
    if (ctx.message.text.length < 2) {
      ctx.reply("Пароль обязателен");
      return;
    }
    ctx.wizard.state.contactData.Password = ctx.message.text;
    // console.log(ctx.wizard.state.contactData.Login);
    handleAuth(
      ctx.wizard.state.contactData.Login,
      ctx.wizard.state.contactData.Password
    ).then((res) => console.log(res));
    // ctx.reply(ctx.wizard.state.contactData);
    // await mySendContactDataMomentBeforeErase(ctx.wizard.state.contactData);
    return ctx.scene.leave();
  }
);
