'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Loader2 } from 'lucide-react'
import ChatMessage, { LoadingMessage } from './ChatMessage'
import ProgressBar from './ProgressBar'
import { BusinessProcess, ProcessDiscoveryAI } from '@/lib/process-discovery'
import { XAIClient } from '@/lib/xai-client'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type?: 'text' | 'process-cards' | 'rating-request' | 'result-card' | 'cta-buttons' | 'action-buttons'
  data?: any
}

type AssessmentPhase = 'discovery' | 'process-selection' | 'rating' | 'results'

interface ChatInterfaceProps {
  userEmail: string
  userName: string
  onExit: () => void
}

export default function ChatInterface({ userEmail, userName, onExit }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi ${userName}! I'm your AI business consultant. I'm here to help you discover how AI can transform your Northern BC business. Let's start with the basics - what type of business do you run?`,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState('')
  const [phase, setPhase] = useState<AssessmentPhase>('discovery')
  const [businessInfo, setBusinessInfo] = useState('')
  const [discoveredProcesses, setDiscoveredProcesses] = useState<BusinessProcess[]>([])
  const [selectedProcesses, setSelectedProcesses] = useState<BusinessProcess[]>([])
  const [currentRatingIndex, setCurrentRatingIndex] = useState(0)
  const [processDiscovery] = useState(new ProcessDiscoveryAI())
  const [discoveredOpportunities, setDiscoveredOpportunities] = useState<string[]>([])
  const [questionCount, setQuestionCount] = useState(0)
  const [discoveryProgress, setDiscoveryProgress] = useState(0)
  const [aiStrategy, setAiStrategy] = useState({
    focusAreas: [] as string[],
    skipAreas: [] as string[],
    priorityQuestions: [] as string[]
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getLoadingStatus = (phase: AssessmentPhase, step: number) => {
    const statuses = {
      discovery: ['Thinking...', 'Analyzing your business...', 'Processing information...'],
      'process-selection': ['Analyzing...', 'Identifying opportunities...', 'Preparing recommendations...'],
      rating: ['Assessing...', 'Calculating scores...', 'Processing ratings...'],
      results: ['Analyzing...', 'Generating roadmap...', 'Finalizing results...']
    }
    return statuses[phase][step] || 'Processing...'
  }

  const simulateAIThinking = async (phase: AssessmentPhase) => {
    const steps = 3
    for (let i = 0; i < steps; i++) {
      setLoadingStatus(getLoadingStatus(phase, i))
      await new Promise(resolve => setTimeout(resolve, 800))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setBusinessInfo(prev => prev + ' ' + input.trim())
    setQuestionCount(prev => {
      const newCount = prev + 1
      setDiscoveryProgress(Math.min((newCount / 6) * 100, 100))
      return newCount
    })
    setInput('')
    setIsLoading(true)

    try {
      // Simulate AI thinking
      await simulateAIThinking(phase)

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
          context: 'Business process discovery assessment',
          phase: phase,
          businessInfo: businessInfo + ' ' + input.trim(),
          discoveredOpportunities: discoveredOpportunities,
          questionCount: questionCount + 1
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      // Extract opportunities and update AI strategy from AI response
      const responseLower = data.response.toLowerCase()
      
      // Enhanced opportunity detection
      const opportunityPatterns = [
        { keywords: ['manual', 'hand', 'paper'], category: 'automation' },
        { keywords: ['repetitive', 'same thing', 'over and over'], category: 'automation' },
        { keywords: ['scheduling', 'shifts', 'staff'], category: 'scheduling' },
        { keywords: ['inventory', 'stock', 'ordering'], category: 'inventory' },
        { keywords: ['customer service', 'support', 'complaints'], category: 'customer-service' },
        { keywords: ['data entry', 'entering data', 'typing'], category: 'data-entry' },
        { keywords: ['integration', 'connect', 'sync'], category: 'integration' },
        { keywords: ['forecasting', 'predict', 'planning'], category: 'predictive' }
      ]
      
      const newOpportunities: string[] = []
      const newFocusAreas: string[] = []
      
      opportunityPatterns.forEach(pattern => {
        const hasKeywords = pattern.keywords.some(keyword => responseLower.includes(keyword))
        if (hasKeywords && !discoveredOpportunities.includes(pattern.category)) {
          newOpportunities.push(pattern.category)
          newFocusAreas.push(pattern.category)
        }
      })
      
      if (newOpportunities.length > 0) {
        setDiscoveredOpportunities(prev => [...prev, ...newOpportunities])
        setAiStrategy(prev => ({
          ...prev,
          focusAreas: [...prev.focusAreas, ...newFocusAreas]
        }))
      }
      
      // Update strategy based on AI's decision-making
      if (data.response.includes('enough information') || data.response.includes('analyze your processes')) {
        setAiStrategy(prev => ({
          ...prev,
          skipAreas: ['generic questions', 'basic discovery']
        }))
      }

      // Check if we should move to process selection phase
      if (data.response.includes('I have enough information to analyze your processes') || 
          data.response.includes('analyze your processes') ||
          questionCount >= 6) {
        setPhase('process-selection')
        
        // Discover relevant processes (context-aware discovery happens in API)
        const processes = await processDiscovery.discoverProcesses(businessInfo + ' ' + input.trim())
        
        // Generate AI rationales for each process
        try {
          const xaiClient = new XAIClient(process.env.XAI_API_KEY || 'test-key-replace-with-real-key')
          const conversationHistory = messages.map(m => `${m.role}: ${m.content}`).join('\n')
          const rationales = await xaiClient.generateProcessRationales(
            processes,
            businessInfo + ' ' + input.trim(),
            conversationHistory,
            userEmail
          )
          
          // Attach rationales to processes
          const processesWithRationales = processes.map(process => ({
            ...process,
            aiRationale: rationales.get(process.id) || ''
          }))
          
          setDiscoveredProcesses(processesWithRationales)
          setSelectedProcesses(processesWithRationales)

          // Add process cards message
          const processCardsMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content: 'Based on our conversation, I found these AI opportunities for your business:',
            timestamp: new Date(),
            type: 'process-cards',
            data: processesWithRationales
          }
          setMessages(prev => [...prev, processCardsMessage])
        } catch (error) {
          console.error('Error generating rationales:', error)
          // Fallback without rationales
          setDiscoveredProcesses(processes)
          setSelectedProcesses(processes)

          const processCardsMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content: 'Based on our conversation, I found these AI opportunities for your business:',
            timestamp: new Date(),
            type: 'process-cards',
            data: processes
          }
          setMessages(prev => [...prev, processCardsMessage])
        }
      }

    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again in a moment.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setLoadingStatus('')
    }
  }

  const handleProcessSelect = (processId: string) => {
    setSelectedProcesses(prev => 
      prev.map(process => 
        process.id === processId 
          ? { ...process, isSelected: !process.isSelected }
          : process
      )
    )

    // Update the process cards message
    setMessages(prev => 
      prev.map(message => 
        message.type === 'process-cards' 
          ? { 
              ...message, 
              data: message.data.map((process: BusinessProcess) => 
                process.id === processId 
                  ? { ...process, isSelected: !process.isSelected }
                  : process
              )
            }
          : message
      )
    )
  }

  const handleContinueToRating = () => {
    const selectedCount = selectedProcesses.filter(p => p.isSelected).length
    if (selectedCount === 0) return

    setPhase('rating')
    setCurrentRatingIndex(0)
    
    const selectedProcessesList = selectedProcesses.filter(p => p.isSelected)
    
    // Add rating request message
    const ratingMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Great! Let's assess each process (1 of ${selectedCount})`,
      timestamp: new Date(),
      type: 'rating-request',
      data: {
        processName: selectedProcessesList[0].name,
        question: 'How much time do you spend on this weekly?',
        processId: selectedProcessesList[0].id
      }
    }
    setMessages(prev => [...prev, ratingMessage])
  }

  const handleRatingSelect = (rating: number) => {
    const selectedProcessesList = selectedProcesses.filter(p => p.isSelected)
    const currentProcess = selectedProcessesList[currentRatingIndex]
    
    // Update process rating
    setSelectedProcesses(prev => 
      prev.map(process => 
        process.id === currentProcess.id 
          ? { ...process, userRating: rating }
          : process
      )
    )

    // Add user rating message
    const userRatingMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `${rating}/5 - ${rating === 1 ? 'Little time' : rating === 5 ? 'Lots of time' : 'Moderate time'}`,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userRatingMessage])

    // Check if we have more processes to rate
    if (currentRatingIndex < selectedProcessesList.length - 1) {
      const nextIndex = currentRatingIndex + 1
      setCurrentRatingIndex(nextIndex)
      
      const nextRatingMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Got it! Let's assess the next one (${nextIndex + 1} of ${selectedProcessesList.length})`,
        timestamp: new Date(),
        type: 'rating-request',
        data: {
          processName: selectedProcessesList[nextIndex].name,
          question: 'How much time do you spend on this weekly?',
          processId: selectedProcessesList[nextIndex].id
        }
      }
      setMessages(prev => [...prev, nextRatingMessage])
    } else {
      // All ratings complete, show results
      setPhase('results')
      showResults()
    }
  }

  const showResults = async () => {
    const ratedProcesses = selectedProcesses
      .filter(p => p.isSelected && p.userRating)
      .map(process => ({
        ...process,
        finalScore: processDiscovery.calculateProcessScore(process) * (process.userRating! / 5)
      }))
      .sort((a, b) => b.finalScore - a.finalScore)

    // Calculate total potential impact
    const totalTimeSaved = ratedProcesses.reduce((sum, p) => sum + (p.timeSavings || 0), 0)
    const totalCostSavings = ratedProcesses.reduce((sum, p) => sum + (p.costSavings || 0), 0)
    const totalRevenueImpact = ratedProcesses.reduce((sum, p) => sum + (p.revenueImpact || 0), 0)
    const estimatedMonthlySavings = Math.round((totalCostSavings + totalRevenueImpact) * 1000)

    // Create exciting results summary
    const resultsMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `🎉 **Amazing! Your AI Transformation Potential**

**Your Personalized AI Roadmap:**
✅ **${ratedProcesses.length} AI opportunities** identified
⏰ **${totalTimeSaved} hours/week** you could save
💰 **${totalCostSavings + totalRevenueImpact}% efficiency gain** 
📈 **~$${estimatedMonthlySavings.toLocaleString()}/month** potential savings

**Top 3 Priorities for Your Real Estate Business:**
${ratedProcesses.slice(0, 3).map((p, i) => `${i + 1}. **${p.name}** - ${p.timeSavings}h/week saved, ${p.revenueImpact}% revenue boost`).join('\n')}

**Implementation Timeline:** Start with your #1 priority this month, add #2 next month, and #3 within 90 days.

**Next Steps:**
🚀 **Ready to transform your business?** Let's discuss how to implement these AI solutions specifically for your real estate practice in Prince George.

**What happens next:**
• Detailed implementation plan for each process
• Tool recommendations with exact costs
• Step-by-step setup guidance
• Ongoing support from Evergreen Web Solutions`,
      timestamp: new Date(),
      type: 'result-card',
      data: { 
        results: ratedProcesses,
        summary: {
          totalTimeSaved,
          totalCostSavings,
          totalRevenueImpact,
          estimatedMonthlySavings,
          topProcesses: ratedProcesses.slice(0, 3)
        }
      }
    }
    setMessages(prev => [...prev, resultsMessage])

    // Add compelling call-to-action
    const ctaMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: "**Ready to get started?** Choose your next step:",
      timestamp: new Date(),
      type: 'cta-buttons'
    }
    setMessages(prev => [...prev, ctaMessage])

    // Add action buttons
    const actionMessage: Message = {
      id: (Date.now() + 2).toString(),
      role: 'assistant',
      content: "📧 **Get Detailed Report** - Full implementation plan emailed to you\n💬 **Book Strategy Call** - 30-min consultation with our AI experts\n🚀 **Start Implementation** - We'll help you set up your first AI solution",
      timestamp: new Date(),
      type: 'action-buttons'
    }
    setMessages(prev => [...prev, actionMessage])
  }

  const selectedCount = selectedProcesses.filter(p => p.isSelected).length

  // CTA Button Handlers
  const handleGetReport = async () => {
    try {
      setIsLoading(true)
      setLoadingStatus('Generating your detailed implementation plan...')

      const response = await fetch('/api/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          selectedProcesses: selectedProcesses.filter(p => p.isSelected && p.userRating),
          businessInfo
        }),
      })

      const result = await response.json()

      if (result.success) {
        const successMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `✅ **Report Generated Successfully!**\n\nYour detailed implementation plan has been sent to **${userEmail}**. The report includes:\n\n• Complete implementation roadmap\n• Cost breakdown and ROI projections\n• Step-by-step setup guides\n• Recommended tools and vendors\n• Timeline and milestones\n\nCheck your email (including spam folder) for the full report.`,
          timestamp: new Date(),
          type: 'text'
        }
        setMessages(prev => [...prev, successMessage])
      } else {
        throw new Error(result.error || 'Failed to generate report')
      }
    } catch (error) {
      console.error('Error generating report:', error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `❌ **Error generating report**\n\nWe encountered an issue generating your implementation plan. Please try again or contact us directly at info@evergreenwebsolutions.com for assistance.`,
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setLoadingStatus('')
    }
  }

  const handleBookCall = async () => {
    try {
      setIsLoading(true)
      setLoadingStatus('Booking your strategy call...')

      const response = await fetch('/api/book-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          selectedProcesses: selectedProcesses.filter(p => p.isSelected && p.userRating),
          businessInfo
        }),
      })

      const result = await response.json()

      if (result.success) {
        const successMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `✅ **Strategy Call Booked!**\n\nYour 30-minute consultation has been scheduled. Here's what happens next:\n\n• **Confirmation email** sent to ${userEmail}\n• **Calendar invite** with meeting details\n• **Pre-call questionnaire** to prepare for our discussion\n• **Meeting link** for your scheduled time\n\n**What to expect:**\n• Review your AI opportunities\n• Discuss implementation priorities\n• Create a customized roadmap\n• Answer all your questions\n\nWe'll contact you within 24 hours to confirm your preferred time slot.`,
          timestamp: new Date(),
          type: 'text'
        }
        setMessages(prev => [...prev, successMessage])
      } else {
        throw new Error(result.error || 'Failed to book call')
      }
    } catch (error) {
      console.error('Error booking call:', error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `❌ **Error booking call**\n\nWe encountered an issue scheduling your strategy call. Please contact us directly at info@evergreenwebsolutions.com or call (250) 555-0123 to schedule your consultation.`,
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setLoadingStatus('')
    }
  }

  const handleStartImplementation = async () => {
    try {
      setIsLoading(true)
      setLoadingStatus('Setting up your implementation project...')

      const response = await fetch('/api/start-implementation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          selectedProcesses: selectedProcesses.filter(p => p.isSelected && p.userRating),
          businessInfo
        }),
      })

      const result = await response.json()

      if (result.success) {
        const successMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `🚀 **Implementation Project Created!**\n\nYour AI transformation journey has officially begun! Here's what happens next:\n\n**Immediate Next Steps:**\n• **Project Manager assigned** - You'll be contacted within 24 hours\n• **Project Dashboard access** - You'll receive login credentials\n• **Discovery call scheduled** - Initial planning session next week\n• **Implementation timeline** - Detailed roadmap will be finalized\n\n**Starting with:** ${result.startingProcess}\n**Estimated start date:** ${new Date(result.estimatedStartDate).toLocaleDateString()}\n\n**What to expect:**\n• Weekly progress updates\n• Dedicated support team\n• Regular check-ins and adjustments\n• Full implementation support\n\nWelcome to the future of your business! 🎉`,
          timestamp: new Date(),
          type: 'text'
        }
        setMessages(prev => [...prev, successMessage])
      } else {
        throw new Error(result.error || 'Failed to start implementation')
      }
    } catch (error) {
      console.error('Error starting implementation:', error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `❌ **Error starting implementation**\n\nWe encountered an issue setting up your implementation project. Please contact us directly at info@evergreenwebsolutions.com or call (250) 555-0123 to get started.`,
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setLoadingStatus('')
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header with Progress */}
      <ProgressBar currentPhase={phase} onExit={onExit} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onProcessSelect={handleProcessSelect}
            onRatingSelect={handleRatingSelect}
            onGetReport={handleGetReport}
            onBookCall={handleBookCall}
            onStartImplementation={handleStartImplementation}
          />
        ))}
        
          {isLoading && <LoadingMessage status={loadingStatus} />}
          
          {/* Discovery Progress Indicator */}
          {phase === 'discovery' && questionCount > 0 && (
            <div className="bg-blue-50 rounded-lg p-4 mb-4 mx-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">Discovery Progress</span>
                <span className="text-sm text-blue-700">{questionCount}/6 questions</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${discoveryProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                {discoveredOpportunities.length > 0 && `Found ${discoveredOpportunities.length} opportunities so far`}
                {aiStrategy.focusAreas.length > 0 && (
                  <span className="ml-2">
                    • Focusing on: {aiStrategy.focusAreas.slice(0, 2).join(', ')}
                  </span>
                )}
              </p>
            </div>
          )}
          
          {/* Continue Button for Process Selection */}
        {phase === 'process-selection' && selectedCount > 0 && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleContinueToRating}
              className="bg-primary-600 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors"
            >
              Continue with {selectedCount} selected →
            </button>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {phase === 'discovery' && (
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me about your business..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
