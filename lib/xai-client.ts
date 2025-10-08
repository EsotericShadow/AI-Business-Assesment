import { rateLimit, xaiRateLimit } from './rate-limiter'
import { BusinessProcess, ProcessDiscoveryAI } from './process-discovery'

export interface XAIResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export class XAIClient {
  private apiKey: string
  private baseURL = 'https://api.x.ai/v1'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async chatCompletion(messages: Array<{ role: string; content: string }>, userId?: string): Promise<XAIResponse> {
    // Check if API key is set (for development/testing)
    if (!this.apiKey || this.apiKey === 'test-key-replace-with-real-key') {
      // Return mock response for testing
      return {
        choices: [{
          message: {
            content: "This is a mock response for testing. Please set up your XAI API key to use the real AI."
          }
        }],
        usage: {
          prompt_tokens: 10,
          completion_tokens: 20,
          total_tokens: 30
        }
      }
    }

    // Check global XAI API rate limit
    const globalLimit = await xaiRateLimit.limit('global')
    if (!globalLimit.success) {
      throw new Error('XAI API rate limit exceeded. Please try again in a moment.')
    }

    // Check user-specific rate limit if userId provided
    if (userId) {
      const userLimit = await rateLimit.limit(userId)
      if (!userLimit.success) {
        throw new Error('Rate limit exceeded. Please wait a moment before your next request.')
      }
    }

    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-4-fast',
        messages: messages,
        temperature: 0.9,
        max_tokens: 1000,
        stream: false,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`XAI API error: ${response.status} - ${error}`)
    }

    return await response.json()
  }

  async conductBusinessAssessment(
    userInput: string, 
    conversationHistory: string, 
    userId?: string,
    discoveredOpportunities: string[] = [],
    questionCount: number = 0,
    knowledgeContext?: string
  ): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are an AI business consultant helping Northern BC businesses discover AI opportunities. Be conversational, natural, and engaging.

${knowledgeContext || 'KNOWLEDGE BASE ACCESS: Loading research data...'}

CONVERSATION STYLE:
- Vary your language and avoid repetitive phrases
- Use different ways to acknowledge responses: "That's interesting", "I see", "Got it", "Makes sense", "Absolutely", "Right on"
- Ask questions naturally: "What's your current setup for...?", "How do you typically handle...?", "What's been your biggest challenge with...?"
- Be empathetic: "That sounds frustrating", "I can see how that would be time-consuming", "That's a common struggle"
- Use Northern BC references naturally: "Given Prince George's seasonal patterns", "With the weather up here", "In smaller markets like ours"
- Be geographically accurate: Prince George is inland in central BC, not coastal. Haida Gwaii is an island accessible by ferry from Prince Rupert (8+ hours from Prince George)
- Evergreen Web Solutions is based in Terrace, BC, not Prince George. 
- Prince George is a city in central BC, and is another good example for a city in Northern BC.

YOUR APPROACH:
- Ask 3-6 questions total, adjusting based on information quality
- Focus on pain points and current processes
- Identify opportunities but keep exploring until you have enough context
- Be genuinely helpful and curious about their business

CURRENT STATUS:
- Questions asked: ${questionCount}
- Opportunities identified: ${discoveredOpportunities.join(', ') || 'None yet'}

TRANSITION TRIGGER:
When you have enough context (usually after 3-4 good responses), you MUST say exactly: "I have enough information to analyze your processes. Let me identify AI opportunities for your business."
Do NOT provide detailed recommendations in your response - just use the exact phrase above to trigger the process card system.

AVOID REPETITION:
- Don't start every response with "I understand" or "Thanks for sharing"
- Vary your question starters and acknowledgments
- Don't repeat the same phrases about "Northern BC" or "seasonal fluctuations"
- Make each response feel fresh and natural

INTELLIGENT PROCESS MATCHING:
- Team size matters: Don't recommend "Predictive Staff Scheduling" or "Resource Allocation" to teams under 5 people
- Industry context: Only recommend "Route Optimization" if they mention delivery, logistics, or fleet operations
- Pain points first: Only recommend processes that directly address struggles they mentioned
- Scale appropriately: A 2-3 person crew doesn't need AI for staff scheduling - they can use a phone call

SPECIFIC EXCLUSIONS BY BUSINESS SIZE:
- Under 5 employees: Skip "Predictive Staff Scheduling", "Resource Allocation", "Advanced Lead Scoring"
- Service businesses (no products): Skip "Inventory Management", "Supplier Optimization"
- Non-delivery businesses: Skip "Route Optimization", "Fleet Management"
- Low lead volume: Skip "Advanced Lead Scoring", "Lead Nurturing"

ALWAYS RELEVANT (recommend based on pain points):
- Document Creation, Proposal Generation, Email Management
- Social Media Management, Customer Service automation
- Bookkeeping, Expense Tracking, Performance Analytics

Current user response: ${userInput}`
      },
      {
        role: 'user',
        content: userInput
      }
    ]

    const response = await this.chatCompletion(messages, userId)
    return response.choices[0]?.message?.content || 'I apologize, but I encountered an error. Please try again.'
  }

  async analyzeBusinessForProcesses(businessInfo: string, userId?: string): Promise<string[]> {
    const messages = [
      {
        role: 'system',
        content: `You are an AI business analyst. Analyze the following business information and identify which business processes could benefit from AI integration.

Business Information: ${businessInfo}

Return a JSON array of process IDs that are relevant to this business. Use these process IDs:
- email-management
- document-creation
- scheduling
- social-media
- content-creation
- email-marketing
- lead-qualification
- proposal-generation
- inventory-management
- customer-service
- bookkeeping
- expense-tracking

Return ONLY a JSON array like: ["process-id-1", "process-id-2", "process-id-3"]`
      },
      {
        role: 'user',
        content: `Analyze this business and return the relevant process IDs: ${businessInfo}`
      }
    ]

    const response = await this.chatCompletion(messages, userId)
    const content = response.choices[0]?.message?.content || '[]'
    
    try {
      const processIds = JSON.parse(content)
      
      // Apply safeguard filter
      const processDiscovery = new ProcessDiscoveryAI()
      const validatedIds = processDiscovery.validateProcessRecommendations(
        processIds,
        businessInfo
      )
      
      return validatedIds
    } catch (error) {
      console.error('Error parsing process IDs:', error)
      return []
    }
  }

  async discoverProcessesWithContext(
    businessInfo: string,
    conversationHistory: string,
    knowledgeContext: string,
    userId?: string
  ): Promise<BusinessProcess[]> {
    const messages = [
      {
        role: 'system',
        content: `You are an AI business analyst with access to comprehensive research data. Analyze the business information and select the most relevant AI processes.

${knowledgeContext}

Your Task:
1. Select 8-12 most relevant processes for this business
2. Customize descriptions to their specific situation
3. Adjust cost estimates based on research benchmarks
4. Prioritize based on:
   - Quick wins (easy implementation, high impact)
   - Pain points mentioned in conversation
   - Industry best practices from research
   - Northern BC context (seasonal, remote, local market)

Return ONLY a JSON array of process IDs that are most relevant, like: ["process-id-1", "process-id-2", "process-id-3"]`
      },
      {
        role: 'user',
        content: `Business Context: ${businessInfo}
Conversation: ${conversationHistory}

Analyze this business and return the relevant process IDs.`
      }
    ]

    const response = await this.chatCompletion(messages, userId)
    const content = response.choices[0]?.message?.content || '[]'
    
    try {
      const processIds = JSON.parse(content)
      return processIds
    } catch (error) {
      console.error('Error parsing process IDs:', error)
      return []
    }
  }

  async generateProcessRecommendations(process: BusinessProcess, businessContext: string, userId?: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are an AI consultant providing specific recommendations for implementing AI in business processes.

Process: ${process.name} - ${process.description}
Business Context: ${businessContext}
AI Potential: ${process.aiPotential}
Implementation Complexity: ${process.implementationComplexity}

Provide specific, actionable recommendations for this process. Include:
1. Specific AI tools to consider
2. Implementation steps
3. Expected benefits
4. Timeline and costs
5. Next steps

Keep it concise but comprehensive.`
      },
      {
        role: 'user',
        content: `Provide recommendations for implementing AI in the ${process.name} process.`
      }
    ]

    const response = await this.chatCompletion(messages, userId)
    return response.choices[0]?.message?.content || 'Recommendations not available.'
  }

  async generateProcessRationales(
    processes: BusinessProcess[],
    businessContext: string,
    conversationHistory: string,
    userId?: string
  ): Promise<Map<string, string>> {
    const messages = [
      {
        role: 'system',
        content: `You are an AI business consultant analyzing why specific AI processes were recommended for a business.

Business Context: ${businessContext}
Conversation History: ${conversationHistory}

For each of these recommended processes, explain WHY it was selected and HOW it addresses the specific pain points mentioned in our conversation:

${processes.map(p => `${p.name}: ${p.description}`).join('\n')}

Return a JSON object with process IDs as keys and concise (2-3 sentence) rationales as values that reference specific details from the conversation.

Example format:
{
  "process-id-1": "This was recommended because you mentioned struggling with manual data entry between systems. This AI solution will automatically sync your POS and accounting software, eliminating the 2 hours per week you spend on duplicate data entry.",
  "process-id-2": "Since you mentioned scheduling challenges with your construction crews, this predictive scheduling AI will analyze weather patterns and project timelines to optimize your crew assignments and reduce overtime costs."
}

Focus on:
- Specific pain points mentioned in the conversation
- How this process directly addresses those challenges
- Expected benefits for their specific business situation
- Reference actual details from the conversation when possible`
      },
      {
        role: 'user',
        content: `Generate rationales for these processes based on the business context and conversation.`
      }
    ]

    const response = await this.chatCompletion(messages, userId)
    const content = response.choices[0]?.message?.content || '{}'
    
    try {
      const rationales = JSON.parse(content)
      return new Map(Object.entries(rationales))
    } catch (error) {
      console.error('Error parsing process rationales:', error)
      return new Map()
    }
  }
}