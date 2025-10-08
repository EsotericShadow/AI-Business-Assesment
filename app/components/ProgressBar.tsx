'use client'

interface ProgressBarProps {
  currentPhase: 'discovery' | 'process-selection' | 'rating' | 'results'
  onExit?: () => void
}

export default function ProgressBar({ currentPhase, onExit }: ProgressBarProps) {
  const phases = [
    { id: 'discovery', label: 'Discovery', icon: '💬' },
    { id: 'process-selection', label: 'Processes', icon: '🎯' },
    { id: 'rating', label: 'Rating', icon: '⭐' },
    { id: 'results', label: 'Results', icon: '📊' }
  ]

  const currentIndex = phases.findIndex(phase => phase.id === currentPhase)

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Exit Button */}
        <button
          onClick={onExit}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <span className="text-lg">←</span>
          <span className="text-sm font-medium">Exit</span>
        </button>

        {/* Progress Indicator */}
        <div className="flex items-center space-x-2">
          {phases.map((phase, index) => (
            <div key={phase.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  index <= currentIndex
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentIndex ? '✓' : phase.icon}
              </div>
              {index < phases.length - 1 && (
                <div
                  className={`w-8 h-0.5 mx-1 transition-all duration-300 ${
                    index < currentIndex ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Phase Label */}
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {phases[currentIndex]?.label}
          </p>
          <p className="text-xs text-gray-500">
            Step {currentIndex + 1} of {phases.length}
          </p>
        </div>
      </div>
    </div>
  )
}
