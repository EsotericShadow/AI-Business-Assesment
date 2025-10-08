'use client'

import { useState } from 'react'
import { Mail, User, ArrowRight } from 'lucide-react'

interface LeadCaptureFormProps {
  onComplete: (email: string, name: string) => void
}

export default function LeadCaptureForm({ onComplete }: LeadCaptureFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    setIsValid(validateEmail(value) && name.trim().length > 0)
  }

  const handleNameChange = (value: string) => {
    setName(value)
    setIsValid(validateEmail(email) && value.trim().length > 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || isSubmitting) return

    setIsSubmitting(true)
    
    // Save to session storage
    sessionStorage.setItem('assessment_user_email', email)
    sessionStorage.setItem('assessment_user_name', name)
    
    // Small delay for UX
    setTimeout(() => {
      onComplete(email, name)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-3 sm:p-4 safe-top safe-bottom">
      <div className="w-full max-w-md">
        {/* Logo/Header - Mobile optimized */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
            <span className="text-xl sm:text-2xl">🤖</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2 px-4">
            AI Business Assessment
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            Discover AI opportunities for your Northern BC business
          </p>
        </div>

        {/* Form - Mobile optimized */}
        <div className="glass-strong rounded-2xl shadow-xl p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-h-touch"
                  style={{ fontSize: '16px' }}
                  placeholder="your@email.com"
                  autoFocus
                  autoComplete="email"
                  inputMode="email"
                  required
                />
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-h-touch"
                  style={{ fontSize: '16px' }}
                  placeholder="John Smith"
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* Submit Button - Mobile optimized */}
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-medium text-base sm:text-lg transition-all duration-200 flex items-center justify-center space-x-2 min-h-touch touch-ripple ${
                isValid && !isSubmitting
                  ? 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              aria-label="Start AI assessment"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Starting...</span>
                </>
              ) : (
                <>
                  <span>Start Assessment</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          </form>

          {/* Privacy Note */}
          <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-3 sm:mt-4 px-2">
            We'll email your results and never share your information.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-xs sm:text-sm text-gray-600">
            Powered by{' '}
            <span className="font-semibold text-primary-600">Evergreen Web Solutions</span>
          </p>
        </div>
      </div>
    </div>
  )
}
