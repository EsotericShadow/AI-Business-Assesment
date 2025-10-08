// Test Scenarios for 25 Northwestern BC Business Types
export const testScenarios = [
  // Primary Industries (5)
  {
    id: 1,
    name: "Forestry/Logging",
    industry: "forestry",
    businessType: "Small logging operation",
    conversation: [
      "I run a small logging operation here in Northern BC. We have about 8 employees and work on selective logging contracts.",
      "Our biggest challenge is scheduling crews around weather and equipment maintenance. We lose a lot of time when equipment breaks down unexpectedly.",
      "We also struggle with manual paperwork - everything from safety reports to harvest permits. It's a lot of duplicate data entry between different government systems.",
      "Cash flow is tough too, especially in winter when we can't work as much. It's hard to predict when we'll get paid for completed contracts."
    ],
    expectedProcesses: ["staff-scheduling-optimization", "equipment-maintenance-prediction", "data-entry-automation", "cash-flow-prediction", "document-creation", "performance-analytics"]
  },
  {
    id: 2,
    name: "Mining Support Services",
    industry: "mining",
    businessType: "Equipment maintenance company",
    conversation: [
      "We provide equipment maintenance services to mining operations across Northern BC. We have 12 technicians and work on heavy machinery.",
      "Scheduling is a nightmare - we have to coordinate with multiple mine sites, and equipment failures are unpredictable. We're always playing catch-up.",
      "Our technicians spend way too much time on paperwork and reporting. Each mine has different systems and requirements.",
      "We need better visibility into equipment health so we can prevent failures instead of just reacting to them."
    ],
    expectedProcesses: ["staff-scheduling-optimization", "equipment-maintenance-prediction", "route-optimization", "document-creation", "performance-analytics", "customer-service"]
  },
  {
    id: 3,
    name: "Commercial Fishing",
    industry: "fishing",
    businessType: "Salmon fishing business",
    conversation: [
      "I own a commercial salmon fishing operation with 3 boats and 8 crew members. We fish the Skeena and Nass rivers.",
      "The biggest challenge is predicting fish runs and planning our fishing schedule. Weather and regulations change constantly.",
      "We're still using paper logs for catch reporting and manual inventory tracking. It's inefficient and error-prone.",
      "Crew scheduling is difficult because fishing windows are unpredictable, and we need to coordinate with processing plants."
    ],
    expectedProcesses: ["demand-prediction", "staff-scheduling-optimization", "data-entry-automation", "inventory-forecasting", "performance-analytics", "document-creation"]
  },
  {
    id: 4,
    name: "Agriculture/Ranching",
    industry: "agriculture",
    businessType: "Cattle ranch",
    conversation: [
      "We run a 500-head cattle ranch near Prince George. It's a family operation with 4 full-time employees.",
      "Feed management is our biggest challenge - we need to predict how much hay and feed we'll need, especially through winter.",
      "We track everything manually - breeding records, health data, feed costs. It's time-consuming and we make mistakes.",
      "Weather forecasting is crucial for our operations, but we don't have good systems to integrate that data with our planning."
    ],
    expectedProcesses: ["inventory-forecasting", "demand-prediction", "data-entry-automation", "performance-analytics", "document-creation", "equipment-maintenance-prediction"]
  },
  {
    id: 5,
    name: "Oil & Gas Support",
    industry: "oil-gas",
    businessType: "Field services company",
    conversation: [
      "We provide field services to oil and gas operations - everything from pipeline maintenance to environmental monitoring.",
      "Our crews are spread across multiple remote sites, and coordinating schedules and resources is a constant challenge.",
      "Safety compliance is critical, but our reporting systems are outdated. We need better tracking of certifications and safety incidents.",
      "Equipment maintenance is expensive when things break down in remote locations. We need better predictive maintenance."
    ],
    expectedProcesses: ["staff-scheduling-optimization", "equipment-maintenance-prediction", "route-optimization", "document-creation", "performance-analytics", "quality-control"]
  },

  // Construction & Trades (5)
  {
    id: 6,
    name: "Residential Construction",
    industry: "construction",
    businessType: "Home builder",
    conversation: [
      "We build custom homes in the Prince George area. We have 15 employees and typically have 3-4 projects running simultaneously.",
      "Project scheduling is our biggest headache - coordinating subcontractors, material deliveries, and weather delays.",
      "We're still using spreadsheets for project management and manual invoicing. It's inefficient and error-prone.",
      "Material cost fluctuations are killing our margins. We need better forecasting and pricing strategies."
    ],
    expectedProcesses: ["staff-scheduling-optimization", "resource-allocation", "proposal-generation", "performance-analytics", "document-creation", "cash-flow-prediction"]
  },
  {
    id: 7,
    name: "Commercial Roofing",
    industry: "construction",
    businessType: "Roofing contractor",
    conversation: [
      "We specialize in commercial roofing projects across Northern BC. We have 20 employees and work on everything from warehouses to schools.",
      "Weather is our biggest challenge - we can't work in rain or high winds, so scheduling is constantly changing.",
      "We spend too much time on estimates and proposals. Each project is unique and requires detailed material calculations.",
      "Crew productivity varies significantly, and we don't have good systems to track and optimize performance."
    ],
    expectedProcesses: ["staff-scheduling-optimization", "proposal-generation", "route-optimization", "performance-analytics", "document-creation", "resource-allocation"]
  },
  {
    id: 8,
    name: "Plumbing Services",
    industry: "construction",
    businessType: "Plumbing company",
    conversation: [
      "We provide residential and commercial plumbing services in Prince George and surrounding areas. We have 8 plumbers and 2 apprentices.",
      "Emergency calls are unpredictable, and we struggle to balance scheduled work with urgent repairs.",
      "Our dispatch system is outdated - we're still using paper schedules and phone calls to coordinate jobs.",
      "Inventory management is a challenge. We carry a lot of parts and fittings, but we often run out of common items."
    ],
    expectedProcesses: ["staff-scheduling-optimization", "route-optimization", "inventory-forecasting", "customer-service", "performance-analytics", "document-creation"]
  },
  {
    id: 9,
    name: "Electrical Contracting",
    industry: "construction",
    businessType: "Electrical services",
    conversation: [
      "We do electrical work for residential and commercial projects. We have 12 electricians and work on everything from new construction to maintenance.",
      "Code compliance is critical, but keeping up with changing regulations and documentation requirements is time-consuming.",
      "We need better systems for tracking project progress and managing change orders. Currently using spreadsheets.",
      "Safety training and certification tracking is manual and inefficient. We need better compliance management."
    ],
    expectedProcesses: ["staff-scheduling-optimization", "document-creation", "performance-analytics", "quality-control", "resource-allocation", "customer-service"]
  },
  {
    id: 10,
    name: "HVAC Services",
    industry: "construction",
    businessType: "Heating/cooling company",
    conversation: [
      "We install and service heating and cooling systems for homes and businesses. We have 10 technicians and cover a large area.",
      "Seasonal demand is extreme - we're swamped in winter with heating repairs and in summer with AC installations.",
      "Preventive maintenance scheduling is difficult because we have hundreds of customers with different service intervals.",
      "We need better systems for tracking equipment warranties and service history. Currently using paper files."
    ],
    expectedProcesses: ["staff-scheduling-optimization", "demand-prediction", "route-optimization", "customer-service", "performance-analytics", "document-creation"]
  },

  // Hospitality & Tourism (5)
  {
    id: 11,
    name: "Hotel/Lodge",
    industry: "hospitality",
    businessType: "Northern lodge business",
    conversation: [
      "We run a wilderness lodge that caters to fishing and hunting tourists. We have 20 rooms and a restaurant.",
      "Seasonal demand is our biggest challenge - we're packed in summer but slow in winter. Staffing is difficult.",
      "We're still using paper reservation books and manual inventory tracking. It's inefficient and error-prone.",
      "Guest communication is time-consuming - answering questions about fishing conditions, weather, and local attractions."
    ],
    expectedProcesses: ["scheduling", "inventory-forecasting", "customer-service", "demand-prediction", "social-media", "performance-analytics"]
  },
  {
    id: 12,
    name: "Restaurant",
    industry: "hospitality",
    businessType: "Local restaurant",
    conversation: [
      "We run a family restaurant in Prince George. We have 15 employees and serve breakfast, lunch, and dinner.",
      "Food waste is a big problem - we often over-prepare or under-prepare based on gut feeling rather than data.",
      "Staff scheduling is challenging because demand varies significantly by day and season. We need better forecasting.",
      "We're still using paper order tickets and manual inventory tracking. It's inefficient and leads to mistakes."
    ],
    expectedProcesses: ["order-management-automation", "inventory-forecasting", "staff-scheduling-optimization", "menu-optimization", "customer-service", "performance-analytics"]
  },
  {
    id: 13,
    name: "Tour Operator",
    industry: "tourism",
    businessType: "Wildlife/outdoor tours",
    conversation: [
      "We offer guided wildlife tours and outdoor adventures. We have 6 guides and operate year-round with different seasonal activities.",
      "Weather is our biggest challenge - we have to reschedule tours frequently, which creates customer service issues.",
      "We need better systems for managing bookings and communicating with customers about weather and conditions.",
      "Guide scheduling is complex because different guides have different certifications and specialties."
    ],
    expectedProcesses: ["scheduling", "customer-service", "staff-scheduling-optimization", "social-media", "performance-analytics", "document-creation"]
  },
  {
    id: 14,
    name: "RV Park/Campground",
    industry: "tourism",
    businessType: "Seasonal campground",
    conversation: [
      "We operate a seasonal RV park with 50 sites. We're open from May to September and have 4 seasonal employees.",
      "Reservation management is manual and time-consuming. We use a paper booking system that's prone to errors.",
      "We need better systems for managing site maintenance and communicating with guests about facilities and rules.",
      "Revenue forecasting is difficult because weather and tourism trends vary significantly from year to year."
    ],
    expectedProcesses: ["scheduling", "customer-service", "performance-analytics", "social-media", "document-creation", "cash-flow-prediction"]
  },
  {
    id: 15,
    name: "Craft Brewery",
    industry: "hospitality",
    businessType: "Local brewery",
    conversation: [
      "We're a small craft brewery with a taproom and distribution to local restaurants. We have 8 employees.",
      "Inventory management is critical - we need to balance production with demand while managing ingredient costs.",
      "We need better systems for tracking sales data and customer preferences to optimize our beer selection.",
      "Marketing and social media management takes up a lot of time. We need more efficient content creation."
    ],
    expectedProcesses: ["inventory-forecasting", "social-media", "content-creation", "performance-analytics", "customer-service", "sales-pattern-analysis"]
  },

  // Retail & Services (5)
  {
    id: 16,
    name: "Hardware Store",
    industry: "retail",
    businessType: "Local hardware shop",
    conversation: [
      "We're a family-owned hardware store serving Prince George and surrounding areas. We have 12 employees.",
      "Inventory management is our biggest challenge - we carry thousands of SKUs and need to balance stock levels with cash flow.",
      "We need better systems for tracking customer purchases and preferences to improve our product selection.",
      "Seasonal demand varies significantly - we need better forecasting for things like snow shovels and garden supplies."
    ],
    expectedProcesses: ["inventory-forecasting", "customer-service", "demand-prediction", "performance-analytics", "social-media", "customer-churn-prediction"]
  },
  {
    id: 17,
    name: "Grocery Store",
    industry: "retail",
    businessType: "Independent grocer",
    conversation: [
      "We run an independent grocery store with 20 employees. We compete with chain stores by focusing on local products.",
      "Food waste is a major cost - we need better systems for managing perishable inventory and markdowns.",
      "We need better customer insights to understand shopping patterns and optimize our product mix.",
      "Staff scheduling is complex because we need coverage for long hours while managing labor costs."
    ],
    expectedProcesses: ["inventory-forecasting", "staff-scheduling-optimization", "customer-service", "performance-analytics", "demand-prediction", "customer-churn-prediction"]
  },
  {
    id: 18,
    name: "Auto Repair Shop",
    industry: "automotive",
    businessType: "Vehicle service center",
    conversation: [
      "We're a full-service auto repair shop with 8 mechanics. We work on everything from oil changes to major repairs.",
      "Appointment scheduling is challenging because repair times are unpredictable and we need to coordinate parts availability.",
      "We need better systems for tracking vehicle service history and communicating with customers about repairs.",
      "Parts inventory management is complex - we need to balance having parts on hand with cash flow."
    ],
    expectedProcesses: ["scheduling", "inventory-forecasting", "customer-service", "performance-analytics", "document-creation", "equipment-maintenance-prediction"]
  },
  {
    id: 19,
    name: "Veterinary Clinic",
    industry: "healthcare",
    businessType: "Animal healthcare",
    conversation: [
      "We're a small animal veterinary clinic with 2 veterinarians and 4 support staff. We serve pets and some farm animals.",
      "Appointment scheduling is complex because we need to balance routine care with emergency cases.",
      "We need better systems for managing patient records and communicating with pet owners about care.",
      "Inventory management for medications and supplies is critical - we need to track expiration dates and usage."
    ],
    expectedProcesses: ["scheduling", "customer-service", "inventory-forecasting", "document-creation", "performance-analytics", "no-show-prediction"]
  },
  {
    id: 20,
    name: "Accounting Firm",
    industry: "professional",
    businessType: "Small accounting practice",
    conversation: [
      "We're a small accounting firm with 3 accountants and 2 support staff. We serve local businesses and individuals.",
      "Tax season is extremely busy, and we struggle with managing client workload and deadlines.",
      "We need better systems for document management and client communication to improve efficiency.",
      "Client onboarding and data collection is time-consuming and repetitive."
    ],
    expectedProcesses: ["document-creation", "scheduling", "customer-service", "performance-analytics", "data-entry-automation", "bookkeeping"]
  },

  // Professional Services (5)
  {
    id: 21,
    name: "Legal Practice",
    industry: "legal",
    businessType: "Small law firm",
    conversation: [
      "We're a small law firm with 2 lawyers and 2 support staff. We handle real estate, family law, and small business matters.",
      "Case management and deadline tracking is critical but time-consuming with our current systems.",
      "We need better systems for document management and client communication to improve efficiency.",
      "Billable hour tracking and invoicing is manual and inefficient."
    ],
    expectedProcesses: ["document-creation", "scheduling", "performance-analytics", "customer-service", "data-entry-automation", "bookkeeping"]
  },
  {
    id: 22,
    name: "Real Estate Agency",
    industry: "real-estate",
    businessType: "Local realty office",
    conversation: [
      "We're a local real estate agency with 8 agents and 2 support staff. We focus on residential and commercial properties.",
      "Lead management and follow-up is time-consuming and inconsistent across our agents.",
      "We need better systems for managing client communications and tracking property showings.",
      "Market analysis and pricing recommendations are done manually and could be more data-driven."
    ],
    expectedProcesses: ["lead-scoring", "customer-service", "automated-follow-ups", "performance-analytics", "social-media", "sales-pattern-analysis"]
  },
  {
    id: 23,
    name: "Insurance Brokerage",
    industry: "insurance",
    businessType: "Insurance agency",
    conversation: [
      "We're an independent insurance brokerage with 5 agents. We sell personal and commercial insurance policies.",
      "Client renewal management is time-consuming and we often miss opportunities for upselling.",
      "We need better systems for tracking client communications and managing policy renewals.",
      "Lead generation and follow-up is inconsistent and could be more systematic."
    ],
    expectedProcesses: ["lead-scoring", "customer-service", "automated-follow-ups", "performance-analytics", "customer-churn-prediction", "sales-pattern-analysis"]
  },
  {
    id: 24,
    name: "Marketing Agency",
    industry: "marketing",
    businessType: "Local marketing firm",
    conversation: [
      "We're a small marketing agency with 6 employees. We help local businesses with digital marketing and branding.",
      "Client project management is challenging because we juggle multiple clients with different needs and deadlines.",
      "We need better systems for tracking campaign performance and reporting results to clients.",
      "Content creation and social media management takes up a lot of time and could be more efficient."
    ],
    expectedProcesses: ["content-creation", "social-media", "performance-analytics", "customer-service", "project-management", "sales-pattern-analysis"]
  },
  {
    id: 25,
    name: "IT Services",
    industry: "technology",
    businessType: "Technology consulting",
    conversation: [
      "We provide IT support and consulting services to local businesses. We have 4 technicians and 2 consultants.",
      "Ticket management and response times are inconsistent. We need better systems for prioritizing and tracking issues.",
      "We need better systems for managing client communications and documenting solutions.",
      "Preventive maintenance scheduling is manual and we often miss opportunities to prevent problems."
    ],
    expectedProcesses: ["customer-service", "scheduling", "equipment-maintenance-prediction", "performance-analytics", "document-creation", "lead-scoring"]
  }
];

export default testScenarios;
