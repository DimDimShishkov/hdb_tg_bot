import { Markup } from "telegraf";

export function getMainMenu() {
  return Markup.keyboard([
    ["Мои заявки", "Добавить заявку"],
    // ["Связаться с"],
  ]).resize();
}

export function getAuthMenu() {
  return Markup.keyboard([["Авторизоваться"]]).resize();
}
