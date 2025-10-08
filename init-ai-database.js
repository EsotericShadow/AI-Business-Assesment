// Initialize AI Assessment Database Schema
const { sql } = require('@vercel/postgres');

async function initializeAIDatabase() {
  try {
    // Set the connection string
    process.env.POSTGRES_URL = 'postgresql://neondb_owner:npg_vg3GE6XxOqsK@ep-withered-lake-ad378t9o-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';
    
    console.log('🚀 Initializing AI Assessment Database...\n');
    
    // Create leads table
    console.log('📋 Creating leads table...');
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
    `;
    console.log('✅ Leads table created');
    
    // Create index on email for faster lookups
    console.log('📋 Creating email index...');
    await sql`
      CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email)
    `;
    console.log('✅ Email index created');
    
    // Create index on created_at for sorting
    console.log('📋 Creating timestamp index...');
    await sql`
      CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC)
    `;
    console.log('✅ Timestamp index created');
    
    // Verify table creation
    console.log('\n🔄 Verifying tables...');
    const tableCheck = await sql`
      SELECT 
        table_name,
        (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
      FROM information_schema.tables t
      WHERE table_schema = 'public'
    `;
    
    console.log('✅ Database tables:');
    tableCheck.rows.forEach(row => {
      console.log(`  - ${row.table_name} (${row.column_count} columns)`);
    });
    
    // Show table structure
    console.log('\n📊 Leads table structure:');
    const columnCheck = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'leads'
      ORDER BY ordinal_position
    `;
    
    columnCheck.rows.forEach(row => {
      const nullable = row.is_nullable === 'YES' ? '(nullable)' : '(required)';
      console.log(`  - ${row.column_name}: ${row.data_type} ${nullable}`);
    });
    
    console.log('\n🎉 AI Assessment Database initialized successfully!');
    console.log('\n📝 Next steps:');
    console.log('  1. Update your .env.local with the new DATABASE_URL');
    console.log('  2. Add POSTGRES_URL to your Vercel environment variables');
    console.log('  3. Restart your development server');
    console.log('  4. Test the complete flow at http://localhost:3001');
    
  } catch (error) {
    console.error('❌ Database initialization failed:');
    console.error(error);
  }
}

initializeAIDatabase();
