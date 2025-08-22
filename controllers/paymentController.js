/**
 * Payment Controller
 * 
 * This controller handles all payment-related operations including
 * payment processing, management, and payment-specific operations.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { Payment, User, Tournament, Club } = require('../db/models');
const { createError } = require('../middlewares/errorHandler');
const { API_MESSAGES, HTTP_STATUS, PAYMENT_STATUS, PAGINATION } = require('../config/constants');
const logger = require('../config/logger');

// Import Stripe service (to be created)
// const stripeService = require('../services/stripeService');

/**
 * Get paginated list of payments
 * @route GET /api/v1/payments
 * @access Private (User/Admin)
 */
const getPayments = async (req, res) => {
  try {
    const {
      page = 1,
      limit = PAGINATION.DEFAULT_LIMIT,
      payment_type,
      status,
      user_id,
      start_date,
      end_date
    } = req.query;

    const { user } = req;

    // Build where clause
    const whereClause = {};
    
    // Regular users can only see their own payments
    if (!['admin', 'super_admin'].includes(user.role)) {
      whereClause.user_id = user.id;
    }
    
    if (payment_type && payment_type !== 'undefined' && payment_type !== 'null') {
      whereClause.payment_type = payment_type;
    }
    
    if (status && status !== 'undefined' && status !== 'null') {
      whereClause.status = status;
    }
    
    if (user_id && user_id !== 'undefined' && user_id !== 'null' && ['admin', 'super_admin'].includes(user.role)) {
      whereClause.user_id = user_id;
    }
    
    if (start_date && end_date) {
      whereClause.created_at = {
        [sequelize.Op.between]: [new Date(start_date), new Date(end_date)]
      };
    }

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get payments with pagination
    const { count, rows: payments } = await Payment.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        }
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.PAYMENTS_RETRIEVED,
      data: payments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: totalPages
      }
    });
  } catch (error) {
    logger.error('Error in getPayments:', error);
    throw createError.server('Failed to retrieve payments');
  }
};

/**
 * Get specific payment by ID
 * @route GET /api/v1/payments/:id
 * @access Private (User/Admin)
 */
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const payment = await Payment.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'full_name', 'email']
        }
      ]
    });

    if (!payment) {
      throw createError.notFound('Payment not found');
    }

    // Check if user can access this payment
    if (payment.user_id !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.PAYMENT_RETRIEVED,
      data: { payment }
    });
  } catch (error) {
    logger.error('Error in getPaymentById:', error);
    throw error;
  }
};

/**
 * Create new payment
 * @route POST /api/v1/payments
 * @access Private
 */
const createPayment = async (req, res) => {
  try {
    const { user } = req;
    const paymentData = req.body;

    // Validate payment data
    if (!paymentData.amount || !paymentData.payment_type) {
      throw createError.badRequest('Amount and payment type are required');
    }

    // Create payment record
    const payment = await Payment.create({
      ...paymentData,
      user_id: user.id,
      status: PAYMENT_STATUS.PENDING
    });

    // Get created payment with user info
    const createdPayment = await Payment.findByPk(payment.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        }
      ]
    });

    res.status(HTTP_STATUS.CREATED).json(createdPayment);
  } catch (error) {
    logger.error('Error in createPayment:', error);
    throw error;
  }
};

/**
 * Process payment with Stripe
 * @route POST /api/v1/payments/:id/process
 * @access Private
 */
const processPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { payment_method_id, billing_address } = req.body;

    const payment = await Payment.findByPk(id);
    if (!payment) {
      throw createError.notFound('Payment not found');
    }

    // Check if user owns this payment
    if (payment.user_id !== user.id) {
      throw createError.forbidden('Access denied');
    }

    // Check if payment is already processed
    if (payment.status !== PAYMENT_STATUS.PENDING) {
      throw createError.badRequest('Payment is already processed');
    }

    // TODO: Implement Stripe payment processing
    // const stripeResult = await stripeService.processPayment({
    //   amount: payment.amount,
    //   currency: payment.currency,
    //   payment_method_id,
    //   description: payment.description,
    //   metadata: {
    //     payment_id: payment.id,
    //     user_id: user.id,
    //     payment_type: payment.payment_type
    //   }
    // });

    // For now, simulate successful payment
    const stripeResult = {
      payment_intent_id: 'pi_temp_' + Date.now(),
      charge_id: 'ch_temp_' + Date.now(),
      status: 'succeeded'
    };

    // Update payment with Stripe information
    await payment.update({
      status: PAYMENT_STATUS.COMPLETED,
      stripe_payment_intent_id: stripeResult.payment_intent_id,
      stripe_charge_id: stripeResult.charge_id,
      processed_at: new Date(),
      billing_address: billing_address
    });

    // Get updated payment
    const updatedPayment = await Payment.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        }
      ]
    });

    res.status(HTTP_STATUS.OK).json(updatedPayment);
  } catch (error) {
    logger.error('Error in processPayment:', error);
    throw error;
  }
};

/**
 * Refund payment
 * @route POST /api/v1/payments/:id/refund
 * @access Private (Admin)
 */
const refundPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { refund_amount, refund_reason } = req.body;

    const payment = await Payment.findByPk(id);
    if (!payment) {
      throw createError.notFound('Payment not found');
    }

    // Check if payment can be refunded
    if (!payment.canRefund()) {
      throw createError.badRequest('Payment cannot be refunded');
    }

    // TODO: Implement Stripe refund
    // const stripeResult = await stripeService.refundPayment({
    //   charge_id: payment.stripe_charge_id,
    //   amount: refund_amount || payment.amount,
    //   reason: refund_reason
    // });

    // For now, simulate successful refund
    const stripeResult = {
      refund_id: 're_temp_' + Date.now(),
      status: 'succeeded'
    };

    // Update payment with refund information
    await payment.update({
      status: PAYMENT_STATUS.REFUNDED,
      refund_amount: refund_amount || payment.amount,
      refund_reason: refund_reason,
      refunded_at: new Date()
    });

    // Get updated payment
    const updatedPayment = await Payment.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'first_name', 'last_name', 'full_name']
        }
      ]
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.PAYMENT_REFUNDED,
      data: { payment: updatedPayment }
    });
  } catch (error) {
    logger.error('Error in refundPayment:', error);
    throw error;
  }
};

/**
 * Stripe webhook endpoint
 * @route POST /api/v1/payments/webhook/stripe
 * @access Public
 */
const stripeWebhook = async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // TODO: Implement Stripe webhook verification and processing
    // const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    // Handle different event types
    // switch (event.type) {
    //   case 'payment_intent.succeeded':
    //     await handlePaymentSuccess(event.data.object);
    //     break;
    //   case 'payment_intent.payment_failed':
    //     await handlePaymentFailure(event.data.object);
    //     break;
    //   case 'charge.refunded':
    //     await handlePaymentRefund(event.data.object);
    //     break;
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Webhook received'
    });
  } catch (error) {
    logger.error('Error in stripeWebhook:', error);
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: 'Webhook error'
    });
  }
};

/**
 * Get payment statistics
 * @route GET /api/v1/payments/stats
 * @access Private (Admin)
 */
const getPaymentStats = async (req, res) => {
  try {
    const { user } = req;

    // Check if user is admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    // Get payment statistics
    const totalPayments = await Payment.count();
    const successfulPayments = await Payment.count({
      where: { status: PAYMENT_STATUS.COMPLETED }
    });
    const pendingPayments = await Payment.count({
      where: { status: PAYMENT_STATUS.PENDING }
    });
    const failedPayments = await Payment.count({
      where: { status: PAYMENT_STATUS.FAILED }
    });

    // Calculate total revenue
    const revenueResult = await Payment.findOne({
      where: { status: PAYMENT_STATUS.COMPLETED },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'total_revenue']
      ]
    });

    const totalRevenue = parseFloat(revenueResult?.dataValues?.total_revenue || 0);

    const stats = {
      total_payments: totalPayments,
      successful_payments: successfulPayments,
      pending_payments: pendingPayments,
      failed_payments: failedPayments,
      success_rate: totalPayments > 0 ? (successfulPayments / totalPayments) * 100 : 0,
      total_revenue: totalRevenue
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.PAYMENT_STATS_RETRIEVED,
      data: { stats }
    });
  } catch (error) {
    logger.error('Error in getPaymentStats:', error);
    throw error;
  }
};

/**
 * Get user payment history
 * @route GET /api/v1/payments/user/:userId
 * @access Private (User/Admin)
 */
const getUserPaymentHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { user } = req;
    const { page = 1, limit = 20 } = req.query;

    // Check if user can access this payment history
    if (userId !== user.id && !['admin', 'super_admin'].includes(user.role)) {
      throw createError.forbidden('Access denied');
    }

    const offset = (page - 1) * limit;

    const { count, rows: payments } = await Payment.findAndCountAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.SUCCESS.USER_PAYMENT_HISTORY_RETRIEVED,
      data: {
        payments,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    logger.error('Error in getUserPaymentHistory:', error);
    throw error;
  }
};

/**
 * Create invoice for payment
 * @route POST /api/v1/payments/invoice
 * @access Private
 */
const createInvoice = async (req, res) => {
  try {
    const { user } = req;
    const {
      tournament_id,
      club_id,
      amount,
      description,
      due_date
    } = req.body;

    // Validate that either tournament_id or club_id is provided
    if (!tournament_id && !club_id) {
      throw createError.badRequest('Either tournament_id or club_id must be provided');
    }

    // Create payment record as invoice
    const payment = await Payment.create({
      user_id: user.id,
      tournament_id,
      club_id,
      amount,
      payment_type: tournament_id ? 'tournament_registration' : 'club_expense',
      status: 'pending',
      payment_method: 'invoice',
      description,
      due_date: due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      invoice_number: `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      created_by: user.id
    });

    // Get created payment with related data
    const createdPayment = await Payment.findByPk(payment.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'full_name', 'email']
        },
        {
          model: Tournament,
          as: 'tournament',
          attributes: ['id', 'name', 'tournament_type']
        },
        {
          model: Club,
          as: 'club', 
          attributes: ['id', 'name', 'club_type']
        }
      ]
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Invoice created successfully',
      data: { 
        payment: createdPayment,
        invoice: {
          invoice_number: payment.invoice_number,
          amount: payment.amount,
          due_date: payment.due_date,
          status: payment.status
        }
      }
    });
  } catch (error) {
    logger.error('Error in createInvoice:', error);
    throw error;
  }
};

module.exports = {
  getPayments,
  getPaymentById,
  createPayment,
  processPayment,
  refundPayment,
  stripeWebhook,
  getPaymentStats,
  getUserPaymentHistory,
  createInvoice
}; 