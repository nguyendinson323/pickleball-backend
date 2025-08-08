/**
 * Email Service
 * 
 * This service handles all email communications using SendGrid.
 * It includes templates for various types of emails sent by the application.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const sgMail = require('@sendgrid/mail');
const logger = require('../config/logger');

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Email templates
 */
const emailTemplates = {
  welcome: (data) => ({
    subject: 'Welcome to Pickleball Federation!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
          <h1>Welcome to Pickleball Federation!</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hello ${data.full_name || data.username},</h2>
          <p>Welcome to the Pickleball Federation! We're excited to have you join our community.</p>
          <p>Your account has been successfully created. To get started:</p>
          <ul>
            <li>Complete your profile</li>
            <li>Explore tournaments and clubs in your area</li>
            <li>Connect with other players</li>
          </ul>
          <p>If you have any questions, feel free to contact our support team.</p>
          <p>Best regards,<br>The Pickleball Federation Team</p>
        </div>
      </div>
    `
  }),

  emailVerification: (data) => ({
    subject: 'Verify Your Email - Pickleball Federation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2196F3; color: white; padding: 20px; text-align: center;">
          <h1>Verify Your Email</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hello ${data.username},</h2>
          <p>Thank you for registering with Pickleball Federation! Please verify your email address to complete your registration.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.verificationUrl}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${data.verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br>The Pickleball Federation Team</p>
        </div>
      </div>
    `
  }),

  verification: (data) => ({
    subject: 'Verify Your Email - Pickleball Federation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2196F3; color: white; padding: 20px; text-align: center;">
          <h1>Verify Your Email</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hello ${data.full_name || data.username},</h2>
          <p>Thank you for registering with Pickleball Federation! Please verify your email address to complete your registration.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.verificationUrl}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${data.verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br>The Pickleball Federation Team</p>
        </div>
      </div>
    `
  }),

  passwordReset: (data) => ({
    subject: 'Reset Your Password - Pickleball Federation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #FF9800; color: white; padding: 20px; text-align: center;">
          <h1>Reset Your Password</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hello ${data.username},</h2>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${data.resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
          <p>Best regards,<br>The Pickleball Federation Team</p>
        </div>
      </div>
    `
  }),

  password_reset: (data) => ({
    subject: 'Reset Your Password - Pickleball Federation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #FF9800; color: white; padding: 20px; text-align: center;">
          <h1>Reset Your Password</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hello ${data.full_name || data.username},</h2>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${data.resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
          <p>Best regards,<br>The Pickleball Federation Team</p>
        </div>
      </div>
    `
  }),

  tournament_registration: (data) => ({
    subject: `Tournament Registration Confirmation - ${data.tournamentName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
          <h1>Tournament Registration Confirmed</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hello ${data.full_name || data.username},</h2>
          <p>Your registration for <strong>${data.tournamentName}</strong> has been confirmed!</p>
          <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Tournament Details:</h3>
            <p><strong>Date:</strong> ${data.tournamentDate}</p>
            <p><strong>Venue:</strong> ${data.venue}</p>
            <p><strong>Category:</strong> ${data.category}</p>
            <p><strong>Registration Fee:</strong> $${data.fee}</p>
          </div>
          <p>Please arrive at least 30 minutes before your scheduled match time.</p>
          <p>Good luck!</p>
          <p>Best regards,<br>The Pickleball Federation Team</p>
        </div>
      </div>
    `
  }),

  payment_confirmation: (data) => ({
    subject: 'Payment Confirmation - Pickleball Federation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
          <h1>Payment Confirmed</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hello ${data.full_name || data.username},</h2>
          <p>Your payment has been successfully processed!</p>
          <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Payment Details:</h3>
            <p><strong>Amount:</strong> $${data.amount}</p>
            <p><strong>Description:</strong> ${data.description}</p>
            <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
            <p><strong>Date:</strong> ${data.date}</p>
          </div>
          <p>Thank you for your payment!</p>
          <p>Best regards,<br>The Pickleball Federation Team</p>
        </div>
      </div>
    `
  }),

  membership_renewal: (data) => ({
    subject: 'Membership Renewal Reminder - Pickleball Federation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #FF9800; color: white; padding: 20px; text-align: center;">
          <h1>Membership Renewal Reminder</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hello ${data.full_name || data.username},</h2>
          <p>Your Pickleball Federation membership will expire on <strong>${data.expiryDate}</strong>.</p>
          <p>To continue enjoying all the benefits of membership, please renew before the expiration date.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.renewalUrl}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Renew Membership
            </a>
          </div>
          <p>If you have any questions about your membership, please contact our support team.</p>
          <p>Best regards,<br>The Pickleball Federation Team</p>
        </div>
      </div>
    `
  }),

  tournament_update: (data) => ({
    subject: `Tournament Update - ${data.tournamentName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2196F3; color: white; padding: 20px; text-align: center;">
          <h1>Tournament Update</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hello ${data.full_name || data.username},</h2>
          <p>There has been an update to <strong>${data.tournamentName}</strong>:</p>
          <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Update Details:</h3>
            <p><strong>Type:</strong> ${data.updateType}</p>
            <p><strong>Description:</strong> ${data.description}</p>
            ${data.newTime ? `<p><strong>New Time:</strong> ${data.newTime}</p>` : ''}
            ${data.newVenue ? `<p><strong>New Venue:</strong> ${data.newVenue}</p>` : ''}
          </div>
          <p>Please check the tournament page for the latest information.</p>
          <p>Best regards,<br>The Pickleball Federation Team</p>
        </div>
      </div>
    `
  }),

  player_match_request: (data) => ({
    subject: 'New Match Request - Pickleball Federation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #9C27B0; color: white; padding: 20px; text-align: center;">
          <h1>New Match Request</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hello ${data.full_name || data.username},</h2>
          <p>You have received a match request from <strong>${data.senderName}</strong>!</p>
          <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Match Details:</h3>
            <p><strong>Date:</strong> ${data.matchDate}</p>
            <p><strong>Time:</strong> ${data.matchTime}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Skill Level:</strong> ${data.skillLevel}</p>
            <p><strong>Message:</strong> ${data.message}</p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.acceptUrl}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-right: 10px;">
              Accept Request
            </a>
            <a href="${data.declineUrl}" style="background-color: #f44336; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Decline Request
            </a>
          </div>
          <p>Best regards,<br>The Pickleball Federation Team</p>
        </div>
      </div>
    `
  }),

  system_notification: (data) => ({
    subject: `${data.title} - Pickleball Federation`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2196F3; color: white; padding: 20px; text-align: center;">
          <h1>System Notification</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hello ${data.full_name || data.username},</h2>
          <p>You have received a system notification from Pickleball Federation:</p>
          <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>${data.title}</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
            ${data.priority === 'urgent' ? '<p style="color: #f44336; font-weight: bold;">⚠️ This is an urgent notification</p>' : ''}
          </div>
          <p>Please log in to your account to view more details.</p>
          <p>Best regards,<br>The Pickleball Federation Team</p>
        </div>
      </div>
    `
  })
};

/**
 * Send email using SendGrid
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.template - Template name
 * @param {Object} options.data - Template data
 * @param {string} options.subject - Custom subject (optional)
 * @param {string} options.html - Custom HTML (optional)
 * @returns {Promise} SendGrid response
 */
const sendEmail = async (options) => {
  try {
    const { to, template, data, subject, html } = options;

    // Validate required fields
    if (!to) {
      throw new Error('Recipient email is required');
    }

    if (!template && !subject && !html) {
      throw new Error('Template name or custom content is required');
    }

    // Prepare email content
    let emailContent = {};

    if (template && emailTemplates[template]) {
      emailContent = emailTemplates[template](data);
    } else if (subject && html) {
      emailContent = { subject, html };
    } else {
      throw new Error(`Template '${template}' not found`);
    }

    console.log("kkkkkkkkkk");
    
    // Prepare SendGrid message
    const msg = {
      to: to,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: process.env.SENDGRID_FROM_NAME
      },
      subject: emailContent.subject,
      html: emailContent.html
    };

    // Send email
    const response = await sgMail.send(msg);

    logger.info(`Email sent successfully to ${to}`, {
      template,
      messageId: response[0]?.headers['x-message-id']
    });

    return response;

  } catch (error) {
    // logger.error('Failed to send email:', error);
    throw error;
  }
};

/**
 * Send bulk emails
 * @param {Array} recipients - Array of recipient objects
 * @param {string} template - Template name
 * @param {Object} data - Template data
 * @returns {Promise} SendGrid response
 */
const sendBulkEmail = async (recipients, template, data) => {
  try {
    if (!Array.isArray(recipients) || recipients.length === 0) {
      throw new Error('Recipients array is required and cannot be empty');
    }

    if (!template || !emailTemplates[template]) {
      throw new Error(`Template '${template}' not found`);
    }

    const emailContent = emailTemplates[template](data);

    // Prepare messages for bulk send
    const messages = recipients.map(recipient => ({
      to: recipient.email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: process.env.SENDGRID_FROM_NAME
      },
      subject: emailContent.subject,
      html: emailContent.html.replace(/\${data\.(full_name|username)}/g, recipient.full_name || recipient.username || 'there')
    }));

    // Send emails in batches (SendGrid allows max 1000 per request)
    const batchSize = 1000;
    const results = [];

    for (let i = 0; i < messages.length; i += batchSize) {
      const batch = messages.slice(i, i + batchSize);
      const response = await sgMail.sendMultiple(batch);
      results.push(response);
    }

    logger.info(`Bulk email sent successfully to ${recipients.length} recipients`, {
      template,
      batchCount: results.length
    });

    return results;

  } catch (error) {
    logger.error('Failed to send bulk email:', error);
    throw error;
  }
};

/**
 * Test email service
 * @param {string} testEmail - Test email address
 * @returns {Promise} Test result
 */
const testEmailService = async (testEmail) => {
  try {
    await sendEmail({
      to: testEmail,
      template: 'welcome',
      data: {
        full_name: 'Test User',
        username: 'testuser'
      }
    });

    return { success: true, message: 'Email service is working correctly' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = {
  sendEmail,
  sendBulkEmail,
  testEmailService,
  emailTemplates
}; 