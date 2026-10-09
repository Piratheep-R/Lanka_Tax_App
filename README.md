# 🇱🇰 LankaTax — Sri Lanka Tax Calculator & Filing Assistant

> **Sri Lankan tax, without the fog.**  
> An intuitive web application designed to help Sri Lankan taxpayers, professionals, and businesses calculate income tax (PIT/APIT), track Inland Revenue Department (IRD) deadlines, access official tax documentation, and get AI-assisted tax guidance.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start%20%2F%20Router-orange.svg)](https://tanstack.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Key Features

### 🧮 1. APIT & Income Tax Calculator
- **IRD-Aligned (YA 2025/26 & 2026/27)**: Uses the Inland Revenue Department's progressive tax bands and reliefs.
- **Relief Deductions**: Accounts for the standard personal tax relief of **Rs. 1,800,000 / year** (Rs. 150,000 / month).
- **Band Breakdown**: Visualizes tax bracket slabs across the 6%, 18%, 24%, 30%, and 36% tiers.
- **Instant Metrics**: Calculates annual/monthly net take-home pay, total tax liability, effective tax rate, and marginal tax rate.

### 📅 2. Tax Deadlines & Filing Calendar
- **Quarterly Instalments**: Track due dates for 1st, 2nd, 3rd, and 4th instalment payments.
- **Statement of Estimated Tax (SET)** & Annual Return deadlines (30 November).
- **Countdown Indicators**: Live countdown alerts for upcoming statutory deadlines to prevent late filing penalties.

### 📚 3. Curated Document Library
- Fast access to official tax statutes, circulars, and guides:
  - Inland Revenue Act No. 24 of 2017 & recent amendments
  - Advance Personal Income Tax (APIT) withholding tables
  - Value Added Tax (VAT) & Social Security Contribution Levy (SSCL) guides
  - Withholding Tax (WHT) / Advance Income Tax (AIT) schedules
- Bookmark and save reference documents directly to your profile.

### 🤖 4. AI Tax Advisor
- Intelligent, context-aware chatbot trained on Sri Lankan tax rules and IRD legislation.
- Ask questions regarding deductible expenses, rental income rules, withholding exemptions, and e-Services filing steps.
- Retains interactive chat history per user account.

### 👤 5. Tailored Taxpayer Profiles & Dashboard
- Supports multiple taxpayer classifications:
  - **Salaried Employees** (APIT deducted by employers)
  - **Self-Employed / Professionals** (Quarterly instalment payers)
  - **Sole Proprietors & SMEs** (Business income + SSCL / VAT)
  - **Company Directors & Shareholders** (CIT + dividends)
  - **Landlords & Investors** (Rental income relief + CGT)
  - **Mixed-Income Earners**
- Track your Taxpayer Identification Number (TIN) and save income mixes for personalized filing reminders.

---

## 🛠️ Tech Stack

- **Frontend & Fullstack Framework**: [TanStack Start](https://tanstack.com/start) with [React 19](https://react.dev/) & [TanStack Router](https://tanstack.com/router)
- **Styling & Components**: [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) icons
- **State & Data Fetching**: TanStack Query & Server Functions
- **Database & Persistence**: [PGlite](https://pglite.dev/) / PostgreSQL
- **Authentication**: [Better Auth](https://better-auth.com/) (Email & Password with secure session handling)
- **AI Integration**: xAI API / LLM-powered tax advisory service
- **Language & Tooling**: [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have installed:
- [Node.js](https://nodejs.org/) (v20+ or v22 recommended)
- [npm](https://www.npmjs.com/) (or pnpm / yarn)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Piratheep-R/Lanka_Tax_App.git
   cd Lanka_Tax_App
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** (Optional):
   Create a `.env` file if you wish to enable the AI tax advisor or use a remote PostgreSQL database:
   ```env
   # Optional: xAI key for AI Tax Advisor
   XAI_API_KEY=your_xai_api_key_here

   # Optional: Custom PostgreSQL database URL (defaults to embedded PGlite)
   # DATABASE_URL=postgresql://user:password@localhost:5432/lankatax
   ```

4. **Run Database Migrations**:
   ```bash
   npm run db:migrate
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:8080` (or `http://127.0.0.1:8080`).

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the development server at `0.0.0.0:8080` |
| `npm run build` | Builds the application for production & executes database migrations |
| `npm run preview` | Previews the production build locally |
| `npm run typecheck` | Validates TypeScript types across the codebase |
| `npm run lint` | Runs ESLint to check for code quality and style issues |
| `npm run format` | Formats all code with Prettier |
| `npm test` | Runs unit tests for utility functions, scripts, and auth logic |

---

## 📁 Project Structure

```text
├── migrations/          # SQL database migration scripts (auth & app schema)
├── public/              # Static assets, favicon, and preview images
├── scripts/             # Environment, build, migration, and smoke-testing scripts
├── server/              # Server middleware and plugins
├── src/
│   ├── components/      # UI components (Tax Calculator, Header, Footer, Dashboard Shell)
│   │   └── ui/          # Radix & Tailwind UI primitives (buttons, cards, dialogs, etc.)
│   ├── lib/
│   │   ├── auth/        # Authentication configuration and middleware (Better Auth)
│   │   ├── server/      # TanStack Start server functions (Profile, Advisor, Documents)
│   │   └── tax/         # Tax formulas, tax bands, documents list, calendar deadlines
│   ├── routes/          # TanStack Router file-based routes
│   │   ├── __root.tsx   # Root layout with auth provider & meta tags
│   │   ├── index.tsx    # Home page with quick calculator & feature highlights
│   │   ├── calculator.tsx # Dedicated tax calculator view
│   │   ├── documents.tsx  # Document and regulation library
│   │   ├── dashboard/   # Authenticated user dashboard (Advisor, Calendar, Profile, etc.)
│   │   ├── login.tsx    # User login route
│   │   └── signup.tsx   # User registration route
│   ├── router.tsx       # Router setup and error boundary handling
│   └── styles.css       # Global stylesheet & Tailwind CSS configuration
├── package.json         # Project metadata and dependencies
└── tsconfig.json        # TypeScript configuration
```

---

## ⚖️ Disclaimer

*LankaTax is an informational and calculation aid designed to assist individuals and small businesses with Sri Lankan tax compliance. It does not constitute formal legal or certified tax advisory services. For complex tax structuring or dispute resolution, consult a certified chartered accountant or the Inland Revenue Department of Sri Lanka.*

---

## 🤝 Contributing

Contributions, feedback, and suggestions are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
