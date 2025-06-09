# ⚡️ Ressumy - Free Resume Builder

**Create stunning, professional resumes in minutes with AI-powered assistance. 100% FREE forever.**

🌐 **Live Demo:** [https://ressumy.com/](https://ressumy.com/)

Ressumy is a completely free, privacy-first resume builder that combines elegant design with powerful AI features. Built entirely for client-side processing, your data never leaves your device - and we never charge you a penny.

## 🆓 **Why Choose Free Over Premium?**

Unlike other resume builders that lock features behind paywalls, Ressumy gives you everything for free:

- ✅ **Unlimited Resume Creation** - No limits on how many resumes you can create
- ✅ **All Templates Available** - Access to every professional template
- ✅ **Optional AI Writing Help** - Use AI assistance when you want extra support
- ✅ **High-Quality PDF Export** - Professional PDFs without watermarks
- ✅ **No Hidden Costs** - No subscriptions, no premium tiers, no catch

**Because job searching is stressful enough without worrying about costs.**

## ✨ Features

### 🎨 **Beautiful Templates**
- Multiple professionally designed resume templates
- Modern, ATS-friendly layouts optimized for 2024
- Dark/light mode support with elegant transitions
- Download sample PDFs to preview templates

### 🤖 **AI Writing Support (Optional)**
- **On-device AI assistance** - Get help polishing your content when you need it
- "Polish my bullet" feature to enhance job descriptions (completely optional)
- Powered by @mlc-ai/web-llm with llama.cpp-WASM fallback
- Your data stays private - AI runs locally, no server calls

### 📱 **Modern User Experience**
- Responsive design that works on all devices
- Real-time preview with mobile scaling
- Smooth animations powered by Framer Motion
- Contextual navigation that adapts as you work

### 💾 **Smart Data Management**
- Auto-save to localStorage - never lose your work
- JSON import/export for portability
- IndexedDB caching for optimal performance
- Offline-first architecture

### 🎯 **Professional Output**
- High-quality PDF generation with html2pdf.js
- Proper pagination and print optimization
- ATS-compatible formatting
- Multiple export options

## 🚀 Tech Stack

Built with modern technologies for maximum performance and developer experience:

- **React 19** with TypeScript for type-safe development
- **Vite** for lightning-fast development and builds
- **Tailwind CSS** + **shadcn/ui** for beautiful, accessible components
- **Framer Motion** for smooth, professional animations
- **Zustand** for lightweight state management
- **React Hook Form** + **Yup** for robust form handling
- **@mlc-ai/web-llm** for on-device AI processing

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/ressumy.git
cd ressumy
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start development server
```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
├── pages/              # Page components with organized structure
│   ├── home/           # Landing page with modern design
│   ├── templates/      # Template selection and preview
│   └── editor/         # Resume editing interface
├── templates/          # Resume template definitions
├── stores/             # Zustand state management
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configuration
│   ├── utils.ts        # PDF generation and helpers
│   ├── sampleData.ts   # Sample resume data
│   └── llm.ts          # AI/LLM integration
└── styles/             # Global styles and themes
```

## 🎯 Key Features Deep Dive

### Privacy-First Architecture
All resume data processing happens client-side. No servers, no tracking, no data collection. Your personal information stays on your device.

### AI-Powered Enhancement
The integrated AI helps improve your resume content when you want extra support - but it's completely optional. Perfect for enhancing bullet points and job descriptions when you need inspiration or want to polish your writing.

### Template System
Modular template system allows easy addition of new designs. Each template is a React component with consistent data interface.

### Responsive Design
Works seamlessly across desktop, tablet, and mobile devices with intelligent scaling and adaptive layouts.

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on how to:

- Report bugs and request features
- Submit pull requests
- Add new resume templates
- Improve AI prompts and suggestions

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Built with ❤️ for job seekers everywhere**

Visit [Ressumy.com](https://ressumy.com/) to start creating your perfect resume today!
