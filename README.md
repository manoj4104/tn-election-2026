# Election 2026

A modern Next.js 14+ application built with TypeScript and App Router for tracking the 2026 election cycle.

## Features

- **Modern Stack**: Built with Next.js 14+, TypeScript, and App Router
- **Responsive Design**: Tailwind CSS for beautiful, mobile-first styling
- **Election Information**: Candidate profiles, voting information, and important dates
- **Real-time Updates**: Latest news and election updates
- **Accessibility**: Designed with accessibility best practices

## Tech Stack

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## Project Structure

```
├── app/                 # Next.js App Router pages and layouts
│   ├── globals.css     # Global styles with Tailwind
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Homepage
├── components/         # Reusable React components
│   └── Navigation.tsx  # Navigation component
├── lib/               # Utility functions and configurations
│   └── utils.ts       # Helper utilities
├── types/             # TypeScript type definitions
│   └── index.ts       # Main type definitions
├── .env.local         # Environment variables (local)
├── .env.example       # Environment variables template
└── tailwind.config.js # Tailwind CSS configuration
```

## Getting Started

### ⚠️ Prerequisites

**IMPORTANT**: You need to install Node.js first before the project can run properly.

1. **Install Node.js (Required)**:
   - Download and install Node.js from [nodejs.org](https://nodejs.org/)
   - Choose the LTS version (v18 or v20 recommended)
   - This will also install npm (Node Package Manager)
   - Restart VS Code after installation

2. **Verify installation**:
   ```bash
   node --version
   npm --version
   ```

### Installation

**After installing Node.js**, run these commands:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Update the values in `.env.local` with your configuration.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:5500](http://localhost:5500)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_NAME="Election 2026"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

See `.env.example` for all available environment variables.

## Development Guidelines

- Use TypeScript for type safety
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling
- Keep components modular and reusable
- Write semantic HTML for accessibility

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.