import { NextResponse } from 'next/server'
import { getAllLeads, getLeadByEmail } from '@/lib/database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (email) {
      // Get specific lead by email
      const lead = await getLeadByEmail(email)
      if (!lead) {
        return NextResponse.json(
          { error: 'Lead not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ lead })
    } else {
      // Get all leads
      const leads = await getAllLeads()
      return NextResponse.json({ leads })
    }
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
