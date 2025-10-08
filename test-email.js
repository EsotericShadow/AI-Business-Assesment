// Test script to verify email configuration
// Run with: node test-email.js

const { Resend } = require('resend');

async function testEmail() {
  const resend = new Resend(process.env.RESEND_API_KEY || 'your_resend_api_key_here');
  
  try {
    const result = await resend.emails.send({
      from: 'Evergreen Web Solutions <noreply@evergreenwebsolutions.ca>',
      to: ['gabriel@evergreenwebsolutions.ca'], // Replace with your email
      subject: 'Test Email from AI Assessment Tool',
      html: `
        <h1>🎉 Email Configuration Test</h1>
        <p>This is a test email to verify your Resend configuration is working correctly.</p>
        <p><strong>Domain:</strong> evergreenwebsolutions.ca</p>
        <p><strong>From:</strong> Evergreen Web Solutions</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <hr>
        <p><em>If you received this email, your email service is configured correctly!</em></p>
      `,
    });

    console.log('✅ Email sent successfully!');
    console.log('Email ID:', result.data?.id);
    console.log('Check your inbox for the test email.');
    
  } catch (error) {
    console.error('❌ Email failed to send:');
    console.error(error);
  }
}

testEmail();
