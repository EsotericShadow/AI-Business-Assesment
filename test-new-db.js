// Test script for new AI Assessment database
const { sql } = require('@vercel/postgres');

async function testNewDatabase() {
  try {
    // Set the connection string for this test
    process.env.POSTGRES_URL = 'postgresql://neondb_owner:npg_vg3GE6XxOqsK@ep-withered-lake-ad378t9o-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';
    
    console.log('🔄 Testing NEW AI Assessment database connection...');
    
    // Test basic connection
    const result = await sql`SELECT NOW() as current_time, current_database() as db_name`;
    console.log('✅ Database connected successfully!');
    console.log('Current time:', result.rows[0].current_time);
    console.log('Database name:', result.rows[0].db_name);
    
    // Check if leads table exists
    console.log('\n🔄 Checking for existing tables...');
    const tableCheck = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    if (tableCheck.rows.length > 0) {
      console.log('📋 Existing tables:');
      tableCheck.rows.forEach(row => {
        console.log('  - ' + row.table_name);
      });
    } else {
      console.log('✨ Database is empty - ready for initialization!');
    }
    
    console.log('\n🎉 New database connection verified! Safe to proceed with initialization.');
    
  } catch (error) {
    console.error('❌ Database test failed:');
    console.error(error);
  }
}

testNewDatabase();
