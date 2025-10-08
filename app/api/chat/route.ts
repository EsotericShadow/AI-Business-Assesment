import { NextRequest, NextResponse } from 'next/server'
import { XAIClient } from '@/lib/xai-client'
import { assessmentRateLimit } from '@/lib/rate-limiter'
import { knowledgeBase } from '@/lib/knowledge-base'

export async function POST(request: NextRequest) {
  try {
    const { message, context, userId, phase, businessInfo, discoveredOpportunities, questionCount } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Check user rate limit (generous: 15 requests per minute)
    const userLimit = await assessmentRateLimit.limit(userId || 'anonymous')
    if (!userLimit.success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please wait a moment before your next request.',
          retryAfter: userLimit.reset
        }, 
        { status: 429 }
      )
    }

    const xaiClient = new XAIClient(process.env.XAI_API_KEY!)
    
    // Load relevant knowledge context
    let knowledgeContext = ''
    if (phase === 'discovery' && businessInfo) {
      try {
        knowledgeContext = await knowledgeBase.getRelevantContext(
          businessInfo,
          discoveredOpportunities || [],
          phase
        )
      } catch (error) {
        console.error('Error loading knowledge context:', error)
        // Continue without context if there's an error
      }
    }
    
    // Use different prompts based on phase
    let response: string
    if (phase === 'discovery') {
      response = await xaiClient.conductBusinessAssessment(
        message, 
        businessInfo || '', 
        userId,
        discoveredOpportunities || [],
        questionCount || 0,
        knowledgeContext
      )
    } else {
      response = await xaiClient.conductBusinessAssessment(message, context || '', userId)
    }

    return NextResponse.json({ 
      response,
      usage: {
        remaining: userLimit.remaining,
        reset: userLimit.reset
      }
    })

  } catch (error) {
    console.error('Chat API error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: error.message },
          { status: 429 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
