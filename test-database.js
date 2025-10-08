// Test script to verify database connection
// Run with: node test-database.js

const { sql } = require('@vercel/postgres');

async function testDatabase() {
  try {
    console.log('🔄 Testing database connection...');
    
    // Test basic connection
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connected successfully!');
    console.log('Current time:', result.rows[0].current_time);
    
    // Test table creation
    console.log('🔄 Testing table creation...');
    await sql`
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        test_data VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Table creation test passed!');
    
    // Test insert
    console.log('🔄 Testing data insertion...');
    const insertResult = await sql`
      INSERT INTO test_table (test_data) 
      VALUES ('Test data from AI Assessment Tool')
      RETURNING id
    `;
    console.log('✅ Data insertion test passed!');
    console.log('Inserted record ID:', insertResult.rows[0].id);
    
    // Test select
    console.log('🔄 Testing data retrieval...');
    const selectResult = await sql`
      SELECT * FROM test_table 
      ORDER BY created_at DESC 
      LIMIT 1
    `;
    console.log('✅ Data retrieval test passed!');
    console.log('Retrieved data:', selectResult.rows[0]);
    
    // Clean up test table
    await sql`DROP TABLE IF EXISTS test_table`;
    console.log('✅ Cleanup completed!');
    
    console.log('\n🎉 All database tests passed! Your database is ready for production.');
    
  } catch (error) {
    console.error('❌ Database test failed:');
    console.error(error);
    console.log('\n💡 Make sure your DATABASE_URL environment variable is set correctly.');
  }
}

testDatabase();
