'use client'

import { useState, useEffect } from 'react'
import LeadCaptureForm from './components/LeadCaptureForm'
import ChatInterface from './components/ChatInterface'

type AppPhase = 'lead-capture' | 'chat'

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>('lead-capture')
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')

  // Check for existing session on load
  useEffect(() => {
    const savedEmail = sessionStorage.getItem('assessment_user_email')
    const savedName = sessionStorage.getItem('assessment_user_name')
    
    if (savedEmail && savedName) {
      setUserEmail(savedEmail)
      setUserName(savedName)
      setPhase('chat')
    }
  }, [])

  const handleLeadCaptureComplete = (email: string, name: string) => {
    setUserEmail(email)
    setUserName(name)
    setPhase('chat')
  }

  const handleExit = () => {
    // Clear session and return to lead capture
    sessionStorage.removeItem('assessment_user_email')
    sessionStorage.removeItem('assessment_user_name')
    sessionStorage.removeItem('assessment_data')
    setPhase('lead-capture')
    setUserEmail('')
    setUserName('')
  }

  if (phase === 'lead-capture') {
    return <LeadCaptureForm onComplete={handleLeadCaptureComplete} />
  }

  return (
    <ChatInterface 
      userEmail={userEmail}
      userName={userName}
      onExit={handleExit}
    />
  )
}