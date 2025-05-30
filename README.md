# AI Model Benchmark Viewer

A modern web application for comparing performance metrics of various AI models. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📊 Interactive table and chart views of model performance
- 🧪 Multiple benchmark metrics (TruthfulQA, MT Bench, etc.)
- 📈 Sortable and filterable data
- 🎨 Modern, responsive UI with Tailwind CSS
- 📱 Mobile-friendly design

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-model-comparator.git
cd ai-model-comparator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add any required API keys:
```env
NEXT_PUBLIC_HUGGINGFACE_API_KEY=your_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ai-model-comparator/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── api/               # API routes
├── components/            # React components
│   ├── ModelTable.tsx     # Table view
│   ├── ModelChart.tsx     # Chart view
│   ├── BenchmarkTabs.tsx  # View switcher
│   └── Header.tsx         # Navigation header
├── lib/                   # Utility functions
├── styles/               # Global styles
└── public/              # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Data sources: Hugging Face, PapersWithCode, OpenCompass
- Icons: Heroicons
- Charts: Recharts #   x o b o t  
 