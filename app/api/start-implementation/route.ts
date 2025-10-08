import { NextRequest, NextResponse } from 'next/server'
import { storeLead } from '@/lib/database'
import { sendProjectInitiationEmail } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    const { email, name, selectedProcesses, businessInfo } = await request.json()

    if (!email || !name || !selectedProcesses) {
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
      selectedProcesses: selectedProcesses.map((p: any) => ({
        id: p.id,
        name: p.name,
        rating: p.userRating
      })),
      implementationRequested: true,
      timestamp: new Date()
    })

    // Send project initiation email
    const emailSent = await sendProjectInitiationEmail(email, name, selectedProcesses)

    // In production, you would:
    // 1. Create a project in your project management system
    // 2. Set up initial project tasks and milestones
    // 3. Assign project manager and team
    // 4. Set up project dashboard access
    // 5. Begin real AI implementation work

    const projectId = `proj_${Date.now()}`
    const topProcess = selectedProcesses[0] // Start with highest priority

    console.log('Implementation project requested for:', email, 'Lead ID:', leadId)
    console.log('Starting with process:', topProcess?.name)

    return NextResponse.json({
      success: true,
      message: 'Implementation project request received! Your project manager will contact you within 24 hours to begin setup.',
      projectId,
      nextSteps: [
        'Project manager will contact you within 24 hours',
        'Initial discovery call scheduled for next week',
        'Implementation timeline will be finalized',
        'You\'ll receive access to your project dashboard'
      ],
      startingProcess: topProcess?.name || 'AI Assessment',
      estimatedStartDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week from now
      leadId,
      emailSent
    })

  } catch (error) {
    console.error('Error starting implementation:', error)
    return NextResponse.json(
      { error: 'Failed to start implementation' },
      { status: 500 }
    )
  }
}

