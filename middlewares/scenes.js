import { Scenes } from "telegraf";
import { emailPattern } from "../utils/constants.js";

export const contactDataWizard = new Scenes.WizardScene(
  "CONTACT_DATA_WIZARD_SCENE_ID", // first argument is Scene_ID, same as for BaseScene
  (ctx) => {
    ctx.reply("Добрый день! Для начала работы требуется авторизация:");
    ctx.reply("Введите почту:");
    ctx.wizard.state.contactData = {};
    return ctx.wizard.next();
  },
  (ctx) => {
    // validation example
    if (ctx.message.text.length < 2) {
      ctx.reply("Неверный формат почты");
      return;
    }
    ctx.wizard.state.contactData.email = ctx.message.text;
    ctx.reply("Введите пароль");
    return ctx.wizard.next();
  },
  // async (ctx) => {
  (ctx) => {
    if (ctx.message.text.length < 2) {
      ctx.reply("Пароль обязателен");
      return;
    }
    ctx.wizard.state.contactData.password = ctx.message.text;
    ctx.reply(ctx.wizard.state.contactData);
    // await mySendContactDataMomentBeforeErase(ctx.wizard.state.contactData);
    return ctx.scene.leave();
  }
);
