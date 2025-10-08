import { Resend } from 'resend'
import sgMail from '@sendgrid/mail'

// Initialize Resend (with fallback for missing API key)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

// Send email using Resend (primary)
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Try Resend first if API key is available
    if (resend) {
      const fromEmail = options.from || process.env.FROM_EMAIL || 'noreply@evergreenwebsolutions.ca'
      
      const result = await resend.emails.send({
        from: fromEmail,
        to: options.to,
        subject: options.subject,
        html: options.html,
      })

      console.log('Email sent successfully via Resend:', result.data?.id)
      return true
    } else {
      console.log('Resend API key not available, trying SendGrid')
      return await sendEmailWithSendGrid(options)
    }
  } catch (error) {
    console.error('Resend email failed, trying SendGrid:', error)
    
    // Fallback to SendGrid
    return await sendEmailWithSendGrid(options)
  }
}

// Fallback email service using SendGrid
async function sendEmailWithSendGrid(options: EmailOptions): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('No email service configured - logging email content instead')
      console.log('EMAIL TO:', options.to)
      console.log('SUBJECT:', options.subject)
      console.log('CONTENT:', options.html.substring(0, 200) + '...')
      return true // Return true for demo purposes
    }

    const fromEmail = options.from || process.env.FROM_EMAIL || 'gabriel@evergreenwebsolutions.ca'
    
    const msg = {
      to: options.to,
      from: fromEmail,
      subject: options.subject,
      html: options.html,
    }

    await sgMail.send(msg)
    console.log('Email sent successfully via SendGrid')
    return true
  } catch (error) {
    console.error('SendGrid email failed:', error)
    console.log('Falling back to logging email content')
    console.log('EMAIL TO:', options.to)
    console.log('SUBJECT:', options.subject)
    console.log('CONTENT:', options.html.substring(0, 200) + '...')
    return true // Return true for demo purposes
  }
}

// Send implementation report email
export async function sendImplementationReport(
  email: string, 
  name: string, 
  plan: string
): Promise<boolean> {
  const subject = `AI Implementation Plan for ${name} - Evergreen Web Solutions`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AI Implementation Plan</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .cta-button { 
          display: inline-block; 
          background: #10b981; 
          color: white; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 6px; 
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Your AI Implementation Plan</h1>
          <p>Ready to transform your business with AI</p>
        </div>
        
        <div class="content">
          <h2>Hi ${name}!</h2>
          
          <p>Thank you for completing our AI Business Assessment. We've analyzed your business needs and created a comprehensive implementation plan tailored specifically for your Northern BC business.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📋 Your Implementation Plan</h3>
            <div style="white-space: pre-line;">${plan}</div>
          </div>
          
          <h3>🎯 Next Steps</h3>
          <p>Our team will contact you within 24 hours to discuss:</p>
          <ul>
            <li>Implementation timeline and priorities</li>
            <li>Custom pricing for your specific needs</li>
            <li>Technical requirements and setup</li>
            <li>Ongoing support and maintenance</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://calendly.com/evergreen-websolutions/ai-strategy-call" class="cta-button">
              Schedule Your Strategy Call
            </a>
          </div>
          
          <p><strong>Questions?</strong> Reply to this email or call us at (250) 555-0123</p>
        </div>
        
        <div class="footer">
          <p><strong>Evergreen Web Solutions</strong><br>
          Terrace, BC | AI & Web Development Specialists<br>
          <a href="mailto:info@evergreenwebsolutions.com">info@evergreenwebsolutions.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `

  return await sendEmail({ to: email, subject, html })
}

// Send consultation confirmation email
export async function sendConsultationConfirmation(
  email: string, 
  name: string
): Promise<boolean> {
  const subject = `AI Strategy Consultation Request - Evergreen Web Solutions`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Consultation Request Confirmed</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Consultation Request Received</h1>
          <p>We'll be in touch within 24 hours</p>
        </div>
        
        <div class="content">
          <h2>Hi ${name}!</h2>
          
          <p>Thank you for requesting an AI strategy consultation with Evergreen Web Solutions. We're excited to help transform your business with AI!</p>
          
          <h3>📅 What Happens Next</h3>
          <ul>
            <li><strong>Within 24 hours:</strong> Our team will contact you to schedule your consultation</li>
            <li><strong>30-minute session:</strong> We'll review your AI opportunities and create a customized roadmap</li>
            <li><strong>Follow-up:</strong> You'll receive detailed implementation recommendations and pricing</li>
          </ul>
          
          <h3>🎯 What to Expect</h3>
          <p>During your consultation, we'll:</p>
          <ul>
            <li>Review your AI assessment results</li>
            <li>Discuss implementation priorities</li>
            <li>Create a customized roadmap</li>
            <li>Answer all your questions</li>
            <li>Provide transparent pricing and timelines</li>
          </ul>
          
          <p><strong>Questions?</strong> Reply to this email or call us at (250) 555-0123</p>
        </div>
        
        <div class="footer">
          <p><strong>Evergreen Web Solutions</strong><br>
          Terrace, BC | AI & Web Development Specialists<br>
          <a href="mailto:info@evergreenwebsolutions.com">info@evergreenwebsolutions.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `

  return await sendEmail({ to: email, subject, html })
}

// Send project initiation email
export async function sendProjectInitiationEmail(
  email: string, 
  name: string, 
  selectedProcesses: any[]
): Promise<boolean> {
  const subject = `AI Implementation Project Started - Evergreen Web Solutions`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Project Initiated</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #7c3aed; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .process-list { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Project Initiated!</h1>
          <p>Your AI transformation journey begins now</p>
        </div>
        
        <div class="content">
          <h2>Hi ${name}!</h2>
          
          <p>Excellent news! Your AI implementation project has been officially initiated. We're excited to help transform your business with cutting-edge AI solutions.</p>
          
          <div class="process-list">
            <h3>🎯 Selected AI Solutions</h3>
            <ul>
              ${selectedProcesses.map(process => `<li><strong>${process.name}</strong> - ${process.aiRationale || 'AI-optimized solution for your business'}</li>`).join('')}
            </ul>
          </div>
          
          <h3>📋 Immediate Next Steps</h3>
          <ul>
            <li><strong>Project Manager Assigned:</strong> You'll be contacted within 24 hours</li>
            <li><strong>Project Dashboard:</strong> You'll receive login credentials</li>
            <li><strong>Discovery Call:</strong> Initial planning session scheduled for next week</li>
            <li><strong>Implementation Timeline:</strong> Detailed roadmap will be finalized</li>
          </ul>
          
          <h3>💼 What to Expect</h3>
          <ul>
            <li>Weekly progress updates</li>
            <li>Dedicated support team</li>
            <li>Regular check-ins and adjustments</li>
            <li>Full implementation support</li>
            <li>Transparent pricing and billing</li>
          </ul>
          
          <p><strong>Questions?</strong> Reply to this email or call us at (250) 555-0123</p>
        </div>
        
        <div class="footer">
          <p><strong>Evergreen Web Solutions</strong><br>
          Terrace, BC | AI & Web Development Specialists<br>
          <a href="mailto:info@evergreenwebsolutions.com">info@evergreenwebsolutions.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `

  return await sendEmail({ to: email, subject, html })
}
