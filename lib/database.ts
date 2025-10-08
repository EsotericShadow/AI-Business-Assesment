import { sql } from '@vercel/postgres'

export interface Lead {
  id?: string
  email: string
  name: string
  businessInfo: string
  selectedProcesses: Array<{
    id: string
    name: string
    rating: number
  }>
  reportGenerated?: boolean
  consultationRequested?: boolean
  implementationRequested?: boolean
  timestamp: Date
  createdAt?: Date
}

// Create leads table if it doesn't exist
export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        business_info TEXT NOT NULL,
        selected_processes JSONB NOT NULL,
        report_generated BOOLEAN DEFAULT FALSE,
        consultation_requested BOOLEAN DEFAULT FALSE,
        implementation_requested BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    // Create index on email for faster lookups
    await sql`
      CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email)
    `
    
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}

// Store a new lead
export async function storeLead(leadData: Lead): Promise<string> {
  try {
    const result = await sql`
      INSERT INTO leads (
        email, 
        name, 
        business_info, 
        selected_processes,
        report_generated,
        consultation_requested,
        implementation_requested
      ) VALUES (
        ${leadData.email},
        ${leadData.name},
        ${leadData.businessInfo},
        ${JSON.stringify(leadData.selectedProcesses)},
        ${leadData.reportGenerated || false},
        ${leadData.consultationRequested || false},
        ${leadData.implementationRequested || false}
      ) RETURNING id
    `
    
    const leadId = result.rows[0].id
    console.log(`Lead stored with ID: ${leadId}`)
    return leadId.toString()
  } catch (error) {
    console.error('Error storing lead:', error)
    throw error
  }
}

// Get all leads
export async function getAllLeads(): Promise<Lead[]> {
  try {
    const result = await sql`
      SELECT * FROM leads 
      ORDER BY created_at DESC
    `
    
    return result.rows.map(row => ({
      id: row.id.toString(),
      email: row.email,
      name: row.name,
      businessInfo: row.business_info,
      selectedProcesses: row.selected_processes,
      reportGenerated: row.report_generated,
      consultationRequested: row.consultation_requested,
      implementationRequested: row.implementation_requested,
      timestamp: new Date(row.created_at),
      createdAt: new Date(row.created_at)
    }))
  } catch (error) {
    console.error('Error fetching leads:', error)
    throw error
  }
}

// Get lead by email
export async function getLeadByEmail(email: string): Promise<Lead | null> {
  try {
    const result = await sql`
      SELECT * FROM leads 
      WHERE email = ${email}
      ORDER BY created_at DESC
      LIMIT 1
    `
    
    if (result.rows.length === 0) {
      return null
    }
    
    const row = result.rows[0]
    return {
      id: row.id.toString(),
      email: row.email,
      name: row.name,
      businessInfo: row.business_info,
      selectedProcesses: row.selected_processes,
      reportGenerated: row.report_generated,
      consultationRequested: row.consultation_requested,
      implementationRequested: row.implementation_requested,
      timestamp: new Date(row.created_at),
      createdAt: new Date(row.created_at)
    }
  } catch (error) {
    console.error('Error fetching lead by email:', error)
    throw error
  }
}

// Update lead status
export async function updateLeadStatus(
  email: string, 
  updates: {
    reportGenerated?: boolean
    consultationRequested?: boolean
    implementationRequested?: boolean
  }
): Promise<void> {
  try {
    // Build dynamic update query
    let query = 'UPDATE leads SET '
    const setParts = []
    const values = []
    
    if (updates.reportGenerated !== undefined) {
      setParts.push(`report_generated = $${values.length + 1}`)
      values.push(updates.reportGenerated)
    }
    
    if (updates.consultationRequested !== undefined) {
      setParts.push(`consultation_requested = $${values.length + 1}`)
      values.push(updates.consultationRequested)
    }
    
    if (updates.implementationRequested !== undefined) {
      setParts.push(`implementation_requested = $${values.length + 1}`)
      values.push(updates.implementationRequested)
    }
    
    if (setParts.length === 0) return
    
    setParts.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(email)
    
    query += setParts.join(', ') + ` WHERE email = $${values.length}`
    
    await sql.query(query, values)
    
    console.log(`Lead status updated for: ${email}`)
  } catch (error) {
    console.error('Error updating lead status:', error)
    throw error
  }
}
