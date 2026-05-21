# MailFlow

> AI-powered email marketing automation platform for BFSI institutions  
> Automate campaigns with 6 specialized AI agents - from strategy to analytics

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)](https://www.javascript.com/)
[![React](https://img.shields.io/badge/React-18%2B-blue)](https://reactjs.org)

## 📋 Overview

MailFlow is an enterprise-grade email marketing platform specifically designed for Banking, Financial Services & Insurance (BFSI) organizations in India. It uses 6 specialized AI agents to autonomously plan, create, validate, and execute email campaigns while maintaining complete regulatory compliance with RBI, SEBI, and IRDAI guidelines.

**Why MailFlow?**
- 🤖 **6 AI Agents** - Planner, Content, Compliance, Approval, Executor, Analytics
- 📧 **BFSI-Specific** - Built for Indian financial services regulations
- ⚖️ **Compliance-First** - Real-time RBI/SEBI/IRDAI validation
- 📊 **Advanced Analytics** - Deep insights into campaign performance
- 🔐 **Human-in-Loop** - Optional approval gates for complete control
- 💰 **Multi-Product Support** - Term Life, Health Insurance, Mutual Funds, Loans, etc.

## 🚀 Features

### Campaign Management
- ✅ Multi-step campaign creation wizard
- ✅ BFSI product templates (Insurance, Mutual Funds, Loans, etc.)
- ✅ Target audience segmentation (Retail, HNI, SME, Professionals)
- ✅ Campaign scheduling and automation

### AI Agent Pipeline
```
Planner Agent → Content Agent → Compliance Agent → Approval Gate → Executor → Analytics Agent
```

1. **Planner Agent** 🧠
   - Develops campaign strategy
   - Creates email sequences
   - Plans send schedule
   - Estimates reach

2. **Content Agent** ✍️
   - Generates compelling email copy
   - Creates personalized subject lines
   - Optimizes for engagement
   - A/B testing suggestions

3. **Compliance Agent** 🛡️
   - Validates against RBI guidelines
   - Checks SEBI compliance
   - IRDAI insurance regulations
   - Flags regulatory risks

4. **Human Approval** 👤
   - Review AI-generated content
   - Edit subject/body if needed
   - Final go/no-go decision

5. **Executor Agent** 📤
   - Sends to target audience
   - Manages list segmentation
   - Handles bounces
   - Tracks delivery

6. **Analytics Agent** 📊
   - Calculates open rates
   - Tracks click-through rates
   - Measures conversions
   - Revenue attribution

### Dashboard & Analytics
- 📊 Campaign performance metrics
- 📈 Historical trend analysis
- 👥 Audience engagement insights
- 💰 ROI calculation and tracking
- 🎯 AI-powered recommendations

## 🏗️ Architecture

```
MailFlow/
├── src/
│   ├── components/
│   │   ├── Icon.jsx
│   │   ├── Sidebar.jsx
│   │   └── TopBar.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── CreateCampaign.jsx
│   │   ├── AgentPipeline.jsx
│   │   ├── ApprovalPage.jsx
│   │   └── AnalyticsPage.jsx
│   ├── services/
│   │   ├── agents/
│   │   │   ├── planner.js
│   │   │   ├── content.js
│   │   │   ├── compliance.js
│   │   │   └── analytics.js
│   │   └── api.js
│   ├── constants/
│   │   ├── colors.js
│   │   └── templates.js
│   ├── utils/
│   │   ├── logger.js
│   │   └── validators.js
│   └── App.jsx
├── index.html
└── vite.config.js
```

## 🔧 Tech Stack

**Frontend:**
- React 18+ (UI framework)
- Vite (build tool)
- CSS-in-JS (inline styling)
- Modern ES6+ JavaScript

**AI/ML:**
- Claude API (Anthropic)
- Multi-agent orchestration
- Natural language processing

**Infrastructure:**
- Node.js runtime
- RESTful API architecture
- Real-time logging

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Anthropic API key

### Quick Start

```bash
# Clone repository
git clone https://github.com/Hitpragya/MailFlow.git
cd MailFlow

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local and add your Anthropic API key
# VITE_ANTHROPIC_API_KEY=sk_...

# Start development server
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build      # Creates optimized build
npm run preview    # Preview production build locally
```

## ⚙️ Configuration

### Environment Variables (.env.local)

```env
# Anthropic Claude API
VITE_ANTHROPIC_API_KEY=sk_ant_...
VITE_CLAUDE_MODEL=claude-sonnet-4-20250514

# Email Service (optional)
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=587
VITE_SMTP_USER=your-email@gmail.com

# Analytics
VITE_ANALYTICS_ENABLED=true
VITE_LOG_LEVEL=info
```

## 🎯 Supported Products

**Insurance:**
- Term Life Insurance
- Health Insurance
- General Insurance

**Banking:**
- Home Loans
- Personal Loans
- Credit Cards
- Demat Accounts

**Investment:**
- Mutual Fund SIPs
- Fixed Deposits
- NPS Pension Plans
- Government Securities

## 📊 API Reference

### Create Campaign

```javascript
POST /api/campaigns
{
  "name": "Q4 Term Life Insurance Push",
  "product": "Term Life Insurance",
  "goal": "Lead Generation",
  "audience": "Retail Investors"
}
```

### Run Agent Pipeline

Agents execute automatically with proper logging and error handling.

### Get Analytics

```javascript
GET /api/campaigns/:id/analytics
```

## 🔐 Compliance Features

- ✅ RBI BFSI Guidelines
- ✅ SEBI Advertising Code
- ✅ IRDAI Insurance Regulations
- ✅ Unsolicited Communication Rules
- ✅ Data Privacy & Security

## 📖 Documentation

- [Agent Documentation](./docs/AGENTS.md)
- [API Reference](./docs/API.md)
- [Compliance Guide](./docs/COMPLIANCE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

```bash
git checkout -b feature/your-feature
git commit -m "feat: describe your feature"
git push origin feature/your-feature
```

## 📄 License

MIT © 2026 Hitpragya Rastogi

## 🆘 Support

- 📧 Email: support@mailflow.dev
- 🐛 [Report Issues](https://github.com/Hitpragya/MailFlow/issues)
- 💬 [Discussions](https://github.com/Hitpragya/MailFlow/discussions)
- 📚 [Documentation](./docs)

## 🎓 Learning Resources

- [Claude API Docs](https://docs.anthropic.com)
- [React Documentation](https://react.dev)
- [RBI Guidelines](https://www.rbi.org.in)
- [SEBI Norms](https://www.sebi.gov.in)
- [IRDAI Regulations](https://www.irdai.gov.in)

---

**Built with ❤️ for BFSI Excellence**

**Status**: Production Ready · **Version**: 1.0.0 · **Last Updated**: May 2026
