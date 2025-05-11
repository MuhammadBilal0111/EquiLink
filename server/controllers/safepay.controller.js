const BaseController = require("../controllers/Base.controller.js");
const safepay = require("../config/safepay.config.js");

class SafepayController extends BaseController {
  createCheckout = async (req, res) => {
    const { amount, currency, projectId } = req.body;
    console.log("Received data:", req.body);
    try {
      const { token } = await safepay.payments.create({
        amount,
        currency,
      });

      const url = safepay.checkout.create({
        token,
        orderId: projectId, // optional if needed
        cancelUrl: `${process.env.CLIENT_URL}/cancel`,
        redirectUrl: `${process.env.CLIENT_URL}/success`,
        source: "custom",
        webhooks: true,
      });

      return this.successResponse(res, { url }, "Checkout URL created");
    } catch (error) {
      console.error("Error during checkout creation:", error);
      return this.errorResponse(res, "Failed to create checkout", 500);
    }
  };

  verifySignature = async (req, res) => {
    try {
      const valid = safepay.verify.signature(req);

      if (valid) {
        return this.successResponse(res, null, "Signature verified");
      } else {
        return this.errorResponse(res, "Invalid signature", 400);
      }
    } catch (error) {
      console.error("Error verifying signature:", error);
      return this.errorResponse(res, "Verification failed", 500);
    }
  };
}

module.exports = new SafepayController();
