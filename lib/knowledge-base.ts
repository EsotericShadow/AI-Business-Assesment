// AI Knowledge Base System
// Aggregates and provides access to all research data for intelligent AI decision-making

export interface CaseStudy {
  id: string
  title: string
  industry: string
  businessType: string
  problem: string
  solution: string
  results: string[]
  costs: {
    setup?: string
    monthly?: string
    roi?: string
  }
  timeline: string
  tools: string[]
  source: string
}

export interface IndustryPattern {
  industry: string
  commonPainPoints: string[]
  typicalSolutions: string[]
  costBenchmarks: {
    low: string
    medium: string
    high: string
  }
  implementationTimeline: string
  successFactors: string[]
}

export interface ToolRecommendation {
  name: string
  category: string
  pricing: {
    free: boolean
    monthly: string
    setup: string
  }
  complexity: 'easy' | 'medium' | 'complex'
  features: string[]
  bestFor: string[]
  northernBCConsiderations: string[]
}

export interface ImplementationStrategy {
  processId: string
  steps: string[]
  prerequisites: string[]
  timeline: string
  commonChallenges: string[]
  successMetrics: string[]
  northernBCAdaptations: string[]
}

export interface CostBenchmark {
  processId: string
  industry: string
  setupCost: {
    low: number
    medium: number
    high: number
  }
  monthlyCost: {
    low: number
    medium: number
    high: number
  }
  roi: {
    paybackMonths: number
    annualSavings: number
  }
}

export interface ROIData {
  processId: string
  industry: string
  timeSavings: number
  costSavings: number
  revenueImpact: number
  implementationCost: number
  paybackPeriod: number
  caseStudyReferences: string[]
}

export interface KnowledgeBase {
  caseStudies: CaseStudy[]
  industryPatterns: IndustryPattern[]
  toolRecommendations: ToolRecommendation[]
  implementationStrategies: ImplementationStrategy[]
  costBenchmarks: CostBenchmark[]
  roiData: ROIData[]
}

export class KnowledgeBaseManager {
  private knowledgeBase: KnowledgeBase
  private initialized: boolean = false

  constructor() {
    this.knowledgeBase = {
      caseStudies: [],
      industryPatterns: [],
      toolRecommendations: [],
      implementationStrategies: [],
      costBenchmarks: [],
      roiData: []
    }
  }

  async initialize(): Promise<void> {
    if (this.initialized) return

    // Load all research data
    await this.loadCaseStudies()
    await this.loadIndustryPatterns()
    await this.loadToolRecommendations()
    await this.loadImplementationStrategies()
    await this.loadCostBenchmarks()
    await this.loadROIData()

    this.initialized = true
  }

  private async loadCaseStudies(): Promise<void> {
    // Parse case studies from research files
    this.knowledgeBase.caseStudies = [
      {
        id: 'henrys-coffee',
        title: "Henry's House of Coffee",
        industry: 'Food Service',
        businessType: 'Coffee Roasting',
        problem: 'Customer engagement and operational efficiency',
        solution: 'AI-enhanced customer service and operations',
        results: [
          'Improved SEO strategies',
          'Customer lifetime value analysis',
          'Custom chatbots for better engagement',
          'Enhanced operational efficiency',
          'Better competitiveness in market'
        ],
        costs: {
          setup: '$2,000-5,000',
          monthly: '$150-300',
          roi: '6-12 months'
        },
        timeline: '2-3 months',
        tools: ['Custom Chatbots', 'SEO AI', 'Analytics'],
        source: 'CopyRocket AI'
      },
      {
        id: 'local-bakery',
        title: 'Local Bakery (Inventory Management)',
        industry: 'Food Service',
        businessType: 'Bakery',
        problem: 'Food waste and inventory planning',
        solution: 'AI-driven demand prediction',
        results: [
          'Reduced food waste',
          'Increased sales',
          'Improved customer satisfaction',
          'Better inventory planning'
        ],
        costs: {
          setup: '$1,000-3,000',
          monthly: '$75-150',
          roi: '3-6 months'
        },
        timeline: '1-2 months',
        tools: ['Demand Prediction AI', 'Inventory Management'],
        source: 'SinJun AI'
      }
    ]
  }

  private async loadIndustryPatterns(): Promise<void> {
    this.knowledgeBase.industryPatterns = [
      {
        industry: 'Restaurant',
        commonPainPoints: [
          'Manual order entry between systems',
          'Inventory waste and overstocking',
          'Staff scheduling conflicts',
          'End-of-shift calculations',
          'Customer service response time'
        ],
        typicalSolutions: [
          'Order management automation',
          'Predictive inventory management',
          'Staff scheduling optimization',
          'Automated tip calculations',
          'AI customer service chatbots'
        ],
        costBenchmarks: {
          low: '$50-150/month',
          medium: '$150-300/month',
          high: '$300-500/month'
        },
        implementationTimeline: '2-4 weeks',
        successFactors: [
          'POS system integration',
          'Staff training and adoption',
          'Data quality and consistency',
          'Local supplier relationships'
        ]
      },
      {
        industry: 'Retail',
        commonPainPoints: [
          'Inventory management',
          'Customer service scaling',
          'Marketing personalization',
          'Fraud detection',
          'Demand forecasting'
        ],
        typicalSolutions: [
          'Inventory forecasting',
          'AI customer service',
          'Personalized recommendations',
          'Fraud detection systems',
          'Dynamic pricing'
        ],
        costBenchmarks: {
          low: '$100-200/month',
          medium: '$200-400/month',
          high: '$400-800/month'
        },
        implementationTimeline: '1-3 months',
        successFactors: [
          'Historical sales data',
          'Customer data quality',
          'Staff training',
          'System integration'
        ]
      }
    ]
  }

  private async loadToolRecommendations(): Promise<void> {
    this.knowledgeBase.toolRecommendations = [
      {
        name: 'Zapier',
        category: 'Automation',
        pricing: {
          free: true,
          monthly: '$20-50',
          setup: '$0'
        },
        complexity: 'easy',
        features: ['System Integration', 'Workflow Automation', 'Data Sync'],
        bestFor: ['Small businesses', 'Simple integrations', 'Quick wins'],
        northernBCConsiderations: ['Reliable internet required', 'Good for remote work']
      },
      {
        name: 'Square',
        category: 'POS & Payments',
        pricing: {
          free: false,
          monthly: '$60-200',
          setup: '$0-500'
        },
        complexity: 'medium',
        features: ['POS System', 'Payment Processing', 'Inventory Management', 'Analytics'],
        bestFor: ['Restaurants', 'Retail stores', 'Service businesses'],
        northernBCConsiderations: ['Works well in remote areas', 'Offline capability']
      },
      {
        name: 'HubSpot',
        category: 'CRM & Marketing',
        pricing: {
          free: true,
          monthly: '$50-1,200',
          setup: '$0-2,000'
        },
        complexity: 'medium',
        features: ['CRM', 'Email Marketing', 'Lead Scoring', 'Analytics'],
        bestFor: ['Service businesses', 'B2B companies', 'Growing businesses'],
        northernBCConsiderations: ['Cloud-based', 'Good for distributed teams']
      }
    ]
  }

  private async loadImplementationStrategies(): Promise<void> {
    this.knowledgeBase.implementationStrategies = [
      {
        processId: 'order-management-automation',
        steps: [
          'Audit current systems and data flow',
          'Choose integration platform (Zapier, Make.com, or custom)',
          'Map data fields between systems',
          'Test integration with sample data',
          'Train staff on new workflow',
          'Monitor and optimize performance'
        ],
        prerequisites: [
          'Existing POS system',
          'Stable internet connection',
          'Staff training time',
          'Data backup procedures'
        ],
        timeline: '2-4 weeks',
        commonChallenges: [
          'Data format mismatches',
          'Staff resistance to change',
          'Internet connectivity issues',
          'System downtime during transition'
        ],
        successMetrics: [
          'Reduced manual data entry time',
          'Fewer order errors',
          'Faster order processing',
          'Staff satisfaction scores'
        ],
        northernBCAdaptations: [
          'Plan for internet outages',
          'Have offline backup procedures',
          'Consider local IT support',
          'Account for seasonal business variations'
        ]
      }
    ]
  }

  private async loadCostBenchmarks(): Promise<void> {
    this.knowledgeBase.costBenchmarks = [
      {
        processId: 'order-management-automation',
        industry: 'Restaurant',
        setupCost: {
          low: 500,
          medium: 1500,
          high: 3000
        },
        monthlyCost: {
          low: 50,
          medium: 100,
          high: 200
        },
        roi: {
          paybackMonths: 6,
          annualSavings: 12000
        }
      },
      {
        processId: 'inventory-forecasting',
        industry: 'Restaurant',
        setupCost: {
          low: 1000,
          medium: 3000,
          high: 5000
        },
        monthlyCost: {
          low: 100,
          medium: 200,
          high: 400
        },
        roi: {
          paybackMonths: 8,
          annualSavings: 15000
        }
      }
    ]
  }

  private async loadROIData(): Promise<void> {
    this.knowledgeBase.roiData = [
      {
        processId: 'order-management-automation',
        industry: 'Restaurant',
        timeSavings: 12,
        costSavings: 30,
        revenueImpact: 25,
        implementationCost: 1500,
        paybackPeriod: 6,
        caseStudyReferences: ['henrys-coffee', 'local-bakery']
      },
      {
        processId: 'inventory-forecasting',
        industry: 'Restaurant',
        timeSavings: 15,
        costSavings: 20,
        revenueImpact: 25,
        implementationCost: 3000,
        paybackPeriod: 8,
        caseStudyReferences: ['local-bakery']
      }
    ]
  }

  // Public API methods
  async getIndustryContext(industry: string): Promise<{
    patterns: IndustryPattern[]
    caseStudies: CaseStudy[]
    benchmarks: CostBenchmark[]
  }> {
    await this.initialize()
    
    const patterns = this.knowledgeBase.industryPatterns.filter(p => 
      p.industry.toLowerCase().includes(industry.toLowerCase())
    )
    
    const caseStudies = this.knowledgeBase.caseStudies.filter(c => 
      c.industry.toLowerCase().includes(industry.toLowerCase())
    )
    
    const benchmarks = this.knowledgeBase.costBenchmarks.filter(b => 
      b.industry.toLowerCase().includes(industry.toLowerCase())
    )

    return { patterns, caseStudies, benchmarks }
  }

  async getProcessContext(processId: string): Promise<{
    strategy: ImplementationStrategy | undefined
    benchmarks: CostBenchmark[]
    roiData: ROIData[]
    tools: ToolRecommendation[]
  }> {
    await this.initialize()
    
    const strategy = this.knowledgeBase.implementationStrategies.find(s => s.processId === processId)
    const benchmarks = this.knowledgeBase.costBenchmarks.filter(b => b.processId === processId)
    const roiData = this.knowledgeBase.roiData.filter(r => r.processId === processId)
    const tools = this.knowledgeBase.toolRecommendations

    return { strategy, benchmarks, roiData, tools }
  }

  async getQuestioningStrategy(businessType: string, discoveredInfo: string[]): Promise<{
    priorityQuestions: string[]
    skipAreas: string[]
    focusAreas: string[]
  }> {
    await this.initialize()
    
    const industry = businessType.toLowerCase()
    const patterns = this.knowledgeBase.industryPatterns.find(p => 
      p.industry.toLowerCase().includes(industry)
    )

    if (!patterns) {
      return {
        priorityQuestions: [
          'What are your biggest operational challenges?',
          'How do you currently handle customer service?',
          'What takes up the most time in your daily operations?'
        ],
        skipAreas: [],
        focusAreas: ['general operations', 'customer service', 'admin tasks']
      }
    }

    // Generate dynamic questions based on discovered info and industry patterns
    const priorityQuestions: string[] = []
    const skipAreas: string[] = []
    const focusAreas: string[] = []

    // If manual processes mentioned, focus on automation
    if (discoveredInfo.some(info => info.includes('manual'))) {
      focusAreas.push('automation')
      priorityQuestions.push('What manual processes take up the most time?')
    }

    // If inventory mentioned, focus on forecasting
    if (discoveredInfo.some(info => info.includes('inventory'))) {
      focusAreas.push('inventory management')
      priorityQuestions.push('How do you currently track and order inventory?')
    }

    // If scheduling mentioned, focus on optimization
    if (discoveredInfo.some(info => info.includes('scheduling'))) {
      focusAreas.push('staff scheduling')
      priorityQuestions.push('How do you handle staff scheduling and availability?')
    }

    // Add industry-specific questions
    if (industry.includes('restaurant')) {
      priorityQuestions.push('How do you handle orders from different channels (dine-in, delivery, takeout)?')
      focusAreas.push('order management', 'kitchen operations')
    }

    if (industry.includes('retail')) {
      priorityQuestions.push('How do you track customer preferences and buying patterns?')
      focusAreas.push('customer analytics', 'inventory optimization')
    }

    return { priorityQuestions, skipAreas, focusAreas }
  }

  async getRecommendationRationale(processId: string, businessContext: string): Promise<string> {
    await this.initialize()
    
    const context = await this.getProcessContext(processId)
    const industry = businessContext.toLowerCase()
    
    let rationale = `Based on your business context, ${processId} is recommended because:`
    
    if (context.strategy) {
      rationale += `\n- Implementation timeline: ${context.strategy.timeline}`
      rationale += `\n- Key benefits: ${context.strategy.successMetrics.slice(0, 3).join(', ')}`
    }
    
    if (context.benchmarks.length > 0) {
      const benchmark = context.benchmarks[0]
      rationale += `\n- Typical costs: $${benchmark.setupCost.medium} setup, $${benchmark.monthlyCost.medium}/month`
      rationale += `\n- Expected ROI: ${benchmark.roi.paybackMonths} month payback period`
    }
    
    // Add Northern BC specific considerations
    if (context.strategy?.northernBCAdaptations) {
      rationale += `\n- Northern BC considerations: ${context.strategy.northernBCAdaptations.slice(0, 2).join(', ')}`
    }
    
    return rationale
  }

  async getRelevantContext(businessInfo: string, discoveredOpportunities: string[], phase: string): Promise<string> {
    await this.initialize()
    
    const industry = this.extractIndustry(businessInfo)
    const industryContext = await this.getIndustryContext(industry)
    
    let context = `RELEVANT RESEARCH CONTEXT:\n\n`
    
    // Add industry patterns
    if (industryContext.patterns.length > 0) {
      const pattern = industryContext.patterns[0]
      context += `INDUSTRY PATTERNS (${pattern.industry}):\n`
      context += `- Common pain points: ${pattern.commonPainPoints.slice(0, 3).join(', ')}\n`
      context += `- Typical solutions: ${pattern.typicalSolutions.slice(0, 3).join(', ')}\n`
      context += `- Cost benchmarks: ${pattern.costBenchmarks.medium}\n\n`
    }
    
    // Add relevant case studies
    if (industryContext.caseStudies.length > 0) {
      context += `CASE STUDIES:\n`
      industryContext.caseStudies.slice(0, 2).forEach(study => {
        context += `- ${study.title}: ${study.solution} → ${study.results.slice(0, 2).join(', ')}\n`
        context += `  Costs: ${study.costs.setup} setup, ${study.costs.monthly}/month, ${study.costs.roi} ROI\n`
      })
      context += `\n`
    }
    
    // Add discovered opportunities context
    if (discoveredOpportunities.length > 0) {
      context += `DISCOVERED OPPORTUNITIES: ${discoveredOpportunities.join(', ')}\n\n`
    }
    
    // Add Northern BC specific context
    context += `NORTHERN BC CONSIDERATIONS:\n`
    context += `- Internet reliability varies by location\n`
    context += `- Seasonal business patterns (tourism, agriculture)\n`
    context += `- Local supplier relationships important\n`
    context += `- Remote work and distributed teams common\n\n`
    
    return context
  }

  private extractIndustry(businessInfo: string): string {
    const info = businessInfo.toLowerCase()
    
    if (info.includes('restaurant') || info.includes('food') || info.includes('kitchen')) {
      return 'Restaurant'
    }
    if (info.includes('retail') || info.includes('store') || info.includes('shop')) {
      return 'Retail'
    }
    if (info.includes('service') || info.includes('consulting') || info.includes('professional')) {
      return 'Service'
    }
    if (info.includes('healthcare') || info.includes('medical') || info.includes('clinic')) {
      return 'Healthcare'
    }
    
    return 'General'
  }
}

// Singleton instance
export const knowledgeBase = new KnowledgeBaseManager()
