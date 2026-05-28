# Nike eCommerce

A modern Nike-like eCommerce application built with cutting-edge technologies.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom Nike design tokens
- **Authentication:** Better Auth
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **UI State Management:** Redux Toolkit (synchronous only — no Thunk)
- **Server/Remote State:** TanStack React Query
- **Icons:** React Icons

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 14+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HosseinMst81/eCommerce-.git
   cd eCommerce-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your PostgreSQL credentials.

4. Push the database schema:
   ```bash
   npm run db:push
   ```

5. Seed the database with sample Nike products:
   ```bash
   npm run db:seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Run Drizzle migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run db:seed` | Seed database with sample data |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/
│   │   ├── auth/[...all]/  # Better Auth API routes
│   │   └── products/       # Products API
│   ├── globals.css         # Design tokens & global styles
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Homepage (SSR, queries DB)
├── components/             # React components
│   ├── CategoryFilter.tsx  # Category filter pills
│   ├── Footer.tsx          # Site footer
│   ├── HeroBanner.tsx      # Hero banner section
│   ├── Navbar.tsx          # Navigation bar
│   ├── ProductCard.tsx     # Product card component
│   └── ProductGrid.tsx     # Product grid with filtering
└── lib/
    ├── auth.ts             # Better Auth server config
    ├── auth-client.ts      # Better Auth client
    ├── design-tokens.ts    # Design tokens (JS object)
    ├── db/
    │   ├── index.ts        # Drizzle DB connection
    │   ├── schema.ts       # Database schema (Product table)
    │   └── seed.ts         # Seed script
    ├── providers/
    │   ├── Providers.tsx    # Combined providers wrapper
    │   ├── QueryProvider.tsx# React Query provider
    │   └── ReduxProvider.tsx# Redux provider
    └── store/
        ├── index.ts        # Redux store configuration
        └── slices/
            └── uiSlice.ts  # UI state slice
```

## Design Tokens

The project uses a comprehensive Nike-inspired design token system:

- **Colors:** Nike black, white, orange, volt, grey scale (50-900), semantic colors
- **Typography:** Helvetica Neue-based font stack with modular scale
- **Spacing:** Consistent spacing scale from 0.25rem to 8rem
- **Shadows:** Card shadows, hover effects, elevation system
- **Transitions:** Fast (150ms), normal (250ms), slow (350ms)

Design tokens are available both as CSS custom properties (in `globals.css`) and as a TypeScript object (in `design-tokens.ts`).

## License

MIT
