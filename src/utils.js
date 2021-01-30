import { adjectives, nouns } from "./words";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

// export const sendMail = (email) => {
//   const options = {
//     auth: {
//       api_user: process.env.SENDGRID_USERNAME,
//       api_key: process.env.SENDGRID_PASSWORD,
//     },
//   };
// };
// export const sendSecretMail = (adress, secret) => {
//   const email = {
//     from: "hero@naver.com",
//     to: adress,
//     subject: "Login Secret for Prismagram 🔒",
//     html: `Hello! Your login secret is ${secret}.<br/>Copy paste on the app/website for login.`,
//   };
// };

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
