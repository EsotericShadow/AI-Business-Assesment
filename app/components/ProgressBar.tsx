'use client'

import { useState } from 'react'

interface ProgressBarProps {
  currentPhase: 'discovery' | 'process-selection' | 'rating' | 'results'
  onExit?: () => void
}

export default function ProgressBar({ currentPhase, onExit }: ProgressBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const phases = [
    { id: 'discovery', label: 'Discovery', shortLabel: 'Disc', icon: '💬' },
    { id: 'process-selection', label: 'Processes', shortLabel: 'Proc', icon: '🎯' },
    { id: 'rating', label: 'Rating', shortLabel: 'Rate', icon: '⭐' },
    { id: 'results', label: 'Results', shortLabel: 'Done', icon: '📊' }
  ]

  const currentIndex = phases.findIndex(phase => phase.id === currentPhase)
  const progressPercentage = ((currentIndex + 1) / phases.length) * 100

  return (
    <div className="glass border-b border-gray-200/50 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 safe-top sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        {/* Exit Button - Compact on mobile */}
        <button
          onClick={onExit}
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors min-w-touch min-h-touch -ml-2 sm:-ml-1 justify-center touch-ripple"
          aria-label="Exit assessment"
        >
          <span className="text-base sm:text-lg">←</span>
          <span className="text-xs sm:text-sm font-medium hidden xs:inline">Exit</span>
        </button>

        {/* Progress Indicator - Responsive Layout */}
        <div className="flex-1 flex items-center justify-center px-2 sm:px-4">
          {/* Mobile: Icons only with tap to expand */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-1.5 touch-action-manipulation"
              aria-label={`Current step: ${phases[currentIndex]?.label}`}
              aria-expanded={isExpanded}
            >
              {phases.map((phase, index) => (
                <div key={phase.id} className="flex items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                      index <= currentIndex
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'bg-gray-200 text-gray-500'
                    } ${index === currentIndex ? 'scale-110' : ''}`}
                  >
                    {index < currentIndex ? '✓' : phase.icon}
                  </div>
                  {index < phases.length - 1 && (
                    <div
                      className={`w-4 h-0.5 mx-0.5 transition-all duration-300 ${
                        index < currentIndex ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </button>
            {isExpanded && (
              <div className="absolute left-0 right-0 top-full mt-1 glass-strong py-2 px-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">
                    {phases[currentIndex]?.label}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Step {currentIndex + 1} of {phases.length} • {Math.round(progressPercentage)}%
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tablet: Icons + abbreviated labels */}
          <div className="hidden sm:flex lg:hidden items-center space-x-2">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      index <= currentIndex
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index < currentIndex ? '✓' : phase.icon}
                  </div>
                  <span className={`text-xs mt-1 transition-colors duration-300 ${
                    index === currentIndex ? 'text-gray-900 font-medium' : 'text-gray-500'
                  }`}>
                    {phase.shortLabel}
                  </span>
                </div>
                {index < phases.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-1.5 transition-all duration-300 ${
                      index < currentIndex ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Desktop: Full labels + step info */}
          <div className="hidden lg:flex items-center space-x-3">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-medium transition-all duration-300 ${
                      index <= currentIndex
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index < currentIndex ? '✓' : phase.icon}
                  </div>
                  <span className={`text-sm mt-1.5 transition-colors duration-300 ${
                    index === currentIndex ? 'text-gray-900 font-semibold' : 'text-gray-500'
                  }`}>
                    {phase.label}
                  </span>
                </div>
                {index < phases.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                      index < currentIndex ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Phase Label - Desktop only */}
        <div className="hidden lg:block text-right min-w-[100px]">
          <p className="text-sm font-semibold text-gray-900">
            {phases[currentIndex]?.label}
          </p>
          <p className="text-xs text-gray-600">
            Step {currentIndex + 1} of {phases.length}
          </p>
        </div>

        {/* Mobile Step Counter */}
        <div className="lg:hidden text-right min-w-[50px] sm:min-w-[60px]">
          <p className="text-xs sm:text-sm font-medium text-gray-900">
            {currentIndex + 1}/{phases.length}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-600 hidden xs:block">
            {Math.round(progressPercentage)}%
          </p>
        </div>
      </div>

      {/* Progress bar - Mobile only */}
      <div className="sm:hidden mt-2 -mx-3">
        <div className="h-1 bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-primary-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}