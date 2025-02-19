require('dotenv').config();
const fetch = require('node-fetch');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_BOT_API_KEY);


bot.start((ctx) => {
  ctx.reply("Welcome! Choose an option:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "About", url: "https://weblearnerprosite.blogspot.com/p/about-weblearner-pro.html" }],
        [{ text: "Contact", url: "https://weblearnerprosite.blogspot.com/p/contact-us.html" }],
        [{ text: "Signal", callback_data: 'signal' }],
        [{ text: "Services", url: "https://wa.me/8801306654467" }],
        [{ text: "Privacy Policy", url: "https://weblearnerprosite.blogspot.com/p/privacy-policy.html" }]
      ]
    }
  });
});


bot.action('signal', (ctx) => {
  ctx.reply("Choose a market:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Forex", callback_data: 'forex' }],
        [{ text: "Crypto", callback_data: 'crypto' }],
        [{ text: "Stock", callback_data: 'stock' }],
        [{ text: "Back to main menu", callback_data: 'back' }]
      ]
    }
  });
});

bot.action(['forex', 'crypto', 'stock'], async (ctx) => {
  let selectedMarket = ctx.callbackQuery.data;
  let marketData;
  
  if (selectedMarket === 'forex') {
    marketData = await getForexData();
  } else if (selectedMarket === 'crypto') {
    marketData = await getCryptoData();
  } else if (selectedMarket === 'stock') {
    marketData = await getStockData();
  }
  
  ctx.reply(`Market data for ${selectedMarket}:\n${marketData}`);
});


async function getForexData() {
  
  return "Forex market data: EUR/USD: 1.18, GBP/USD: 1.36";
}

// ক্রিপ্টো মার্কেট ডেটা
async function getCryptoData() {
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT`;
  const response = await fetch(url);
  const data = await response.json();
  return `Crypto market data: BTC/USDT: ${data.price}`;
}

// স্টক মার্কেট ডেটা
async function getStockData() {
  
  return "Stock market data: AAPL: 150.00, TSLA: 650.00";
}

// মেনুতে ফিরে আসা
bot.action('back', (ctx) => {
  ctx.reply("Welcome back! Choose an option:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "About", url: "https://weblearnerprosite.blogspot.com/p/about-weblearner-pro.html" }],
        [{ text: "Contact", url: "https://weblearnerprosite.blogspot.com/p/contact-us.html" }],
        [{ text: "Signal", callback_data: 'signal' }],
        [{ text: "Services", url: "https://wa.me/8801306654467" }],
        [{ text: "Privacy Policy", url: "https://weblearnerprosite.blogspot.com/p/privacy-policy.html" }]
      ]
    }
  });
});

// বট চালু করা
bot.launch();