const { Safepay } = require("@sfpy/node-sdk");

const safepay = new Safepay({
  environment: "sandbox",
  apiKey: process.env.SAFEPAY_PUBLIC_KEY,
  v1Secret: process.env.SAFEPAY_SECRET_KEY,
  webhookSecret: process.env.SAFEPAY_WEBHOOK_SECRET_KEY,
});
module.exports = safepay;
