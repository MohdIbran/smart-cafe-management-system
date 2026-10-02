const paymentModel = require("../models/billing_payment_model");
const orderModel = require("../models/order_models");

async function paymentFunction(req, res) {
  try {
    const orderId = req.params.id;
    const { paymentMethod, paymentStatus } = req.body;

    if (!orderId) {
      return res.status(404).json({
        message: "the order id not founded",
      });
    }

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(400).json({
        message: "the order not founded",
      });
    }

    // Create payment record
    const data = await paymentModel.create({
      order: order._id,
      subtotal: order.billing.subtotal,
      tax: order.billing.tax,
      discount: order.billing.discount,
      totalAmount: order.billing.totalAmount,
      paymentMethod: paymentMethod,
      paymentStatus: paymentStatus,
    });

    // Update payment inside order
    order.payment = {
      paymentMethod: paymentMethod,
      paymentStatus: paymentStatus,
    };

    await order.save();

    res.status(200).json({
      message: `the transaction is ${paymentStatus}`,
      payment: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "this is a server error",
      error: error.message,
    });
  }
}


async function updatePayment(req, res) {
  try {
    const paymentId = req.params.id;

    if (!paymentId) {
      return res.status(404).json({
        message: "the payment id not found",
      });
    }

    const payment = await paymentModel.findById(paymentId);

    if (!payment) {
      return res.status(400).json({
        message: "payment details not found",
      });
    }

    // Pending cash payment ko approve karna
    if (
      payment.paymentMethod === "cash" &&
      payment.paymentStatus === "pending"
    ) {
      payment.paymentStatus = "success";

      await payment.save();

      // Related order ko bhi update karna
      const order = await orderModel.findById(payment.order);

      if (order) {
        order.payment = {
          paymentMethod: payment.paymentMethod,
          paymentStatus: payment.paymentStatus,
        };

        await order.save();
      }

      return res.status(200).json({
        message: "Cash payment approved successfully",
        payment,
      });
    }

    // Card / UPI already successful
    if (
      (payment.paymentMethod === "card" ||
        payment.paymentMethod === "upi") &&
      payment.paymentStatus === "success"
    ) {
      return res.status(200).json({
        message: "Payment is already successfully verified",
        payment,
      });
    }

    return res.status(400).json({
      message: "Payment cannot be approved",
    });
  } catch (error) {
    return res.status(500).json({
      message: "this is server error",
      error: error.message,
    });
  }
}
async function getAllPayments(req, res) {
  try {
    const payments = await paymentModel
      .find()
      .populate("order");

    res.status(200).json({
      message: "all payment details",
      payments,
    });

  } catch (error) {
    res.status(500).json({
      message: "this is a server error",
      error: error.message,
    });
  }
}


module.exports = {
  paymentFunction,
  updatePayment,
  getAllPayments
  
};