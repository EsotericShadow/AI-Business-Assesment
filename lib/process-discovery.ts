// AI Process Discovery System
export interface BusinessProcess {
  id: string
  name: string
  description: string
  category: 'admin' | 'marketing' | 'sales' | 'operations' | 'finance' | 'customer-service'
  aiPotential: 'high' | 'medium' | 'low'
  timeSavings: number // hours per week
  costSavings: number // percentage
  revenueImpact: number // percentage
  implementationComplexity: 'easy' | 'medium' | 'complex'
  suggestedTools: string[]
  userRating?: number // 1-5 from self-assessment
  userNotes?: string
  isSelected: boolean
  // Detailed information for expanded view
  detailedDescription?: string
  implementationTimeline?: string
  monthlyCost?: string
  setupCost?: string
  maintenanceLevel?: 'low' | 'medium' | 'high'
  maintenanceDescription?: string
  expectedROI?: string
  prerequisites?: string[]
  successMetrics?: string[]
  // AI-generated rationale for why this process was recommended
  aiRationale?: string
  // Safeguard metadata
  minTeamSize?: number // Minimum team size needed (e.g., 5 = needs at least 5 people)
  notForIndustries?: string[] // Industries where this process is not applicable
}

export interface BusinessProfile {
  industry: string
  businessType: string
  size: 'solo' | 'small' | 'medium'
  currentChallenges: string[]
  processes: BusinessProcess[]
  assessmentComplete: boolean
}

export class ProcessDiscoveryAI {
  private predefinedProcesses: BusinessProcess[] = [
    // Category 1: Automation & Integration
    {
      id: 'system-integration',
      name: 'System Integration',
      description: 'Connecting different software systems to eliminate manual data entry',
      category: 'admin',
      aiPotential: 'high',
      timeSavings: 20,
      costSavings: 40,
      revenueImpact: 15,
      implementationComplexity: 'medium',
      suggestedTools: ['Zapier', 'Make.com', 'Custom API Development'],
      isSelected: false,
      detailedDescription: 'Automatically syncs data between your different software systems (POS, accounting, CRM, etc.) so you never have to manually enter the same information twice. Reduces errors and saves significant time.',
      implementationTimeline: '2-6 weeks',
      monthlyCost: '$50-200/month',
      setupCost: '$1,000-5,000',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal ongoing maintenance. Most integrations are self-maintaining with automatic updates.',
      expectedROI: '4-8 months payback period',
      prerequisites: ['Existing software systems', 'Stable internet connection', 'Data export capabilities'],
      successMetrics: ['Reduced manual data entry', 'Fewer data errors', 'Time savings', 'Improved data consistency']
    },
    {
      id: 'data-entry-automation',
      name: 'Data Entry Automation',
      description: 'Automating manual data entry between systems and forms',
      category: 'admin',
      aiPotential: 'high',
      timeSavings: 15,
      costSavings: 35,
      revenueImpact: 10,
      implementationComplexity: 'medium',
      suggestedTools: ['UiPath', 'Automation Anywhere', 'Custom Scripts'],
      isSelected: false,
      detailedDescription: 'Uses AI to automatically extract and enter data from forms, invoices, receipts, and other documents into your business systems. Eliminates repetitive typing and reduces human error.',
      implementationTimeline: '3-8 weeks',
      monthlyCost: '$100-300/month',
      setupCost: '$2,000-8,000',
      maintenanceLevel: 'medium',
      maintenanceDescription: 'Requires occasional updates when document formats change. AI learns and improves over time.',
      expectedROI: '6-12 months payback period',
      prerequisites: ['Digital documents', 'Business software systems', 'Staff training on new processes'],
      successMetrics: ['Reduced data entry time', 'Lower error rates', 'Improved data accuracy', 'Staff productivity gains']
    },
    {
      id: 'order-management-automation',
      name: 'Order Management Automation',
      description: 'Automating order processing from multiple channels to kitchen/fulfillment',
      category: 'operations',
      aiPotential: 'high',
      timeSavings: 12,
      costSavings: 30,
      revenueImpact: 25,
      implementationComplexity: 'medium',
      suggestedTools: ['Custom Integration', 'Square', 'Toast'],
      isSelected: false,
      detailedDescription: 'Eliminates manual data entry between delivery platforms (like Spyce) and your main POS system. Orders automatically flow from tablets to kitchen displays, reducing errors and saving time.',
      implementationTimeline: '2-4 weeks',
      monthlyCost: '$50-150/month',
      setupCost: '$500-2000',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal ongoing maintenance. Updates handled automatically by software providers.',
      expectedROI: '3-6 months payback period',
      prerequisites: ['Existing POS system', 'Stable internet connection', 'Basic staff training'],
      successMetrics: ['Reduced order errors', 'Faster order processing', 'Staff time savings']
    },
    {
      id: 'email-management',
      name: 'Email Management',
      description: 'Sorting, responding to, and organizing business emails',
      category: 'admin',
      aiPotential: 'high',
      timeSavings: 5,
      costSavings: 20,
      revenueImpact: 5,
      implementationComplexity: 'easy',
      suggestedTools: ['Gmail Smart Compose', 'Grammarly', 'Calendly'],
      isSelected: false,
      detailedDescription: 'AI automatically sorts incoming emails by priority, suggests responses, schedules meetings, and organizes your inbox. Helps you focus on important communications while reducing email overwhelm.',
      implementationTimeline: '1-2 weeks',
      monthlyCost: '$10-50/month',
      setupCost: '$100-500',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. AI learns your preferences and improves automatically.',
      expectedROI: '2-4 months payback period',
      prerequisites: ['Email account', 'Basic computer skills', 'Internet connection'],
      successMetrics: ['Faster email response times', 'Better email organization', 'Reduced email stress', 'Improved communication efficiency']
    },
    {
      id: 'document-creation',
      name: 'Document Creation',
      description: 'Creating contracts, proposals, reports, and other business documents',
      category: 'admin',
      aiPotential: 'high',
      timeSavings: 8,
      costSavings: 25,
      revenueImpact: 10,
      implementationComplexity: 'easy',
      suggestedTools: ['Jasper', 'Copy.ai', 'Notion AI'],
      isSelected: false,
      detailedDescription: 'AI helps create professional documents by generating content, suggesting improvements, and maintaining consistent formatting. Saves time on routine document creation while ensuring quality and consistency.',
      implementationTimeline: '1-3 weeks',
      monthlyCost: '$20-100/month',
      setupCost: '$200-1,000',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance. AI tools update automatically and learn from your writing style.',
      expectedROI: '3-6 months payback period',
      prerequisites: ['Document templates', 'Writing guidelines', 'Basic computer skills'],
      successMetrics: ['Faster document creation', 'Consistent document quality', 'Reduced writing time', 'Improved document accuracy']
    },
    {
      id: 'report-generation',
      name: 'Report Generation',
      description: 'Automatically generating business reports and analytics',
      category: 'admin',
      aiPotential: 'high',
      timeSavings: 6,
      costSavings: 25,
      revenueImpact: 15,
      implementationComplexity: 'easy',
      suggestedTools: ['Power BI', 'Tableau', 'Custom Dashboards'],
      isSelected: false,
      detailedDescription: 'AI automatically pulls data from your business systems and creates comprehensive reports with insights and recommendations. No more manual data compilation or spreadsheet work.',
      implementationTimeline: '2-4 weeks',
      monthlyCost: '$30-150/month',
      setupCost: '$500-2,000',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. Reports update automatically as new data comes in.',
      expectedROI: '3-6 months payback period',
      prerequisites: ['Business data sources', 'Report templates', 'Basic analytics understanding'],
      successMetrics: ['Faster report generation', 'More accurate insights', 'Reduced manual work', 'Better decision-making data']
    },

    // Category 2: Predictive AI
    {
      id: 'inventory-forecasting',
      name: 'Predictive Inventory Management',
      description: 'AI-powered forecasting for optimal stock levels and reorder timing',
      category: 'operations',
      aiPotential: 'high',
      timeSavings: 15,
      costSavings: 20,
      revenueImpact: 25,
      implementationComplexity: 'complex',
      suggestedTools: ['Custom ML Models', 'TradeGecko AI', 'inFlow Intelligence'],
      isSelected: false,
      detailedDescription: 'AI analyzes your sales history, seasonal patterns, and local events to predict exactly what inventory you\'ll need. Replaces "gut feeling" ordering with data-driven decisions.',
      implementationTimeline: '1-3 months',
      monthlyCost: '$100-300/month',
      setupCost: '$2000-5000',
      maintenanceLevel: 'medium',
      maintenanceDescription: 'Requires regular data input and occasional model adjustments. Most systems self-improve over time.',
      expectedROI: '6-12 months payback period',
      prerequisites: ['Historical sales data', 'POS system integration', 'Supplier relationships'],
      successMetrics: ['Reduced waste', 'Fewer stockouts', 'Improved cash flow']
    },
    {
      id: 'demand-prediction',
      name: 'Demand Prediction',
      description: 'Predicting customer demand patterns and seasonal trends',
      category: 'operations',
      aiPotential: 'high',
      timeSavings: 10,
      costSavings: 25,
      revenueImpact: 30,
      implementationComplexity: 'complex',
      suggestedTools: ['Custom ML Models', 'Salesforce Einstein', 'Custom Analytics'],
      isSelected: false,
      detailedDescription: 'AI analyzes historical sales data, weather patterns, local events, and market trends to predict exactly when and how much customers will buy. Helps optimize inventory, staffing, and marketing efforts.',
      implementationTimeline: '2-6 months',
      monthlyCost: '$200-500/month',
      setupCost: '$5,000-15,000',
      maintenanceLevel: 'high',
      maintenanceDescription: 'Requires regular data updates and model retraining. Performance monitoring and adjustments needed.',
      expectedROI: '8-18 months payback period',
      prerequisites: ['Historical sales data', 'Market data access', 'Analytics expertise', 'Data quality systems'],
      successMetrics: ['Improved demand forecasting accuracy', 'Reduced overstock/understock', 'Better resource planning', 'Increased revenue']
    },
    {
      id: 'staff-scheduling-optimization',
      name: 'Predictive Staff Scheduling',
      description: 'AI-optimized scheduling based on predicted busy periods',
      category: 'admin',
      aiPotential: 'high',
      timeSavings: 8,
      costSavings: 30,
      revenueImpact: 20,
      implementationComplexity: 'medium',
      suggestedTools: ['Custom Scheduling AI', 'When I Work', 'Deputy'],
      isSelected: false,
      detailedDescription: 'AI analyzes historical data, weather patterns, and project schedules to predict staffing needs and automatically create optimal schedules. Reduces overtime costs and ensures proper coverage.',
      implementationTimeline: '2-4 weeks',
      monthlyCost: '$50-150/month',
      setupCost: '$500-2,000',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. System learns from scheduling patterns and automatically adjusts.',
      expectedROI: '3-6 months payback period',
      prerequisites: ['Historical scheduling data', 'Staff availability tracking', 'Project timeline data', 'Weather data access'],
      successMetrics: ['Reduced overtime costs', 'Better staff coverage', 'Fewer scheduling conflicts', 'Improved staff satisfaction'],
      minTeamSize: 5 // Hard stop: don't show to small teams
    },
    {
      id: 'cash-flow-prediction',
      name: 'Cash Flow Prediction',
      description: 'Predicting cash flow patterns and seasonal variations',
      category: 'finance',
      aiPotential: 'high',
      timeSavings: 6,
      costSavings: 20,
      revenueImpact: 25,
      implementationComplexity: 'medium',
      suggestedTools: ['Custom Financial AI', 'QuickBooks Forecasting', 'Xero Analytics'],
      isSelected: false,
      detailedDescription: 'AI analyzes your financial history, seasonal patterns, and business cycles to predict cash flow needs. Helps avoid cash shortages and optimize financial planning for growth opportunities.',
      implementationTimeline: '3-6 weeks',
      monthlyCost: '$50-200/month',
      setupCost: '$1,000-3,000',
      maintenanceLevel: 'medium',
      maintenanceDescription: 'Requires regular financial data updates and occasional model adjustments based on business changes.',
      expectedROI: '4-8 months payback period',
      prerequisites: ['Financial records', 'Accounting software', 'Historical cash flow data'],
      successMetrics: ['Improved cash flow accuracy', 'Reduced financial stress', 'Better financial planning', 'Avoided cash shortages']
    },
    {
      id: 'equipment-maintenance-prediction',
      name: 'Predictive Maintenance',
      description: 'Predicting equipment failures before they happen',
      category: 'operations',
      aiPotential: 'high',
      timeSavings: 12,
      costSavings: 35,
      revenueImpact: 20,
      implementationComplexity: 'complex',
      suggestedTools: ['IoT Sensors + ML', 'Custom Monitoring', 'Equipment APIs'],
      isSelected: false,
      detailedDescription: 'AI monitors equipment performance using sensors and historical data to predict when maintenance is needed. Prevents costly breakdowns and extends equipment life through proactive care.',
      implementationTimeline: '3-9 months',
      monthlyCost: '$100-400/month',
      setupCost: '$5,000-20,000',
      maintenanceLevel: 'high',
      maintenanceDescription: 'Requires sensor maintenance, data monitoring, and regular model updates. Technical expertise needed.',
      expectedROI: '12-24 months payback period',
      prerequisites: ['Equipment with monitoring capabilities', 'IoT infrastructure', 'Maintenance records', 'Technical expertise'],
      successMetrics: ['Reduced equipment downtime', 'Lower maintenance costs', 'Extended equipment life', 'Improved operational efficiency']
    },
    {
      id: 'customer-churn-prediction',
      name: 'Customer Churn Prediction',
      description: 'Identifying customers likely to leave and retention strategies',
      category: 'sales',
      aiPotential: 'high',
      timeSavings: 8,
      costSavings: 30,
      revenueImpact: 40,
      implementationComplexity: 'medium',
      suggestedTools: ['Custom ML Models', 'HubSpot AI', 'Salesforce Einstein'],
      isSelected: false,
      detailedDescription: 'AI analyzes customer behavior patterns, purchase history, and engagement metrics to identify customers at risk of leaving. Enables proactive retention efforts to keep valuable customers.',
      implementationTimeline: '4-8 weeks',
      monthlyCost: '$75-250/month',
      setupCost: '$2,000-6,000',
      maintenanceLevel: 'medium',
      maintenanceDescription: 'Requires regular data updates and model retraining as customer behavior patterns change.',
      expectedROI: '3-8 months payback period',
      prerequisites: ['Customer data system', 'Purchase history', 'Communication records', 'Retention strategies'],
      successMetrics: ['Reduced customer churn', 'Increased customer lifetime value', 'Improved retention rates', 'Better customer relationships']
    },
    {
      id: 'no-show-prediction',
      name: 'No-Show Prediction',
      description: 'Predicting appointment cancellations and no-shows',
      category: 'admin',
      aiPotential: 'high',
      timeSavings: 4,
      costSavings: 25,
      revenueImpact: 15,
      implementationComplexity: 'medium',
      suggestedTools: ['Custom Prediction Models', 'Acuity Scheduling', 'Calendly Analytics'],
      isSelected: false,
      detailedDescription: 'AI analyzes appointment history, weather patterns, and customer behavior to predict which appointments are likely to be cancelled or result in no-shows. Enables proactive scheduling adjustments.',
      implementationTimeline: '2-4 weeks',
      monthlyCost: '$25-100/month',
      setupCost: '$500-2,000',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. System learns from appointment patterns and improves over time.',
      expectedROI: '2-6 months payback period',
      prerequisites: ['Appointment scheduling system', 'Historical appointment data', 'Customer contact information'],
      successMetrics: ['Reduced no-show rates', 'Better schedule utilization', 'Improved customer service', 'Reduced lost revenue']
    },

    // Category 3: Dynamic Optimization
    {
      id: 'dynamic-pricing',
      name: 'Dynamic Pricing',
      description: 'AI-powered pricing optimization based on demand and competition',
      category: 'sales',
      aiPotential: 'high',
      timeSavings: 6,
      costSavings: 15,
      revenueImpact: 35,
      implementationComplexity: 'complex',
      suggestedTools: ['Custom Pricing AI', 'Dynamic Pricing APIs', 'Revenue Management Systems'],
      isSelected: false,
      detailedDescription: 'AI automatically adjusts prices based on demand, competition, inventory levels, and market conditions. Maximizes revenue while remaining competitive and fair to customers.',
      implementationTimeline: '4-12 weeks',
      monthlyCost: '$100-500/month',
      setupCost: '$3,000-15,000',
      maintenanceLevel: 'high',
      maintenanceDescription: 'Requires regular market analysis, competitor monitoring, and pricing strategy adjustments.',
      expectedROI: '6-18 months payback period',
      prerequisites: ['Pricing data', 'Market research', 'Competitor analysis', 'Revenue goals'],
      successMetrics: ['Increased revenue', 'Better price optimization', 'Improved competitiveness', 'Higher profit margins']
    },
    {
      id: 'route-optimization',
      name: 'Route Optimization',
      description: 'Optimizing delivery routes and logistics for efficiency',
      category: 'operations',
      aiPotential: 'high',
      timeSavings: 10,
      costSavings: 30,
      revenueImpact: 20,
      implementationComplexity: 'medium',
      suggestedTools: ['Google Maps API', 'Route Optimization APIs', 'Custom Logistics AI'],
      isSelected: false,
      detailedDescription: 'AI optimizes routes for multiple job sites, considering traffic patterns, weather conditions, and crew locations. Reduces travel time and fuel costs while ensuring crews arrive on time.',
      implementationTimeline: '1-3 weeks',
      monthlyCost: '$50-150/month',
      setupCost: '$500-1,500',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. System automatically updates with traffic and weather data.',
      expectedROI: '2-4 months payback period',
      prerequisites: ['GPS tracking', 'Job site database', 'Crew location tracking', 'Traffic data access'],
      successMetrics: ['Reduced travel time', 'Lower fuel costs', 'Improved on-time arrivals', 'Better crew utilization'],
      notForIndustries: ['service', 'consulting', 'office', 'retail', 'restaurant', 'construction'] // Only show for: logistics, delivery, transportation, field service with routes
    },
    {
      id: 'resource-allocation',
      name: 'Resource Allocation',
      description: 'Optimizing staff and resource allocation across projects',
      category: 'admin',
      aiPotential: 'high',
      timeSavings: 8,
      costSavings: 25,
      revenueImpact: 20,
      implementationComplexity: 'medium',
      suggestedTools: ['Custom Allocation AI', 'Project Management AI', 'Resource Planning Tools'],
      isSelected: false,
      detailedDescription: 'AI analyzes project timelines, crew skills, equipment availability, and weather patterns to optimally assign resources across multiple construction sites. Reduces overtime costs and improves project efficiency.',
      implementationTimeline: '2-4 weeks',
      monthlyCost: '$100-250/month',
      setupCost: '$1,000-3,000',
      maintenanceLevel: 'medium',
      maintenanceDescription: 'Requires regular updates on crew availability, equipment status, and project changes. Most systems learn and improve over time.',
      expectedROI: '4-8 months payback period',
      prerequisites: ['Project management system', 'Crew skill database', 'Equipment tracking', 'Weather data access'],
      successMetrics: ['Reduced overtime costs', 'Improved project completion rates', 'Better resource utilization', 'Fewer scheduling conflicts'],
      minTeamSize: 10 // Hard stop: needs complex resource management
    },
    {
      id: 'menu-optimization',
      name: 'Menu/Product Mix Optimization',
      description: 'AI-optimized menu items and product mix for maximum profitability',
      category: 'operations',
      aiPotential: 'high',
      timeSavings: 6,
      costSavings: 20,
      revenueImpact: 30,
      implementationComplexity: 'medium',
      suggestedTools: ['Custom Menu AI', 'Restaurant Analytics', 'Product Mix Optimization'],
      isSelected: false,
      detailedDescription: 'AI analyzes sales data, ingredient costs, customer preferences, and seasonal trends to optimize your menu or product mix. Identifies high-profit items to promote and low-performing items to adjust or remove.',
      implementationTimeline: '3-6 weeks',
      monthlyCost: '$50-200/month',
      setupCost: '$1,000-4,000',
      maintenanceLevel: 'medium',
      maintenanceDescription: 'Requires regular sales data updates and seasonal menu adjustments. AI learns from customer feedback and sales patterns.',
      expectedROI: '4-10 months payback period',
      prerequisites: ['Sales data', 'Cost tracking', 'Customer feedback system', 'Menu management system'],
      successMetrics: ['Increased profit margins', 'Better product mix', 'Improved customer satisfaction', 'Reduced food waste']
    },

    // Category 4: Intelligence & Analysis
    {
      id: 'customer-sentiment-analysis',
      name: 'Customer Sentiment Analysis',
      description: 'Analyzing customer feedback, reviews, and social media sentiment',
      category: 'customer-service',
      aiPotential: 'high',
      timeSavings: 8,
      costSavings: 25,
      revenueImpact: 20,
      implementationComplexity: 'medium',
      suggestedTools: ['Custom Sentiment AI', 'Google Cloud NLP', 'Azure Text Analytics'],
      isSelected: false,
      detailedDescription: 'AI automatically analyzes customer reviews, social media mentions, and feedback to understand sentiment and identify areas for improvement. Provides actionable insights to enhance customer experience.',
      implementationTimeline: '3-6 weeks',
      monthlyCost: '$50-200/month',
      setupCost: '$1,000-3,000',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. AI continuously monitors and analyzes new feedback automatically.',
      expectedROI: '3-8 months payback period',
      prerequisites: ['Customer feedback sources', 'Review platforms', 'Social media presence', 'Response protocols'],
      successMetrics: ['Improved customer satisfaction', 'Better review ratings', 'Faster issue identification', 'Enhanced brand reputation']
    },
    {
      id: 'sales-pattern-analysis',
      name: 'Sales Pattern Analysis',
      description: 'AI analysis of sales patterns and customer behavior',
      category: 'sales',
      aiPotential: 'high',
      timeSavings: 6,
      costSavings: 20,
      revenueImpact: 25,
      implementationComplexity: 'medium',
      suggestedTools: ['Custom Analytics AI', 'Salesforce Einstein', 'Google Analytics AI'],
      isSelected: false,
      detailedDescription: 'AI analyzes your sales data to identify patterns, trends, and customer behavior insights. Helps optimize sales strategies, identify opportunities, and improve conversion rates.',
      implementationTimeline: '3-6 weeks',
      monthlyCost: '$50-200/month',
      setupCost: '$1,000-4,000',
      maintenanceLevel: 'medium',
      maintenanceDescription: 'Requires regular data updates and periodic analysis review. AI learns from new sales patterns.',
      expectedROI: '4-10 months payback period',
      prerequisites: ['Sales data system', 'Customer tracking', 'Analytics tools', 'Sales team training'],
      successMetrics: ['Improved sales performance', 'Better customer insights', 'Optimized sales strategies', 'Increased conversion rates']
    },
    {
      id: 'quality-control',
      name: 'Quality Control & Defect Detection',
      description: 'AI-powered quality control and defect detection systems',
      category: 'operations',
      aiPotential: 'high',
      timeSavings: 10,
      costSavings: 30,
      revenueImpact: 25,
      implementationComplexity: 'complex',
      suggestedTools: ['Computer Vision AI', 'Custom Quality Systems', 'IoT + ML'],
      isSelected: false,
      detailedDescription: 'AI uses computer vision and sensors to automatically inspect products, identify defects, and ensure quality standards. Reduces human error and speeds up quality control processes.',
      implementationTimeline: '4-12 weeks',
      monthlyCost: '$200-800/month',
      setupCost: '$5,000-25,000',
      maintenanceLevel: 'high',
      maintenanceDescription: 'Requires regular system calibration, sensor maintenance, and model updates. Technical expertise needed.',
      expectedROI: '8-20 months payback period',
      prerequisites: ['Quality standards', 'Inspection equipment', 'Technical infrastructure', 'Staff training'],
      successMetrics: ['Reduced defect rates', 'Faster quality control', 'Consistent quality standards', 'Lower quality costs']
    },
    {
      id: 'fraud-detection',
      name: 'Fraud Detection',
      description: 'AI-powered fraud detection for transactions and activities',
      category: 'finance',
      aiPotential: 'high',
      timeSavings: 4,
      costSavings: 40,
      revenueImpact: 15,
      implementationComplexity: 'complex',
      suggestedTools: ['Custom Fraud AI', 'Stripe Radar', 'PayPal Fraud Protection'],
      isSelected: false,
      detailedDescription: 'AI monitors transactions and business activities in real-time to detect suspicious patterns and potential fraud. Protects your business from financial losses and maintains customer trust.',
      implementationTimeline: '4-8 weeks',
      monthlyCost: '$100-400/month',
      setupCost: '$3,000-10,000',
      maintenanceLevel: 'high',
      maintenanceDescription: 'Requires regular model updates, monitoring, and response to new fraud patterns. Security expertise needed.',
      expectedROI: '6-15 months payback period',
      prerequisites: ['Transaction data', 'Security protocols', 'Fraud response procedures', 'Technical infrastructure'],
      successMetrics: ['Reduced fraud losses', 'Faster fraud detection', 'Improved security', 'Customer trust maintenance']
    },
    {
      id: 'proposal-generation',
      name: 'Proposal Generation',
      description: 'Creating customized proposals and quotes for clients',
      category: 'sales',
      aiPotential: 'high',
      timeSavings: 10,
      costSavings: 35,
      revenueImpact: 35,
      implementationComplexity: 'medium',
      suggestedTools: ['PandaDoc', 'Proposify', 'Jasper'],
      isSelected: false,
      detailedDescription: 'AI generates professional proposals and quotes based on project requirements, historical pricing, and client preferences. Automatically calculates materials, labor, and timeline estimates.',
      implementationTimeline: '2-3 weeks',
      monthlyCost: '$75-200/month',
      setupCost: '$1,000-2,500',
      maintenanceLevel: 'medium',
      maintenanceDescription: 'Requires regular updates to pricing templates and project databases. AI learns from successful proposals.',
      expectedROI: '3-6 months payback period',
      prerequisites: ['Project templates', 'Pricing database', 'Client information system', 'Material cost tracking'],
      successMetrics: ['Faster proposal turnaround', 'Higher win rates', 'Consistent pricing', 'Reduced proposal errors']
    },
    {
      id: 'lead-scoring',
      name: 'Advanced Lead Scoring',
      description: 'AI-powered lead scoring and qualification',
      category: 'sales',
      aiPotential: 'high',
      timeSavings: 8,
      costSavings: 30,
      revenueImpact: 40,
      implementationComplexity: 'medium',
      suggestedTools: ['HubSpot AI', 'Pipedrive AI', 'Custom Lead Scoring'],
      isSelected: false,
      detailedDescription: 'AI analyzes lead data, behavior patterns, and engagement history to automatically score and prioritize leads. Helps sales teams focus on the most promising prospects and improve conversion rates.',
      implementationTimeline: '3-6 weeks',
      monthlyCost: '$50-200/month',
      setupCost: '$1,000-4,000',
      maintenanceLevel: 'medium',
      maintenanceDescription: 'Requires regular data updates and model adjustments based on sales performance and lead quality changes.',
      expectedROI: '3-8 months payback period',
      prerequisites: ['Lead data system', 'Sales tracking', 'Customer behavior data', 'Sales team training'],
      successMetrics: ['Higher conversion rates', 'Better lead prioritization', 'Improved sales efficiency', 'Increased revenue per lead'],
      notForIndustries: ['retail', 'restaurant', 'construction'] // Better for: real estate, B2B sales, insurance
    },
    {
      id: 'performance-analytics',
      name: 'Performance Analytics',
      description: 'AI-powered business performance analysis and insights',
      category: 'admin',
      aiPotential: 'high',
      timeSavings: 6,
      costSavings: 20,
      revenueImpact: 20,
      implementationComplexity: 'medium',
      suggestedTools: ['Custom Analytics AI', 'Power BI AI', 'Tableau AI'],
      isSelected: false,
      detailedDescription: 'AI analyzes all aspects of your business performance to identify trends, opportunities, and areas for improvement. Provides actionable insights to drive better decision-making and business growth.',
      implementationTimeline: '3-6 weeks',
      monthlyCost: '$50-200/month',
      setupCost: '$1,000-4,000',
      maintenanceLevel: 'medium',
      maintenanceDescription: 'Requires regular data updates and periodic analysis review. AI learns from business performance patterns.',
      expectedROI: '4-10 months payback period',
      prerequisites: ['Business data sources', 'Performance metrics', 'Analytics tools', 'Management reporting'],
      successMetrics: ['Better business insights', 'Improved decision-making', 'Identified growth opportunities', 'Enhanced performance tracking']
    },

    // Category 5: Customer Experience
    {
      id: 'customer-service',
      name: 'AI Customer Service',
      description: 'AI chatbots and automated customer support',
      category: 'customer-service',
      aiPotential: 'high',
      timeSavings: 12,
      costSavings: 40,
      revenueImpact: 20,
      implementationComplexity: 'easy',
      suggestedTools: ['Intercom', 'Zendesk', 'Tidio'],
      isSelected: false,
      detailedDescription: 'AI chatbots handle common customer inquiries 24/7, providing instant responses and escalating complex issues to human staff. Improves customer satisfaction while reducing support costs.',
      implementationTimeline: '2-4 weeks',
      monthlyCost: '$30-150/month',
      setupCost: '$500-2,000',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. AI learns from customer interactions and improves responses over time.',
      expectedROI: '2-6 months payback period',
      prerequisites: ['Customer support processes', 'FAQ database', 'Response templates', 'Staff training'],
      successMetrics: ['Faster response times', 'Reduced support costs', 'Improved customer satisfaction', '24/7 availability']
    },
    {
      id: 'personalized-recommendations',
      name: 'Personalized Recommendations',
      description: 'AI-powered product and service recommendations',
      category: 'sales',
      aiPotential: 'high',
      timeSavings: 6,
      costSavings: 25,
      revenueImpact: 35,
      implementationComplexity: 'medium',
      suggestedTools: ['Custom Recommendation Engine', 'Amazon Personalize', 'Google Recommendations AI'],
      isSelected: false,
      detailedDescription: 'AI analyzes customer preferences, purchase history, and behavior to provide personalized product and service recommendations. Increases sales and improves customer experience through relevant suggestions.',
      implementationTimeline: '4-8 weeks',
      monthlyCost: '$75-300/month',
      setupCost: '$2,000-8,000',
      maintenanceLevel: 'medium',
      maintenanceDescription: 'Requires regular data updates and model adjustments based on customer behavior changes and product updates.',
      expectedROI: '4-12 months payback period',
      prerequisites: ['Customer data', 'Product catalog', 'Purchase history', 'Recommendation system'],
      successMetrics: ['Increased sales', 'Higher average order value', 'Improved customer engagement', 'Better conversion rates']
    },
    {
      id: 'automated-follow-ups',
      name: 'Automated Follow-ups',
      description: 'AI-powered customer follow-up and nurturing campaigns',
      category: 'sales',
      aiPotential: 'high',
      timeSavings: 8,
      costSavings: 30,
      revenueImpact: 25,
      implementationComplexity: 'easy',
      suggestedTools: ['HubSpot Workflows', 'Mailchimp AI', 'Custom Follow-up AI'],
      isSelected: false,
      detailedDescription: 'AI automatically sends personalized follow-up messages, reminders, and nurturing campaigns based on customer behavior and engagement. Keeps prospects engaged and moves them through the sales funnel.',
      implementationTimeline: '2-4 weeks',
      monthlyCost: '$25-100/month',
      setupCost: '$500-2,000',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. AI learns from customer responses and optimizes follow-up timing and content.',
      expectedROI: '2-6 months payback period',
      prerequisites: ['Customer contact information', 'Email templates', 'Follow-up sequences', 'CRM system'],
      successMetrics: ['Improved lead nurturing', 'Higher conversion rates', 'Better customer engagement', 'Reduced manual follow-up work']
    },
    {
      id: 'review-management',
      name: 'Review Management',
      description: 'AI-powered review monitoring and response management',
      category: 'customer-service',
      aiPotential: 'high',
      timeSavings: 6,
      costSavings: 25,
      revenueImpact: 20,
      implementationComplexity: 'easy',
      suggestedTools: ['Review Management AI', 'Google My Business AI', 'Custom Review Systems'],
      isSelected: false,
      detailedDescription: 'AI monitors reviews across all platforms, analyzes sentiment, and suggests appropriate responses. Helps maintain a positive online reputation and address customer concerns quickly.',
      implementationTimeline: '1-3 weeks',
      monthlyCost: '$20-100/month',
      setupCost: '$300-1,500',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. AI continuously monitors and provides response suggestions automatically.',
      expectedROI: '2-5 months payback period',
      prerequisites: ['Online review platforms', 'Response templates', 'Brand guidelines', 'Customer service protocols'],
      successMetrics: ['Improved review ratings', 'Faster response times', 'Better online reputation', 'Increased customer trust']
    },

    // Category 6: Content & Marketing
    {
      id: 'social-media',
      name: 'Social Media Management',
      description: 'Creating and scheduling social media content across platforms',
      category: 'marketing',
      aiPotential: 'high',
      timeSavings: 10,
      costSavings: 40,
      revenueImpact: 20,
      implementationComplexity: 'easy',
      suggestedTools: ['Buffer', 'Hootsuite', 'Canva Pro'],
      isSelected: false,
      detailedDescription: 'AI helps create engaging social media content, suggests optimal posting times, and automatically schedules posts across multiple platforms. Maintains consistent online presence with minimal effort.',
      implementationTimeline: '1-3 weeks',
      monthlyCost: '$20-100/month',
      setupCost: '$200-1,000',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. AI learns from engagement data and optimizes content and timing automatically.',
      expectedROI: '2-5 months payback period',
      prerequisites: ['Social media accounts', 'Brand guidelines', 'Content calendar', 'Engagement goals'],
      successMetrics: ['Increased social media engagement', 'Consistent posting schedule', 'Better content performance', 'Improved brand visibility']
    },
    {
      id: 'content-creation',
      name: 'Content Creation',
      description: 'Writing blog posts, newsletters, and marketing materials',
      category: 'marketing',
      aiPotential: 'high',
      timeSavings: 12,
      costSavings: 35,
      revenueImpact: 25,
      implementationComplexity: 'easy',
      suggestedTools: ['Jasper', 'Copy.ai', 'Grammarly'],
      isSelected: false,
      detailedDescription: 'AI helps create high-quality marketing content, blog posts, newsletters, and promotional materials. Generates ideas, writes drafts, and optimizes content for better engagement and SEO.',
      implementationTimeline: '1-3 weeks',
      monthlyCost: '$30-150/month',
      setupCost: '$300-1,500',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. AI learns from your brand voice and content performance to improve over time.',
      expectedROI: '2-6 months payback period',
      prerequisites: ['Brand guidelines', 'Content strategy', 'Target audience definition', 'Content calendar'],
      successMetrics: ['Faster content creation', 'Improved content quality', 'Better SEO performance', 'Increased engagement']
    },
    {
      id: 'email-marketing',
      name: 'Email Marketing',
      description: 'Creating and managing email campaigns and newsletters',
      category: 'marketing',
      aiPotential: 'medium',
      timeSavings: 6,
      costSavings: 25,
      revenueImpact: 30,
      implementationComplexity: 'easy',
      suggestedTools: ['Mailchimp', 'Constant Contact', 'ConvertKit'],
      isSelected: false,
      detailedDescription: 'AI helps create personalized email campaigns, optimizes send times, and segments audiences for better engagement. Automates email sequences and tracks performance to improve results.',
      implementationTimeline: '1-3 weeks',
      monthlyCost: '$20-100/month',
      setupCost: '$200-1,000',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. AI optimizes campaigns based on performance data and subscriber behavior.',
      expectedROI: '2-6 months payback period',
      prerequisites: ['Email list', 'Campaign templates', 'Segmentation strategy', 'Performance tracking'],
      successMetrics: ['Higher open rates', 'Better click-through rates', 'Increased conversions', 'Improved customer engagement']
    },
    {
      id: 'seo-optimization',
      name: 'SEO Optimization',
      description: 'AI-powered SEO optimization and content strategy',
      category: 'marketing',
      aiPotential: 'high',
      timeSavings: 8,
      costSavings: 30,
      revenueImpact: 25,
      implementationComplexity: 'medium',
      suggestedTools: ['Custom SEO AI', 'SEMrush AI', 'Ahrefs AI'],
      isSelected: false,
      detailedDescription: 'AI analyzes your website and content to optimize for search engines, suggests keywords, improves content structure, and tracks performance. Helps increase organic traffic and online visibility.',
      implementationTimeline: '3-6 weeks',
      monthlyCost: '$50-200/month',
      setupCost: '$1,000-3,000',
      maintenanceLevel: 'medium',
      maintenanceDescription: 'Requires regular content updates and SEO monitoring. AI continuously optimizes based on search engine changes and performance data.',
      expectedROI: '4-12 months payback period',
      prerequisites: ['Website', 'Content management system', 'Analytics tracking', 'SEO goals'],
      successMetrics: ['Increased organic traffic', 'Better search rankings', 'Improved content performance', 'Higher conversion rates']
    },

    // Universal Business Processes
    {
      id: 'scheduling',
      name: 'Appointment Scheduling',
      description: 'Managing client appointments, meetings, and calendar coordination',
      category: 'admin',
      aiPotential: 'high',
      timeSavings: 6,
      costSavings: 30,
      revenueImpact: 15,
      implementationComplexity: 'easy',
      suggestedTools: ['Calendly', 'Acuity Scheduling', 'Cal.com'],
      isSelected: false,
      detailedDescription: 'AI-powered scheduling systems automatically manage appointments, send reminders, handle rescheduling, and optimize calendar availability. Reduces scheduling conflicts and improves customer experience.',
      implementationTimeline: '1-2 weeks',
      monthlyCost: '$10-50/month',
      setupCost: '$100-500',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. AI learns from scheduling patterns and optimizes availability automatically.',
      expectedROI: '1-3 months payback period',
      prerequisites: ['Calendar system', 'Appointment types', 'Availability rules', 'Customer contact info'],
      successMetrics: ['Reduced scheduling conflicts', 'Faster appointment booking', 'Fewer no-shows', 'Improved customer satisfaction']
    },
    {
      id: 'bookkeeping',
      name: 'Bookkeeping & Accounting',
      description: 'Recording transactions, categorizing expenses, and financial reporting',
      category: 'finance',
      aiPotential: 'medium',
      timeSavings: 8,
      costSavings: 30,
      revenueImpact: 15,
      implementationComplexity: 'easy',
      suggestedTools: ['QuickBooks', 'Xero', 'Wave'],
      isSelected: false,
      detailedDescription: 'AI automates transaction recording, expense categorization, and financial reporting. Reduces manual data entry and ensures accurate financial records for better business decision-making.',
      implementationTimeline: '2-4 weeks',
      monthlyCost: '$20-100/month',
      setupCost: '$200-1,000',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. AI learns from transaction patterns and improves categorization accuracy over time.',
      expectedROI: '2-5 months payback period',
      prerequisites: ['Bank accounts', 'Receipt system', 'Chart of accounts', 'Financial reporting needs'],
      successMetrics: ['Reduced manual data entry', 'Improved accuracy', 'Faster financial reporting', 'Better financial insights']
    },
    {
      id: 'expense-tracking',
      name: 'Expense Tracking',
      description: 'Recording and categorizing business expenses and receipts',
      category: 'finance',
      aiPotential: 'high',
      timeSavings: 6,
      costSavings: 25,
      revenueImpact: 10,
      implementationComplexity: 'easy',
      suggestedTools: ['Expensify', 'Receipt Bank', 'Shoeboxed'],
      isSelected: false,
      detailedDescription: 'AI automatically extracts data from receipts, categorizes expenses, and tracks spending patterns. Simplifies expense management and ensures accurate tax deductions.',
      implementationTimeline: '1-3 weeks',
      monthlyCost: '$10-50/month',
      setupCost: '$100-500',
      maintenanceLevel: 'low',
      maintenanceDescription: 'Minimal maintenance required. AI learns from expense patterns and improves categorization accuracy automatically.',
      expectedROI: '1-4 months payback period',
      prerequisites: ['Receipt system', 'Expense categories', 'Tax requirements', 'Reporting needs'],
      successMetrics: ['Faster expense processing', 'Improved accuracy', 'Better expense insights', 'Simplified tax preparation']
    }
  ]

  async discoverProcesses(businessInfo: string): Promise<BusinessProcess[]> {
    // Intelligent process selection based on business type and context
    const businessLower = businessInfo.toLowerCase()
    
    let relevantProcessIds: string[] = []
    
    // Industry-specific process selection
    if (businessLower.includes('restaurant') || businessLower.includes('food') || businessLower.includes('kitchen')) {
      relevantProcessIds = [
        'order-management-automation',
        'inventory-forecasting', 
        'staff-scheduling-optimization',
        'customer-service',
        'cash-flow-prediction',
        'menu-optimization',
        'customer-sentiment-analysis',
        'social-media'
      ]
    } else if (businessLower.includes('retail') || businessLower.includes('store') || businessLower.includes('shop')) {
      relevantProcessIds = [
        'inventory-forecasting',
        'customer-service',
        'demand-prediction',
        'dynamic-pricing',
        'customer-churn-prediction',
        'social-media',
        'email-marketing',
        'fraud-detection'
      ]
    } else if (businessLower.includes('construction') || businessLower.includes('roofing') || businessLower.includes('contractor')) {
      relevantProcessIds = [
        'staff-scheduling-optimization',
        'resource-allocation',
        'route-optimization',
        'proposal-generation',
        'lead-scoring',
        'document-creation',
        'performance-analytics',
        'customer-service'
      ]
    } else if (businessLower.includes('service') || businessLower.includes('consulting') || businessLower.includes('professional')) {
      relevantProcessIds = [
        'scheduling',
        'proposal-generation',
        'lead-scoring',
        'document-creation',
        'customer-churn-prediction',
        'performance-analytics',
        'automated-follow-ups',
        'email-marketing'
      ]
    } else if (businessLower.includes('healthcare') || businessLower.includes('medical') || businessLower.includes('clinic')) {
      relevantProcessIds = [
        'scheduling',
        'document-creation',
        'customer-service',
        'no-show-prediction',
        'performance-analytics',
        'bookkeeping',
        'expense-tracking',
        'quality-control'
      ]
    } else {
      // Default: universal business processes
      relevantProcessIds = [
        'scheduling',
        'document-creation',
        'email-management',
        'customer-service',
        'social-media',
        'bookkeeping',
        'expense-tracking',
        'performance-analytics'
      ]
    }
    
    // Return only the selected processes (6-8 max)
    const relevantProcesses = this.predefinedProcesses.filter(process => 
      relevantProcessIds.includes(process.id)
    )
    
    return relevantProcesses.map(process => ({ ...process }))
  }

  async discoverProcessesWithContext(
    businessInfo: string,
    conversationHistory: string,
    knowledgeContext: string,
    xaiClient: any
  ): Promise<BusinessProcess[]> {
    try {
      const selectedProcessIds = await xaiClient.discoverProcessesWithContext(
        businessInfo,
        conversationHistory,
        knowledgeContext
      )
      
      return this.predefinedProcesses
        .filter(process => selectedProcessIds.includes(process.id))
        .map(process => ({ ...process }))
    } catch (error) {
      console.error('Error in context-aware process discovery:', error)
      // Fallback to keyword-based discovery
      return this.discoverProcesses(businessInfo)
    }
  }

  async discoverProcessesWithLLM(businessInfo: string, conversationHistory: string, xaiClient: any): Promise<BusinessProcess[]> {
    const processLibrary = this.predefinedProcesses.map(process => ({
      id: process.id,
      name: process.name,
      description: process.description,
      category: process.category,
      aiPotential: process.aiPotential,
      timeSavings: process.timeSavings,
      costSavings: process.costSavings,
      revenueImpact: process.revenueImpact,
      implementationComplexity: process.implementationComplexity,
      suggestedTools: process.suggestedTools
    }))

    const prompt = `Given this business information: ${businessInfo}
And this conversation: ${conversationHistory}

From our AI capabilities framework, select 8-12 processes most relevant to this business:

${JSON.stringify(processLibrary, null, 2)}

Consider:
- What category of AI applies? (automation, predictive, optimization, intelligence, customer experience, content)
- What pain points were mentioned?
- What's common for this industry?
- What provides immediate value?

Return ONLY a JSON array of process IDs that are most relevant, like: ["process-id-1", "process-id-2", "process-id-3"]`

    try {
      const response = await xaiClient.chatCompletion([
        {
          role: 'system',
          content: 'You are an AI business analyst. Analyze the business information and select the most relevant AI processes. Return only a JSON array of process IDs.'
        },
        {
          role: 'user',
          content: prompt
        }
      ])

      const content = response.choices[0]?.message?.content || '[]'
      const selectedProcessIds = JSON.parse(content)
      
      return this.predefinedProcesses
        .filter(process => selectedProcessIds.includes(process.id))
        .map(process => ({ ...process }))
    } catch (error) {
      console.error('Error in LLM process discovery:', error)
      // Fallback to keyword-based discovery
      return this.discoverProcesses(businessInfo)
    }
  }

  getProcessById(id: string): BusinessProcess | undefined {
    return this.predefinedProcesses.find(p => p.id === id)
  }

  getAllProcesses(): BusinessProcess[] {
    return this.predefinedProcesses.map(process => ({ ...process }))
  }

  calculateProcessScore(process: BusinessProcess): number {
    const timeWeight = 0.3
    const costWeight = 0.3
    const revenueWeight = 0.4
    
    const timeScore = (process.timeSavings / 15) * 100 // Normalize to 15 hours max
    const costScore = process.costSavings
    const revenueScore = process.revenueImpact
    
    return (timeScore * timeWeight) + (costScore * costWeight) + (revenueScore * revenueWeight)
  }

  rankProcesses(processes: BusinessProcess[]): BusinessProcess[] {
    return processes
      .map(process => ({
        ...process,
        score: this.calculateProcessScore(process)
      }))
      .sort((a, b) => b.score - a.score)
  }

  // Safeguard validation methods
  validateProcessRecommendations(
    processIds: string[], 
    conversationText: string
  ): string[] {
    // Extract simple signals from conversation
    const teamSize = this.extractTeamSize(conversationText)
    const industry = this.extractIndustryKeywords(conversationText)
    
    return processIds.filter(id => {
      const process = this.predefinedProcesses.find(p => p.id === id)
      if (!process) return true // Keep if not found (fail open)
      
      // Hard stop: team too small
      if (process.minTeamSize && teamSize && teamSize < process.minTeamSize) {
        return false
      }
      
      // Hard stop: wrong industry
      if (process.notForIndustries && industry.some(kw => 
        process.notForIndustries?.includes(kw)
      )) {
        return false
      }
      
      return true // Passed safeguards
    })
  }

  // Simple extraction helpers
  private extractTeamSize(text: string): number | null {
    // Look for patterns like "2-3 people", "5 employees", "team of 10"
    const patterns = [
      /(\d+)[\s-]+(?:person|people|employee|staff|crew|team)/i,
      /team of (\d+)/i,
      /(\d+) (?:person|people|employee|staff|crew)/i
    ]
    
    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match) return parseInt(match[1])
    }
    return null
  }

  private extractIndustryKeywords(text: string): string[] {
    const keywords: string[] = []
    const industryMap = {
      'construction': /construction|contractor|builder|renovation/i,
      'restaurant': /restaurant|cafe|food service|catering/i,
      'retail': /retail|store|boutique|shop/i,
      'service': /consultant|consulting|professional service/i,
      'delivery': /delivery|courier|logistics|shipping/i
    }
    
    for (const [industry, pattern] of Object.entries(industryMap)) {
      if (pattern.test(text)) keywords.push(industry)
    }
    return keywords
  }
}
