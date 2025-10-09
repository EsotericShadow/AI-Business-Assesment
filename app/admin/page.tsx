'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Lead {
  id: string
  email: string
  name: string
  businessInfo: string
  selectedProcesses: Array<{
    id: string
    name: string
    rating: number
  }>
  conversationHistory?: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: string
  }>
  reportGenerated: boolean
  consultationRequested: boolean
  implementationRequested: boolean
  createdAt: string
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if running locally
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1'
    
    if (!isLocal) {
      setError('Access Denied: Admin dashboard only available on localhost')
      setLoading(false)
      return
    }

    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads')
      const data = await response.json()
      
      if (data.leads) {
        setLeads(data.leads)
      } else {
        setError('Failed to fetch leads')
      }
    } catch (err) {
      setError('Error fetching leads: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading admin dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded-lg max-w-md">
          <h2 className="text-2xl font-bold mb-2">⛔ {error}</h2>
          <p className="text-sm">This dashboard can only be accessed from localhost for security.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">🔒 Admin Dashboard</h1>
          <p className="text-gray-600">Local Access Only - Lead Management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-semibold mb-2">TOTAL ASSESSMENTS</div>
            <div className="text-4xl font-bold text-blue-600">{leads.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-semibold mb-2">REPORTS EMAILED</div>
            <div className="text-4xl font-bold text-green-600">
              {leads.filter(l => l.reportGenerated).length}
            </div>
          </div>
        </div>

        {leads.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold mb-2">No leads yet</h2>
            <p className="text-gray-600">Complete an assessment to see leads appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Processes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {lead.businessInfo}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {lead.selectedProcesses.length} selected
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {lead.reportGenerated ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          📧 Report Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          ⏳ In Progress
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedLead.name}</h2>
                    <p className="text-gray-600">{selectedLead.email}</p>
                  </div>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Business Information</h3>
                  <p className="text-gray-700">{selectedLead.businessInfo}</p>
                </div>

                {selectedLead.conversationHistory && selectedLead.conversationHistory.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Conversation History</h3>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto space-y-3">
                      {selectedLead.conversationHistory.map((message, idx) => (
                        <div key={idx} className={`${message.role === 'user' ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-green-50 border-l-4 border-green-500'} p-3 rounded`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold text-sm">
                              {message.role === 'user' ? '👤 User' : '🤖 AI Assistant'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-lg mb-2">Selected AI Processes</h3>
                  <div className="space-y-3">
                    {selectedLead.selectedProcesses.map((process, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{process.name}</span>
                          <span className="text-sm text-gray-600">
                            Rating: {process.rating}/5
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Actions Taken</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={selectedLead.reportGenerated ? 'text-green-600' : 'text-gray-400'}>
                        {selectedLead.reportGenerated ? '✅' : '⬜'}
                      </span>
                      <span>Implementation Report Emailed</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <strong>Created:</strong> {new Date(selectedLead.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
