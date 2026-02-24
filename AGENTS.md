# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Personal portfolio website for a Frontend Developer. Built with Vite, React, TypeScript, Tailwind CSS, and shadcn-ui components. Supports Spanish (default) and English via a custom i18n context.

## Commands

```bash
npm i           # Install dependencies
npm run dev     # Start dev server (port 8080)
npm run build   # Production build
npm run lint    # Run ESLint
npm run test    # Run all tests once
npm run test:watch  # Run tests in watch mode
```

Run a single test file:
```bash
npx vitest run src/path/to/file.test.tsx
```

## Architecture

### Path Alias
`@/` resolves to `src/` (configured in vite.config.ts and tsconfig.json)

### Key Directories
- `src/pages/` - Route components (Index, Resume, NotFound)
- `src/components/` - Section components (Hero, About, Services, Projects, etc.)
- `src/components/ui/` - shadcn-ui primitives (do not edit manually, use shadcn CLI)
- `src/contexts/LanguageContext.tsx` - i18n with inline Spanish/English translations
- `src/hooks/` - Custom React hooks
- `src/lib/utils.ts` - `cn()` helper for Tailwind class merging

### Provider Hierarchy (App.tsx)
```
QueryClientProvider → LanguageProvider → TooltipProvider → BrowserRouter
```

### Internationalization
Translations are defined inline in `src/contexts/LanguageContext.tsx`. Use the `useLanguage()` hook:
```tsx
const { t, language, setLanguage } = useLanguage();
// t("nav.about") returns translated string
```
Add new translation keys to both `es` and `en` objects in LanguageContext.

### Styling
- Tailwind CSS with CSS variables for theming (see tailwind.config.ts)
- Color tokens: `primary`, `secondary`, `muted`, `accent`, `destructive`, etc.
- Custom animations: `fade-in`, `fade-in-up`, `glow-pulse`

### Testing
- Vitest with jsdom environment
- React Testing Library for component tests
- Test files: `src/**/*.{test,spec}.{ts,tsx}`
- Setup file: `src/test/setup.ts`

### Routes
Routes are defined in `App.tsx`. Add new routes above the catch-all `*` route.
