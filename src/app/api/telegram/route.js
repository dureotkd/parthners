import { NextResponse } from "next/server";

const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 01~12
  const day = String(now.getDate()).padStart(2, "0"); // 01~31
  const hours = String(now.getHours()).padStart(2, "0"); // 00~23
  const minutes = String(now.getMinutes()).padStart(2, "0"); // 00~59
  const seconds = String(now.getSeconds()).padStart(2, "0"); // 00~59

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot("7751683087:AAHMciY_32CuKUuiuuqVnKS0stZK7B5xAoM", {
  polling: false,
});

export async function POST(req, res) {
  const data = await req.json(); // ✅ 클라이언트에서 받은 메시지 파싱
  const { name, phone, use_spot } = data;

  console.log(data);

  const nowDate = getCurrentTime();
  const message = [
    "🔔신규 문의 도착🔔",
    ``,
    `📆일시 : ${nowDate}`,
    `🧑이름 : ${name}`,
    `연락처 : ${phone}`,
    `🏠거래소 : ${use_spot}`,
  ];

  try {
    const chatId = "-4662485733";
    await bot.sendMessage(chatId, message.join("\n"));
  } catch (error) {}

  return NextResponse.json({ success: true, error: "" }, { status: 200 });
}
