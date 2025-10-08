import { NextResponse } from 'next/server'
import { getAllLeads, getLeadByEmail } from '@/lib/database'

export async function GET(request: Request) {
  try {
    // Security: Only allow access from localhost
    const host = request.headers.get('host') || ''
    const isLocal = host.includes('localhost') || host.includes('127.0.0.1')
    
    if (!isLocal) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access only available on localhost' },
        { status: 403 }
      )
    }

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
