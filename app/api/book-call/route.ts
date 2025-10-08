import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, name, selectedProcesses, businessInfo } = await request.json()

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store lead in database for follow-up
    await storeLead({
      email,
      name,
      businessInfo,
      selectedProcesses: selectedProcesses?.map((p: any) => ({
        id: p.id,
        name: p.name,
        rating: p.userRating
      })),
      consultationRequested: true,
      timestamp: new Date()
    })

    // Send confirmation email
    await sendConsultationConfirmation(email, name)

    // In production, you would integrate with:
    // - Calendly API
    // - Acuity Scheduling
    // - Google Calendar API
    // - Your own booking system

    const bookingId = `booking_${Date.now()}`
    const meetingLink = `https://calendly.com/evergreen-websolutions/ai-strategy-call`

    console.log('Consultation requested for:', email)
    console.log('Selected processes:', selectedProcesses?.map((p: any) => p.name))

    return NextResponse.json({
      success: true,
      message: 'Strategy call request received! We\'ll contact you within 24 hours to schedule your consultation.',
      bookingId,
      meetingLink,
      calendarUrl: meetingLink
    })

  } catch (error) {
    console.error('Error booking call:', error)
    return NextResponse.json(
      { error: 'Failed to book strategy call' },
      { status: 500 }
    )
  }
}

// Store lead in database for follow-up
async function storeLead(leadData: any) {
  console.log('LEAD STORED:', JSON.stringify(leadData, null, 2))
  
  // You can integrate with:
  // - Airtable
  // - Notion API
  // - Google Sheets API
  // - Your own database
  // - CRM like HubSpot, Salesforce, etc.
}

// Send consultation confirmation email
async function sendConsultationConfirmation(email: string, name: string) {
  console.log(`CONSULTATION EMAIL SENT TO: ${email}`)
  console.log(`SUBJECT: AI Strategy Consultation Request - ${name}`)
  console.log(`CONTENT: Thank you for requesting a consultation...`)
  
  // In production, use real email service
}
