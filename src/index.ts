import { Telegraf, Markup, Types } from 'telegraf';
import { User } from '@telegraf/types'

let users: Map<number, User> = new Map();


const bot = new Telegraf(process.env.BOT_TOKEN || '');

// Команда /start и кнопки
bot.start((ctx) => {
  const welcomeMessage = 'Wanna some Defence of the Ancients?';
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Online', 'online'),
    Markup.button.callback('Offline', 'offline'),
    Markup.button.callback('Dota', 'dota'),
  ]);

  ctx.reply(welcomeMessage, keyboard);
});

// Обработчики для кнопок
bot.action('online', (ctx) => {
  const userId = ctx.from?.id;
  if (userId) users.set(userId, ctx.from);
});

bot.action('offline', (ctx) => {
  const userId = ctx.from?.id;
  if (userId) users.delete(userId);
});

bot.action('dota', (ctx) => {
  const onlineUsers = Array.from(users.values()).map(({ username }) => `@${username}`).join(' ');
  if (onlineUsers) ctx.reply(`Dota: ${onlineUsers}`);
});

// Запуск бота
bot.launch().then(() => {
  console.log('Бот запущен');
});
