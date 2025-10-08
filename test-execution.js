// Test Execution Script for AI Assessment Tool
import { testScenarios } from './test-scenarios.js';

class AITestHarness {
  constructor() {
    this.baseURL = 'http://localhost:3000';
    this.results = [];
    this.currentTest = null;
  }

  async runAllTests() {
    console.log('🚀 Starting AI Assessment Tool Testing');
    console.log(`📊 Testing ${testScenarios.length} business scenarios`);
    console.log('=' * 60);

    for (let i = 0; i < testScenarios.length; i++) {
      const scenario = testScenarios[i];
      console.log(`\n🧪 Test ${i + 1}/25: ${scenario.name}`);
      console.log(`📋 Industry: ${scenario.industry}`);
      
      try {
        const result = await this.runSingleTest(scenario);
        this.results.push(result);
        
        // Add delay between tests to avoid rate limiting
        if (i < testScenarios.length - 1) {
          console.log('⏳ Waiting 2 seconds before next test...');
          await this.sleep(2000);
        }
      } catch (error) {
        console.error(`❌ Test failed for ${scenario.name}:`, error.message);
        this.results.push({
          scenario: scenario.name,
          status: 'FAILED',
          error: error.message,
          processes: [],
          rationales: []
        });
      }
    }

    await this.generateReport();
  }

  async runSingleTest(scenario) {
    this.currentTest = scenario;
    const testResult = {
      scenario: scenario.name,
      industry: scenario.industry,
      businessType: scenario.businessType,
      status: 'RUNNING',
      conversation: [],
      processes: [],
      rationales: [],
      issues: []
    };

    try {
      // Simulate the conversation
      let businessInfo = '';
      let discoveredOpportunities = [];
      let questionCount = 0;

      for (const userInput of scenario.conversation) {
        businessInfo += ' ' + userInput;
        questionCount++;

        console.log(`  💬 User: ${userInput.substring(0, 80)}...`);
        
        const response = await this.sendMessage(userInput, businessInfo, discoveredOpportunities, questionCount);
        testResult.conversation.push({ user: userInput, ai: response });
        
        console.log(`  🤖 AI: ${response.substring(0, 80)}...`);

        // Extract opportunities from AI response
        const newOpportunities = this.extractOpportunities(response);
        discoveredOpportunities = [...new Set([...discoveredOpportunities, ...newOpportunities])];

        // Check if AI is ready to show process cards
        if (response.includes('I have enough information to analyze your processes') || 
            response.includes('analyze your processes') ||
            questionCount >= 4) {
          break;
        }

        await this.sleep(1000); // Brief pause between messages
      }

      // Test process card generation
      console.log('  🎯 Testing process card generation...');
      const processResponse = await this.sendMessage(
        "I have enough information to analyze my processes. Please show me the AI opportunities.",
        businessInfo,
        discoveredOpportunities,
        questionCount + 1
      );

      // Extract process information from response
      const processes = this.extractProcesses(processResponse);
      testResult.processes = processes;

      // Validate process relevance
      const relevanceScore = this.validateProcessRelevance(processes, scenario.expectedProcesses);
      testResult.relevanceScore = relevanceScore;

      // Check for issues
      if (relevanceScore < 0.8) {
        testResult.issues.push(`Low relevance score: ${relevanceScore}`);
      }

      if (processes.length < 6 || processes.length > 10) {
        testResult.issues.push(`Incorrect number of processes: ${processes.length}`);
      }

      // Check for cross-contamination
      const crossContamination = this.checkCrossContamination(processes, scenario.industry);
      if (crossContamination.length > 0) {
        testResult.issues.push(`Cross-contamination: ${crossContamination.join(', ')}`);
      }

      testResult.status = testResult.issues.length === 0 ? 'PASSED' : 'ISSUES';
      
      console.log(`  ✅ Test completed: ${testResult.status}`);
      console.log(`  📈 Relevance Score: ${relevanceScore}`);
      console.log(`  🎯 Processes Found: ${processes.length}`);

    } catch (error) {
      testResult.status = 'FAILED';
      testResult.error = error.message;
      console.error(`  ❌ Test failed: ${error.message}`);
    }

    return testResult;
  }

  async sendMessage(message, businessInfo, discoveredOpportunities, questionCount) {
    const response = await fetch(`${this.baseURL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        context: 'Business process discovery assessment',
        phase: 'discovery',
        businessInfo: businessInfo,
        discoveredOpportunities: discoveredOpportunities,
        questionCount: questionCount
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  }

  extractOpportunities(response) {
    const opportunities = [];
    const responseLower = response.toLowerCase();
    
    const patterns = [
      { keywords: ['manual', 'hand', 'paper'], category: 'automation' },
      { keywords: ['scheduling', 'shifts', 'staff'], category: 'scheduling' },
      { keywords: ['inventory', 'stock', 'ordering'], category: 'inventory' },
      { keywords: ['customer service', 'support'], category: 'customer-service' },
      { keywords: ['data entry', 'entering data'], category: 'data-entry' },
      { keywords: ['integration', 'connect', 'sync'], category: 'integration' },
      { keywords: ['forecasting', 'predict', 'planning'], category: 'predictive' }
    ];
    
    patterns.forEach(pattern => {
      if (pattern.keywords.some(keyword => responseLower.includes(keyword))) {
        opportunities.push(pattern.category);
      }
    });
    
    return opportunities;
  }

  extractProcesses(response) {
    // This is a simplified extraction - in a real implementation,
    // you'd parse the actual process cards from the response
    const processes = [];
    
    // Look for process names in the response
    const processPatterns = [
      'staff-scheduling-optimization', 'equipment-maintenance-prediction',
      'inventory-forecasting', 'demand-prediction', 'route-optimization',
      'proposal-generation', 'customer-service', 'document-creation',
      'performance-analytics', 'data-entry-automation', 'cash-flow-prediction',
      'order-management-automation', 'menu-optimization', 'scheduling',
      'social-media', 'content-creation', 'lead-scoring', 'automated-follow-ups',
      'customer-churn-prediction', 'sales-pattern-analysis', 'quality-control',
      'fraud-detection', 'personalized-recommendations', 'review-management',
      'email-marketing', 'seo-optimization', 'bookkeeping', 'expense-tracking'
    ];
    
    const responseLower = response.toLowerCase();
    processPatterns.forEach(process => {
      if (responseLower.includes(process.replace(/-/g, ' '))) {
        processes.push(process);
      }
    });
    
    return processes;
  }

  validateProcessRelevance(actualProcesses, expectedProcesses) {
    if (expectedProcesses.length === 0) return 1.0;
    
    const matches = actualProcesses.filter(process => 
      expectedProcesses.includes(process)
    ).length;
    
    return matches / expectedProcesses.length;
  }

  checkCrossContamination(processes, industry) {
    const contamination = [];
    
    // Check for restaurant-specific processes in non-restaurant businesses
    if (industry !== 'hospitality' && industry !== 'restaurant') {
      const restaurantProcesses = ['order-management-automation', 'menu-optimization'];
      const found = processes.filter(p => restaurantProcesses.includes(p));
      if (found.length > 0) contamination.push(...found);
    }
    
    // Check for construction-specific processes in non-construction businesses
    if (industry !== 'construction') {
      const constructionProcesses = ['proposal-generation', 'resource-allocation'];
      const found = processes.filter(p => constructionProcesses.includes(p));
      if (found.length > 0) contamination.push(...found);
    }
    
    return contamination;
  }

  async generateReport() {
    console.log('\n' + '=' * 60);
    console.log('📊 TEST RESULTS SUMMARY');
    console.log('=' * 60);
    
    const passed = this.results.filter(r => r.status === 'PASSED').length;
    const issues = this.results.filter(r => r.status === 'ISSUES').length;
    const failed = this.results.filter(r => r.status === 'FAILED').length;
    
    console.log(`✅ Passed: ${passed}`);
    console.log(`⚠️  Issues: ${issues}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${((passed + issues) / this.results.length * 100).toFixed(1)}%`);
    
    // Industry breakdown
    console.log('\n📋 INDUSTRY BREAKDOWN:');
    const industryStats = {};
    this.results.forEach(result => {
      if (!industryStats[result.industry]) {
        industryStats[result.industry] = { passed: 0, issues: 0, failed: 0 };
      }
      industryStats[result.industry][result.status.toLowerCase()]++;
    });
    
    Object.entries(industryStats).forEach(([industry, stats]) => {
      console.log(`  ${industry}: ✅${stats.passed} ⚠️${stats.issues} ❌${stats.failed}`);
    });
    
    // Issues summary
    console.log('\n🚨 ISSUES FOUND:');
    this.results.forEach(result => {
      if (result.issues && result.issues.length > 0) {
        console.log(`  ${result.scenario}: ${result.issues.join(', ')}`);
      }
    });
    
    // Save detailed results
    await this.saveResults();
  }

  async saveResults() {
    const fs = await import('fs');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `test-results-${timestamp}.json`;
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.results.length,
        passed: this.results.filter(r => r.status === 'PASSED').length,
        issues: this.results.filter(r => r.status === 'ISSUES').length,
        failed: this.results.filter(r => r.status === 'FAILED').length
      },
      results: this.results
    };
    
    fs.writeFileSync(filename, JSON.stringify(report, null, 2));
    console.log(`\n💾 Detailed results saved to: ${filename}`);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run the tests
const harness = new AITestHarness();
harness.runAllTests().catch(console.error);
