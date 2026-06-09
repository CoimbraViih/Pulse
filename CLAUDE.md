# Pulse — Project Brief

Pulse (FlowPlanner) is a productivity web planner that functions as a **decision system**, not just a task registry. It targets Brazilian solo entrepreneurs who abandon traditional planners within 30 days by solving energy management, context switching, and values-vs-time alignment.

Full PRD: [docs/PRD.md](docs/PRD.md)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| UI | React + shadcn/ui |
| Styling | Tailwind CSS v4 |
| Auth + DB | Supabase (Auth, Postgres, Realtime) |
| Payments | Stripe |
| Hosting | Vercel (Fluid Compute) |

---

## Folder Structure

```
pulse/
├── app/                    # Next.js App Router — pages and layouts
│   ├── (auth)/             # Login, signup, password reset
│   ├── (app)/              # Authenticated app shell
│   │   ├── dashboard/
│   │   ├── calendar/
│   │   ├── planner/        # Daily planning view (core)
│   │   ├── relationships/  # Relationship tracker
│   │   ├── reports/
│   │   └── settings/
│   ├── (marketing)/        # Landing page, pricing
│   └── api/                # Route handlers
├── components/
│   ├── ui/                 # shadcn/ui primitives (auto-generated, do not hand-edit)
│   └── [feature]/          # Feature-scoped components
├── lib/
│   ├── supabase/           # Supabase client + server helpers
│   ├── stripe/             # Stripe helpers
│   └── utils.ts
├── hooks/                  # Custom React hooks
├── types/                  # Shared TypeScript types and DB schema types
└── docs/                   # PRD and other project docs
```

---

## Design Language

- **Mode:** Dark mode default. Light mode optional, never the primary.
- **Accent color:** Orange/amber (`#F97316` / `orange-500`) — used for energy, urgency, and CTAs.
- **Typography:** Sans-serif (Geist or Inter), clear typographic hierarchy.
- **Density:** Every pixel has a function. No decorative elements.
- **Animations:** Subtle micro-animations on task completion for positive reinforcement. No gratuitous motion.
- **Visual references:** Linear (speed + clarity), Notion (familiarity), Todoist (capture simplicity).

### Tailwind Conventions
- Use CSS variables for theme tokens via Tailwind v4 config.
- Dark mode via `class` strategy (shadcn default).
- Avoid arbitrary values — extend the theme if needed.

---

## Feature Domains

### Core
| Domain | Description |
|--------|-------------|
| Auth | Supabase Auth — email/password + magic link |
| Dashboard | Daily overview: energy state, tasks, focus score |
| Planner | Daily planning session — the core loop |
| Calendar | Week/month view integrated with tasks |
| Notifications | In-app + email reminders |
| Reports | Weekly calibration, values alignment chart |
| Landing Page | Marketing page with pricing + social proof |
| Onboarding | Guided setup: energy quiz, first plan |

### Proprietary Modules (Differentiators)
| Module | Description |
|--------|-------------|
| Energy Profile | Initial quiz maps high/low energy windows; tasks matched to energy level |
| If-Then Protocol | Each task has an execution trigger field |
| Not-List | Conscious elimination before planning the day |
| 80/20 Map | Weekly impact×effort matrix |
| Context Groups | deep work / operational / creative / communication — no mixing |
| Calibration Loop | Planned-vs-executed accuracy graph over weeks |
| Relationship Tracker | Strategic contacts with contact frequency and last-contact log |
| Sprint/Maintenance Mode | Two distinct templates; user toggles the current mode |
| Values Alignment Panel | Weekly drift visualization between stated values and time spent |
| Recovery Blocks | System enforces minimum rest intervals before planning is accepted |

---

## Data Model (Key Entities)

- `users` — extended Supabase auth profile (energy profile, mode, subscription status)
- `tasks` — id, user_id, title, context, energy_level, if_then, is_not_list, impact, effort, status, date
- `daily_plans` — id, user_id, date, mode (sprint|maintenance), reflection, planned_count, completed_count
- `recovery_blocks` — id, user_id, start_time, end_time, date
- `contacts` — id, user_id, name, frequency, last_contact_date, notes
- `values` — id, user_id, label, weekly_target_hours
- `time_entries` — id, user_id, task_id, value_id, duration, date

---

## Monetization

- **Model:** Info product + platform access (one purchase unlocks both)
- **Ticket:** R$97–R$297 (Brazilian market)
- **Payments:** Stripe Checkout + webhooks to update `subscription_status` in Supabase
- **Gating:** Premium features behind `is_premium` flag on the user profile

---

## Conventions

### General
- TypeScript strict mode always on.
- No `any`. Use `unknown` and narrow explicitly.
- Prefer server components; use `"use client"` only when necessary (interactivity, hooks, browser APIs).
- Co-locate component logic — keep files under 200 lines where possible.

### Data Fetching
- Server components fetch directly via Supabase server client.
- Client components use SWR or React Query for mutations and real-time subscriptions.
- Never expose Supabase service role key to the client.

### Auth
- All `(app)/` routes require an authenticated session.
- Use Supabase middleware to redirect unauthenticated users.
- Row-level security (RLS) enabled on all user-owned tables.

### API Routes
- Use Next.js Route Handlers (`app/api/`).
- Validate request bodies with Zod.
- Return consistent `{ data, error }` shapes.

### Styling
- shadcn/ui components as the base — extend via `className`, never patch the source files in `components/ui/`.
- Feature components live in `components/[feature]/`, not inside `app/`.

---

## Development Process

1. Break work into milestone-sized increments — each must be independently testable and deployable.
2. Core auth and data model before any UI.
3. Test each milestone manually (and with automated tests where feasible) before moving on.
4. Landing page and marketing routes are developed in parallel with the app, not after.
