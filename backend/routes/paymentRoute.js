import express from 'express'
import { RazorpayOrder, RazorpayPaymentVerification } from '../controllers/OrderController.js';

const paymentRouter = express.Router();

paymentRouter.post('/razorpay-order', RazorpayOrder);
paymentRouter.post('/payment-verification', RazorpayPaymentVerification);

export default paymentRouter;
