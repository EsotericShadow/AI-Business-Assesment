import { NextRequest, NextResponse } from 'next/server'
import { storeLead } from '@/lib/database'
import { sendConsultationConfirmation } from '@/lib/email-service'

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
    const leadId = await storeLead({
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
    const emailSent = await sendConsultationConfirmation(email, name)

    // In production, you would integrate with:
    // - Calendly API
    // - Acuity Scheduling
    // - Google Calendar API
    // - Your own booking system

    const bookingId = `booking_${Date.now()}`
    const meetingLink = `https://calendly.com/evergreen-websolutions/ai-strategy-call`

    console.log('Consultation requested for:', email, 'Lead ID:', leadId)
    console.log('Selected processes:', selectedProcesses?.map((p: any) => p.name))

    return NextResponse.json({
      success: true,
      message: 'Strategy call request received! We\'ll contact you within 24 hours to schedule your consultation.',
      bookingId,
      meetingLink,
      calendarUrl: meetingLink,
      leadId,
      emailSent
    })

  } catch (error) {
    console.error('Error booking call:', error)
    return NextResponse.json(
      { error: 'Failed to book strategy call' },
      { status: 500 }
    )
  }
}

