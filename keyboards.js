import { Markup } from "telegraf";

export function getMainMenu() {
  return Markup.keyboard([
    ["Мои заявки", "Добавить заявку"],
    // ["Связ"],
  ]).resize();
}
