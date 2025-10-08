# AI Business Assessment Tool - v1.0.1

A Next.js web application that provides personalized AI-powered business assessments for Northern BC businesses. This tool helps business owners discover AI opportunities tailored to their specific industry and needs.

## 🚀 Features

- **Interactive Chat Interface**: Natural conversation flow to understand business needs
- **Industry-Specific AI Recommendations**: Tailored process cards based on business type
- **Complete Implementation Details**: Costs, timelines, ROI, and tool recommendations
- **AI-Generated Rationales**: Contextual explanations for each recommendation
- **Lead Capture & Reporting**: Email collection and automated report generation
- **Rate Limiting**: Built-in protection against API abuse
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: XAI API (Grok-4)
- **Rate Limiting**: Upstash Redis
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- XAI API key
- Upstash Redis account (for rate limiting)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-assessment-webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   XAI_API_KEY=your_xai_api_key_here
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `XAI_API_KEY`
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`
   - Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `XAI_API_KEY` | Your XAI API key for AI responses | Yes |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL | Yes |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token | Yes |

### Rate Limiting

The app includes built-in rate limiting to prevent API abuse:
- **7 requests per second** per user
- **1000 requests per minute** per user
- Uses Upstash Redis for distributed rate limiting

## 📁 Project Structure

```
ai-assessment-webapp/
├── app/
│   ├── api/
│   │   ├── chat/           # Chat API endpoint
│   │   ├── save-lead/      # Lead capture endpoint
│   │   └── send-report/    # Report generation endpoint
│   ├── components/
│   │   ├── ChatInterface.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── LeadCaptureForm.tsx
│   │   └── ProgressBar.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── knowledge-base.ts   # Research data storage
│   ├── process-discovery.ts # AI process filtering
│   ├── rate-limiter.ts     # Rate limiting logic
│   └── xai-client.ts       # XAI API client
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎯 How It Works

1. **Lead Capture**: Users enter their email and name
2. **Discovery Phase**: AI asks contextual questions about their business
3. **Process Identification**: AI identifies relevant AI opportunities
4. **Process Cards**: Displays tailored recommendations with full details
5. **Report Generation**: Sends personalized report via email

## 🧪 Testing

The app includes test scenarios for various business types:

```bash
# Run test scenarios
node test-execution.js
```

Test scenarios include:
- Roofing contractors
- Restaurants
- Veterinary clinics
- Mining support services
- Retail stores

## 🔒 Security

- Rate limiting prevents API abuse
- Environment variables protect sensitive data
- Input validation on all forms
- Secure API endpoints

## 📈 Performance

- **Server-side rendering** for fast initial loads
- **Optimized images** and assets
- **Efficient API calls** with caching
- **Responsive design** for all devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@evergreenwebsolutions.com or create an issue in this repository.

## 🎉 Acknowledgments

- Built for Northern BC businesses
- Powered by XAI's Grok-4 model
- Designed for Evergreen Web Solutions presentations

---

**Ready to transform your business with AI?** 🚀