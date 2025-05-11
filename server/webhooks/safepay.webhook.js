const BaseController = require("../controllers/Base.controller");
const safepay = require("../config/safepay.config");

class PaymentController extends BaseController {
  safepayWebhook = async (req, res) => {
    const isValid = safepay.verify.webhook(req);
    if (!isValid) {
      return this.errorResponse(res, "Webhook not verified", 401);
    }

    const event = req.body;
    console.log("Received webhook event:", event);

    // ✅ Handle specific events
    if (event.data.type === "payment:created") {
      console.dir(event, { depth: null, colors: true });

      //   data: {
      //     token: 'D0GGIFEJU7G0LED1N0JG',
      //     client_id: 'sec_492f44b5-52ab-4a7b-ad5e-029544545540',
      //     type: 'payment:created',
      //     endpoint: 'https://1d6a-175-107-247-14.ngrok-free.app/api/orders/payments/webhook',
      //     notification: {
      //       tracker: 'track_d64e676f-00b3-4f3a-8b64-8676b74dafca',
      //       reference: '141854',
      //       intent: 'CYBERSOURCE',
      //       fee: '32.77',
      //       net: '967.23',
      //       user: 'm.bilal0111@gmail.com',
      //       state: 'PAID',
      //       amount: '1000.00',
      //       currency: 'PKR',
      //       metadata: { order_id: '189', source: 'custom' }
      //     },
      //     delivery_attempts: 1,
      //     resource: 'notification',
      //     next_attempt_at: '2025-05-11T20:31:57Z',
      //     created_at: '2025-05-11T20:31:57Z'
      //   }
      // }

      // TODO: Take the state which is PAID but insert the data in state as status:PAIDOUT in db, orderId is basically the projectId so use it to find id of project or startup from db
      // remove the output object data
      {
        // Write the api code to handle the payment creation event in db here
      }
    }

    return this.successResponse(res, null, "Webhook received");
  };
}

module.exports = new PaymentController();
