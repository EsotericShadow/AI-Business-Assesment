import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, name, businessInfo } = await request.json()

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 })
    }

    // In a real implementation, you would save this to a database
    // For now, we'll just validate and return success
    console.log('Lead captured:', { email, name, businessInfo })

    // You could integrate with:
    // - Your CRM system
    // - Email marketing platform (Mailchimp, ConvertKit, etc.)
    // - Database (PostgreSQL, MongoDB, etc.)
    // - Analytics tracking

    return NextResponse.json({ 
      success: true,
      message: 'Lead saved successfully'
    })

  } catch (error) {
    console.error('Error saving lead:', error)
    return NextResponse.json(
      { error: 'Failed to save lead' },
      { status: 500 }
    )
  }
}
