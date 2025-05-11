const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/safepay.controller");
const { safepayWebhook } = require("../webhooks/safepay.webhook");

router.post("/checkout", paymentController.createCheckout);
router.post("/webhook", safepayWebhook);

module.exports = router;
