import dotenv from "dotenv";
import axios from "axios";
import * as https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

import {
  handleEncodeStringToBase64,
  handleEncodeAuthToBase64,
} from "../utils/hooks.js";

dotenv.config();
const { URL_LINK } = process.env;

const handleReturn = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const handleAuth = (login, password) => {
  return fetch(`${URL_LINK}auth`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: handleEncodeAuthToBase64(login, password),
    },
    body: JSON.stringify({
      Login: login,
      Password: handleEncodeStringToBase64(password),
    }),
  }).then((res) => handleReturn(res));
};

// module.exports = (req, res, next) => {
//   // тут будет вся авторизация
//   // достаём авторизационный заголовок
//   const authorization = req.cookies.jwt;
//   // убеждаемся, что он есть или начинается с Bearer
//   /*   if (!authorization || !authorization.startsWith('Bearer ')) { */
//   if (!authorization) {
//     next(new Unauthorized("Необходима авторизация"));
//   }
//   // извлечём токен
//   /*   const token = authorization.replace('Bearer ', ''); */
//   // const token = req.cookies.jwt;
//   // верифицируем токен
//   let payload;
//   try {
//     // попытаемся верифицировать токен
//     payload = jwt.verify(
//       authorization,
//       NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
//     );
//   } catch (err) {
//     // отправим ошибку, если не получилось
//     next(new Unauthorized("Необходима авторизация"));
//   }
//   req.user = payload; // записываем пейлоуд в объект запроса
//   next(); // пропускаем запрос дальше
// };
