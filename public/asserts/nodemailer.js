
// server.js
require('dotenv').config();
const nodemailer = require('nodemailer');


 async function sendVerificationEmail(userEmail, code) {
    try {
        // 1. Configure the SMTP transporter
        // Note: For production, use reliable transactional services like Mailtrap, SendGrid, or AWS SES.
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true for port 465, false for other ports
            auth: {
                user:process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS  // Your email App Password
            }
        });
        
        // Add this right after creating your transporter object
        transporter.verify((error, success) => {
        if (error) {
            console.error("❌ Email configuration error:", error);
        } else {
            console.log("🚀 Server is ready to send emails successfully!");
        }
        });

       // console.log(userEmail);
        // 2. Define email options
        const mailOptions = {
            from: `"Your App Security" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Your Email Verification Code',
            text: `Your verification code is: ${code}. It will expire in 10 minutes.`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                    <h2 style="color: #333333; text-align: center;">Verify Your Email Address</h2>
                    <p>Thank you for signing up. Please use the following One-Time Password (OTP) to complete your verification process:</p>
                    <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #4A90E2; margin: 20px 0; border-radius: 4px;">
                        ${code}
                    </div>
                    <p style="color: #666666; font-size: 12px; text-align: center;">This code is valid for 10 minutes. If you did not request this code, please ignore this email.</p>
                </div>
            `
        };

        // 3. Execute transmission
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email dispatched successfully: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error occurred while sending verification email:', error);
        return false;
    }
}

module.exports = sendVerificationEmail;

// Operational execution example
/*async function run() {
    const targetUser = 'user@example.com';
    const otpCode = generateVerificationCode();
    
    console.log(`Generated Code [Save this to your database/cache temporarily]: ${otpCode}`);
    
    // Trigger dispatch
    await sendVerificationEmail(targetUser, otpCode);
}

run();*/




