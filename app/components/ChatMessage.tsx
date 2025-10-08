'use client'

import { Bot, User, Loader2, ChevronDownIcon, SparklesIcon } from 'lucide-react'
import { useState } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type?: 'text' | 'process-cards' | 'rating-request' | 'result-card' | 'cta-buttons' | 'action-buttons'
  data?: any
}

interface ChatMessageProps {
  message: Message
  onProcessSelect?: (processId: string) => void
  onRatingSelect?: (rating: number) => void
  onResultExpand?: (resultId: string) => void
}

export default function ChatMessage({ 
  message, 
  onProcessSelect, 
  onRatingSelect, 
  onResultExpand 
}: ChatMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const renderProcessCards = (processes: any[]) => {
    return (
      <div className="space-y-3">
        {processes.map((process) => (
          <ProcessCard 
            key={process.id} 
            process={process} 
            onSelect={onProcessSelect}
          />
        ))}
      </div>
    )
  }

  const renderRatingRequest = (data: any) => {
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">{data.processName}</h3>
          <p className="text-sm text-blue-700">{data.question}</p>
        </div>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => onRatingSelect?.(rating)}
              className="w-12 h-12 rounded-full bg-primary-600 text-white font-medium text-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center"
            >
              {rating}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Little time</span>
          <span>Lots of time</span>
        </div>
      </div>
    )
  }

  const renderResultCard = (data: any) => {
    return (
      <div className="space-y-3">
        {data.results.map((result: any, index: number) => (
          <div
            key={result.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{result.name}</h3>
                  <p className="text-sm text-gray-600">{result.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < (result.userRating || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  Score: {Math.round(result.finalScore || 0)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-blue-50 rounded p-2">
                <p className="text-xs font-medium text-blue-900">Time</p>
                <p className="text-sm font-semibold text-blue-600">{result.timeSavings}h/week</p>
              </div>
              <div className="bg-green-50 rounded p-2">
                <p className="text-xs font-medium text-green-900">Cost</p>
                <p className="text-sm font-semibold text-green-600">{result.costSavings}%</p>
              </div>
              <div className="bg-purple-50 rounded p-2">
                <p className="text-xs font-medium text-purple-900">Revenue</p>
                <p className="text-sm font-semibold text-purple-600">{result.revenueImpact}%</p>
              </div>
            </div>

            {isExpanded && (
              <div className="mt-4 pt-4 border-t">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Recommended Tools:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.suggestedTools.map((tool: string) => (
                        <span
                          key={tool}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Implementation:</p>
                    <p className="text-sm text-gray-600">
                      {result.implementationComplexity === 'easy' ? '✓ Easy (1-2 weeks)' : 
                       result.implementationComplexity === 'medium' ? '⚡ Medium (2-4 weeks)' : 
                       '🔧 Complex (1-3 months)'}
                    </p>
                    <p className="text-sm text-gray-600">
                      💲 ${result.estimatedCost || '20-50'}/month
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderContent = () => {
    switch (message.type) {
      case 'process-cards':
        return renderProcessCards(message.data)
      case 'rating-request':
        return renderRatingRequest(message.data)
      case 'result-card':
        return renderResultCard(message.data)
      case 'cta-buttons':
        return renderCTAButtons()
      case 'action-buttons':
        return renderActionButtons()
      default:
        return (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )
    }
  }

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            message.role === 'user'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-900 shadow-sm border'
          }`}
        >
          {message.role === 'assistant' && (
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                {renderContent()}
                <p className="text-xs opacity-70 mt-2">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          )}
          
          {message.role === 'user' && (
            <div className="flex items-start space-x-2">
              <div className="flex-1">
                {renderContent()}
                <p className="text-xs opacity-70 mt-2">
                  {formatTime(message.timestamp)}
                </p>
              </div>
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Process Card Component
function ProcessCard({ process, onSelect }: { process: any, onSelect?: (id: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't expand if clicking the select button
    if ((e.target as HTMLElement).closest('.select-button')) {
      return
    }
    setIsExpanded(!isExpanded)
  }

  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect?.(process.id)
  }

  return (
    <div
      className={`relative overflow-hidden border-2 rounded-xl transition-all duration-300 ${
        process.isSelected
          ? 'border-green-500 bg-green-50 shadow-lg shadow-green-100'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
    >
      {/* Header with checkbox */}
      <div className="flex items-start justify-between p-5 pb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {process.name}
            </h3>
            {/* AI Potential Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
              process.aiPotential === 'high' 
                ? 'bg-green-100 text-green-700' 
                : process.aiPotential === 'medium'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {process.aiPotential} potential
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {process.description}
          </p>
        </div>
        
        {/* Selection Checkbox */}
        <button onClick={handleSelectClick} className="ml-4 flex-shrink-0">
          <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${
            process.isSelected 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300 hover:border-green-400'
          }`}>
            {process.isSelected && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Key Metrics - Prominently Displayed */}
      <div className="px-5 pb-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-xs font-medium text-blue-600 mb-1">Time Saved</div>
            <div className="text-lg font-bold text-blue-900">{process.timeSavings}h/wk</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-xs font-medium text-green-600 mb-1">Cost Savings</div>
            <div className="text-lg font-bold text-green-900">{process.costSavings}%</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <div className="text-xs font-medium text-purple-600 mb-1">Revenue Impact</div>
            <div className="text-lg font-bold text-purple-900">+{process.revenueImpact}%</div>
          </div>
        </div>
      </div>

      {/* Expand/Collapse Button */}
      <button 
        onClick={handleCardClick}
        className="w-full px-5 py-3 border-t border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between"
      >
        <span className="text-sm font-medium text-gray-700">
          {isExpanded ? 'Hide' : 'View'} Details
        </span>
        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}/>
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-4 border-t border-gray-100 bg-gray-50 space-y-4">
          {/* AI Recommendation Rationale - Show in expanded view */}
          {process.aiRationale && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex items-start">
                <SparklesIcon className="w-5 h-5 text-blue-600 mr-2 mt-0.5"/>
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    Why This Was Recommended
                  </h4>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {process.aiRationale}
                  </p>
                </div>
              </div>
            </div>
          )}

          {process.detailedDescription && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">What This Means</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{process.detailedDescription}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            {process.implementationTimeline && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Timeline</h4>
                <p className="text-sm text-gray-600">{process.implementationTimeline}</p>
              </div>
            )}
            {process.monthlyCost && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Monthly Cost</h4>
                <p className="text-sm text-gray-600">{process.monthlyCost}</p>
              </div>
            )}
            {process.setupCost && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Setup Cost</h4>
                <p className="text-sm text-gray-600">{process.setupCost}</p>
              </div>
            )}
            {process.expectedROI && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Expected ROI</h4>
                <p className="text-sm text-gray-600">{process.expectedROI}</p>
              </div>
            )}
          </div>

          {process.maintenanceDescription && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Maintenance</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{process.maintenanceDescription}</p>
            </div>
          )}

          {process.prerequisites && process.prerequisites.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">What You'll Need</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {process.prerequisites.map((req: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {process.suggestedTools && process.suggestedTools.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Recommended Tools</h4>
              <div className="flex flex-wrap gap-2">
                {process.suggestedTools.map((tool: string) => (
                  <span
                    key={tool}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Fallback for missing data */}
          {!process.detailedDescription && (
            <div className="text-sm text-gray-500 italic">
              Contact us for detailed implementation information for your specific business.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Loading message component
export function LoadingMessage({ status }: { status: string }) {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%]">
        <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border">
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{status}</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// CTA Buttons Component
function renderCTAButtons() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to get started?</h3>
        <p className="text-gray-600 mb-4">Choose your next step:</p>
      </div>
    </div>
  )
}

// Action Buttons Component  
function renderActionButtons() {
  return (
    <div className="space-y-3">
      <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3">
        <span className="text-2xl">📧</span>
        <div className="text-left">
          <div className="font-bold">Get Detailed Report</div>
          <div className="text-sm opacity-90">Full implementation plan emailed to you</div>
        </div>
      </button>
      
      <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3">
        <span className="text-2xl">💬</span>
        <div className="text-left">
          <div className="font-bold">Book Strategy Call</div>
          <div className="text-sm opacity-90">30-min consultation with our AI experts</div>
        </div>
      </button>
      
      <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3">
        <span className="text-2xl">🚀</span>
        <div className="text-left">
          <div className="font-bold">Start Implementation</div>
          <div className="text-sm opacity-90">We'll help you set up your first AI solution</div>
        </div>
      </button>
    </div>
  )
}
