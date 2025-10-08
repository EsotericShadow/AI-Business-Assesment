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

    // In a real implementation, you would:
    // 1. Integrate with a calendar booking system (Calendly, Acuity, etc.)
    // 2. Send confirmation emails
    // 3. Store booking information in a database
    // 4. Set up automated reminders

    // For now, we'll simulate booking success
    const bookingId = `booking_${Date.now()}`
    const meetingLink = `https://calendly.com/evergreen-websolutions/ai-strategy-call`

    console.log('Call booked for:', email)
    console.log('Selected processes:', selectedProcesses?.map((p: any) => p.name))

    return NextResponse.json({
      success: true,
      message: 'Strategy call booked successfully! Check your email for confirmation.',
      bookingId,
      meetingLink,
      // In production, this would be a real Calendly link
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
