import puppeteer from "puppeteer";
import $ from "cheerio";
import Cron from "cron";
const CronJOb = Cron.CronJob;
import nodemailer from "nodemailer";

const url =
  "https://www.amazon.in/Talgo-7888007-Analogue-Basics-Men/dp/B084HFRRKM/ref=sr_1_3?crid=3SGM4QUV989IW&dchild=1&keywords=crony+watches+for+men&qid=1613239665&sprefix=cron%2Caps%2C382&sr=8-3";

const targetPrice = 400;

async function configureBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

async function checkPrice(page) {
  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);
  // console.log(html);
  $("#priceblock_ourprice", html).each(function () {
    let price = $(this).text();
    // console.log(price);
    let currentPrice = Number(price.replace(/[^0-9.-]+/g, ""));

    console.log(
      `The current price is ${currentPrice} \nYou can ${
        currentPrice < targetPrice ? "Buy" : "Sell"
      } it!`
    );
  });
}

async function monitor() {
  let page = await configureBrowser();
  await checkPrice(page);
}

monitor();
