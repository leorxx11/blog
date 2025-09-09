# Repository Guidelines

## Project Structure & Module Organization
- `src/app` — Next.js App Router routes (e.g., `src/app/blog/[slug]/page.tsx`).
- `src/components` — Reusable React components (PascalCase files, e.g., `PostCard.tsx`).
- `src/lib` — Framework-agnostic utilities and content parsers (no side effects).
- `src/types` — Shared TypeScript types and interfaces.
- `content` — MD/MDX posts (suggested: `content/blog/<slug>.mdx` with frontmatter).
- `public` — Static assets served at site root.
- `scripts` — Local tooling (e.g., `new-post.sh`, `setup.sh`).

## Build, Test, and Development Commands
- `npm run dev` — Start local dev at `http://localhost:3000`.
- `npm run build` — Production build via Next.js.
- `npm start` — Serve the production build.
- `npm run lint` — ESLint (Next.js config) for code quality.
- `npm run type-check` — TypeScript checks (`tsc --noEmit`).
- `npm run format` — Prettier with Tailwind class sorting.
Note: RSS and sitemap ship via API routes with rewrites (`/rss.xml` → `/api/rss`, `/sitemap.xml` → `/api/sitemap`).

## Coding Style & Naming Conventions
- TypeScript across the repo; 2-space indentation.
- Components in PascalCase, hooks as `useThing`, variables/functions in camelCase.
- Component files `*.tsx` (PascalCase); library files `kebab-case.ts`.
- Prefer named exports; co-locate small helpers with their consumer.
- Tailwind for styling; compose classes with `clsx`; keep complex logic out of JSX.
- MDX frontmatter keys: `title`, `date`, `description`, `tags`, `draft`.

## Testing Guidelines
- No formal test runner configured yet; gate PRs with `npm run lint` and `npm run type-check`.
- If introducing tests, prefer Vitest + Testing Library; name files `*.test.ts(x)` alongside sources.
- Prioritize unit tests for `src/lib` and content transforms.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
- PRs must: describe the change, link issues, include UI screenshots/GIFs when relevant, and note accessibility impacts.
- CI expectations: `lint` and `type-check` pass; app runs cleanly with `npm run dev`.

## Security & Configuration Tips
- Never commit secrets; store environment values in `.env.local`.
- Review `next.config.js` and `vercel.json` for headers, rewrites, and deployment behavior.
- Use Node.js 18+ to match Next.js 14 requirements.

