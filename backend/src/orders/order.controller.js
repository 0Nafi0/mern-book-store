const Order = require("./order.model");
const SSLCommerzPayment = require("sslcommerz-lts");
const User = require("../users/user.model");
require("dotenv").config();

const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
const is_live = false; // true for live, false for sandbox

// Verify environment variables
if (!store_id || !store_passwd) {
  console.error(
    "SSLCommerz credentials are missing. Please check your .env file:"
  );
  console.error("SSLCOMMERZ_STORE_ID:", store_id ? "Present" : "Missing");
  console.error(
    "SSLCOMMERZ_STORE_PASSWORD:",
    store_passwd ? "Present" : "Missing"
  );
}

const createAOrder = async (req, res) => {
  try {
    console.log("Received order data:", req.body);

    // Validate required fields
    const { name, email, phone, address, productIds, totalPrice, orderType } =
      req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !productIds ||
      !totalPrice ||
      !orderType
    ) {
      console.error("Missing required fields:", {
        name: !!name,
        email: !!email,
        phone: !!phone,
        address: !!address,
        productIds: !!productIds,
        totalPrice: !!totalPrice,
        orderType: !!orderType,
      });
      return res.status(400).json({
        message: "Missing required fields",
        details: "Please provide all required order information",
      });
    }

    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();

    const transactionId = `${savedOrder._id}_${Date.now()}`;

    const data = {
      total_amount: savedOrder.totalPrice,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `http://localhost:5000/api/orders/payment/success/${transactionId}`,
      fail_url: `http://localhost:5000/api/orders/payment/fail/${transactionId}`,
      cancel_url: `http://localhost:5000/api/orders/payment/cancel/${transactionId}`,
      ipn_url: "http://localhost:5000/api/orders/payment/ipn",
      shipping_method: "NO",
      product_name: "Books",
      product_category: "Books",
      product_profile: "general",
      cus_name: savedOrder.name,
      cus_email: savedOrder.email,
      cus_add1: savedOrder.address.city,
      cus_add2: savedOrder.address.state,
      cus_city: savedOrder.address.city,
      cus_state: savedOrder.address.state,
      cus_postcode: savedOrder.address.zipcode,
      cus_country: savedOrder.address.country,
      cus_phone: savedOrder.phone,
      ship_name: savedOrder.name,
      ship_add1: savedOrder.address.city,
      ship_add2: savedOrder.address.state,
      ship_city: savedOrder.address.city,
      ship_state: savedOrder.address.state,
      ship_postcode: savedOrder.address.zipcode,
      ship_country: savedOrder.address.country,
    };

    console.log("Initializing SSLCommerz payment with data:", {
      ...data,
      store_id,
      is_live,
    });

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    console.log("SSLCommerz API Response:", apiResponse);

    if (apiResponse?.GatewayPageURL) {
      res.status(200).json({ url: apiResponse.GatewayPageURL });
    } else {
      console.error("Failed to get GatewayPageURL from SSLCommerz");
      res.status(400).json({
        message: "Failed to initialize payment",
        details: apiResponse,
      });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Failed to create order",
      details: error.message,
      stack: error.stack,
    });
  }
};

const handlePaymentSuccess = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const orderId = transactionId.split("_")[0];

    console.log("Processing payment success for order:", orderId);

    const order = await Order.findById(orderId);
    if (!order) {
      console.error("Order not found:", orderId);
      throw new Error("Order not found");
    }

    // Update order payment status
    order.paymentStatus = "completed";
    await order.save();

    console.log("Order updated with payment status:", order);

    // If it's a rental order, update the rental in user's rentals
    if (order.orderType === "rental" && order.rentalDetails) {
      const user = await User.findOne({ email: order.email });

      if (user) {
        console.log("Found user for rental update:", user.email);

        // Find the rental and update its status
        const rental = user.rentals.find(
          (r) => r.book.toString() === order.rentalDetails.bookId.toString()
        );

        if (rental) {
          rental.paymentStatus = "completed";
          rental.rentalStartDate = order.rentalDetails.rentalStartDate;
          rental.rentalEndDate = order.rentalDetails.rentalEndDate;

          await user.save();
          console.log("Updated rental payment status:", rental);
        } else {
          console.log(
            "No matching rental found for book:",
            order.rentalDetails.bookId
          );
        }
      } else {
        console.log("User not found for email:", order.email);
      }
    }

    // Redirect to success page
    res.redirect("http://localhost:5173/payment/success");
  } catch (error) {
    console.error("Payment success handler error:", error);
    res.redirect("http://localhost:5173/payment/error");
  }
};

const handlePaymentFailure = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const orderId = transactionId.split("_")[0];

    await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: "failed" },
      { new: true }
    );

    res.redirect("http://localhost:5173/payment/failed");
  } catch (error) {
    console.error("Error handling payment failure", error);
    res.redirect("http://localhost:5173/payment/error");
  }
};

const handlePaymentCancel = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const orderId = transactionId.split("_")[0];

    await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: "cancelled" },
      { new: true }
    );

    res.redirect("http://localhost:5173/payment/cancelled");
  } catch (error) {
    console.error("Error handling payment cancellation", error);
    res.redirect("http://localhost:5173/payment/error");
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
  handlePaymentSuccess,
  handlePaymentFailure,
  handlePaymentCancel,
};
