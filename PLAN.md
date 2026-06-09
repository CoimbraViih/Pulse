# Pulse — Development Plan

> Reference this file alongside `CLAUDE.md` at the start of every session.
> Mark milestones `[x]` as they are completed. Never skip a milestone — each is a prerequisite for the next.
>
> **Approach:** Frontend-first. M0–M10 are pure UI with mock/local state — no Supabase required. Backend is wired in M11–M12 after all UI is validated.

---

## Dependency Map

```
M0 → M1 → M2 → M3 → M4 → M5 → M6 → M7 → M8 → M9 → M10
                                                        ↓
                                                M11 (Supabase)
                                                        ↓
                                                M12 (Wire to DB)
                                                        ↓
                                               M13 → M14 → M15 → M16
```

---

## M0 — Project Scaffold
**Status:** `[ ]`

**Goal:** Working Next.js app deployed to Vercel with design system and tooling configured.

**Deliverables:**
- `create-next-app` with TypeScript strict, App Router, Tailwind CSS v4
- shadcn/ui initialized (dark mode, orange-500 accent token in CSS vars)
- Geist font configured in `app/layout.tsx`
- ESLint + Prettier configured and passing
- `.env.local.example` with all future variable names stubbed
- Vercel project linked, first deploy green

**Key files:** `app/layout.tsx`, `tailwind.config.ts`, `components/ui/`, `.env.local.example`

**Done when:** `/` renders a placeholder with dark background and orange accent. `vercel deploy` passes.

---

## M1 — App Shell & Navigation
**Status:** `[ ]`
**Depends on:** M0

**Goal:** Authenticated app skeleton with persistent layout, sidebar, and all routes stubbed — no backend.

**Deliverables:**
- `app/(app)/layout.tsx` — sidebar + topbar shell
- Sidebar with nav links: Dashboard, Planner, Calendar, Reports, Relationships, Settings
- Active route highlighting
- User avatar placeholder (static, no auth)
- Mobile sidebar (hamburger + drawer)
- All `(app)/` routes created as empty stub pages
- Dark mode toggle in topbar

**Key files:** `app/(app)/layout.tsx`, `components/layout/Sidebar.tsx`, `components/layout/Topbar.tsx`

**Done when:** All sidebar links navigate to stub pages without errors. Layout is responsive at 375px.

---

## M2 — Onboarding Flow (UI)
**Status:** `[ ]`
**Depends on:** M1

**Goal:** Multi-step onboarding wizard with all steps functional using local state only.

**Deliverables:**
- `/onboarding` route with progress bar (3 steps)
- Step 1: Energy quiz — 5 questions mapping morning/afternoon/evening energy windows; local state saves selections
- Step 2: Values declaration — add 3–5 values with weekly hour targets; add/remove value chips
- Step 3: Mode selection — Sprint vs. Maintenance cards with visual difference
- "Complete" button logs state to console (no Supabase yet)
- Smooth step transitions (slide or fade)
- Back/Next navigation with validation (can't advance with empty required fields)

**Key files:** `app/(app)/onboarding/page.tsx`, `components/onboarding/StepEnergy.tsx`, `StepValues.tsx`, `StepMode.tsx`, `ProgressBar.tsx`

**Done when:** All 3 steps complete without errors. Selections persist in local state through the flow. Final step shows a summary before "finishing."

---

## M3 — Core Daily Planner (UI)
**Status:** `[ ]`
**Depends on:** M2

**Goal:** Full planner interface with task CRUD, context groups, and completion animation — all in local state.

**Deliverables:**
- `/planner` route defaulting to today's date
- Date navigation (prev/next day arrows)
- Context group tabs: Deep Work / Operational / Creative / Communication
- Task creation form: title, context group, energy level (low/medium/high), if-then trigger field, impact (1–5), effort (1–5)
- Task card: shows title, energy badge, if-then field, impact/effort dots
- Check-off with micro-animation (checkmark + scale + line-through)
- Not-List section: separate area for tasks explicitly excluded today
- "Lock plan" button (visual only, no backend)
- Drag-to-reorder within a context group (`@dnd-kit`)
- All state in `useState` / `useReducer` — no persistence

**Key files:** `app/(app)/planner/page.tsx`, `components/planner/TaskCard.tsx`, `TaskForm.tsx`, `NotList.tsx`, `ContextTabs.tsx`, `CompletionAnimation.tsx`, `hooks/useDailyPlan.ts`

**Done when:** User can add 5 tasks across 3 context groups, drag to reorder, check off with animation, and add 2 items to the Not-List. State resets on refresh (expected at this stage).

---

## M4 — Dashboard (UI)
**Status:** `[ ]`
**Depends on:** M3

**Goal:** Daily overview with all widgets populated from mock static data.

**Deliverables:**
- `/dashboard` as the default authenticated home
- Energy window badge (current time-of-day vs. mock energy profile — e.g. "High Energy Window")
- Task summary widget: Planned / Completed / Not-Listed counts (static mock)
- Focus score gauge: circular or linear progress, color-coded (green/amber/red)
- 7-day streak counter widget
- Quick-add task button → navigates to `/planner`
- "Today's top task" highlight card (first high-energy task from mock data)
- Greeting with time-of-day ("Good morning, [Name]")

**Key files:** `app/(app)/dashboard/page.tsx`, `components/dashboard/EnergyBadge.tsx`, `TaskSummary.tsx`, `FocusScore.tsx`, `Streak.tsx`

**Done when:** Dashboard renders all widgets with mock data. No broken layouts at 375px.

---

## M5 — Calendar View (UI)
**Status:** `[ ]`
**Depends on:** M3

**Goal:** Week and month calendar grid with mock tasks rendered per day.

**Deliverables:**
- `/calendar` route with Week / Month toggle
- Week view: 7-column grid, mock task chips per day
- Month view: standard calendar grid with task count badges per day
- Click a day → navigates to `/planner?date=YYYY-MM-DD`
- Recovery block slots shown as distinct (muted) blocks in week view
- Prev/next navigation for week and month
- Today highlighted with accent color

**Key files:** `app/(app)/calendar/page.tsx`, `components/calendar/WeekGrid.tsx`, `MonthGrid.tsx`, `DayCell.tsx`, `TaskChip.tsx`, `hooks/useCalendar.ts`

**Done when:** Both views render without layout breaks. Day click navigates to planner with correct date in URL.

---

## M6 — Proprietary Modules — Core 5 (UI)
**Status:** `[ ]`
**Depends on:** M3

**Goal:** All 5 differentiator modules integrated into the planner UI with visual logic — no backend.

**Deliverables:**
- **Energy matching:** Task cards tinted/badged by energy level; warning toast if high-energy task scheduled in a low-energy window (based on mock energy profile)
- **If-Then Protocol:** If-then field on every task card; empty field on high-energy task shows inline prompt on completion ("Set your trigger first")
- **Not-List enforcement:** "Lock Plan" button disabled with tooltip if Not-List is empty; first attempt shows warning modal, not a hard block
- **Context group isolation:** Each tab shows only its tasks; tab shows task count badge
- **80/20 Map:** 2×2 matrix (impact × effort) with task dots auto-placed from local state; top-right quadrant ("Do First") highlighted in orange; accessible via panel toggle or `/planner?view=leverage`

**Key files:** `components/planner/EnergyBadge.tsx`, `IfThenField.tsx`, `NotListGate.tsx`, `LeverageMap.tsx`, `hooks/useEnergyMatch.ts`

**Done when:** All 5 modules are interactive with mock data. 80/20 map correctly places tasks by their impact/effort values.

---

## M7 — Calibration & Reports (UI)
**Status:** `[ ]`
**Depends on:** M6

**Goal:** Reports page with charts and summaries rendered from mock historical data.

**Deliverables:**
- `/reports` route
- Calibration chart: line graph, planned vs. completed per day over 4 weeks (mock data, `recharts`)
- Weekly accuracy score card: "You completed 72% of planned tasks this week"
- Values alignment chart: horizontal bar per value — logged hours vs. weekly target (mock data)
- Weekly summary card: best day, worst day, top context group
- Date range selector (visual only at this stage)

**Key files:** `app/(app)/reports/page.tsx`, `components/reports/CalibrationChart.tsx`, `ValuesAlignment.tsx`, `WeeklySummary.tsx`

**Done when:** All charts render with mock data. No layout breaks on mobile.

---

## M8 — Relationship Tracker (UI)
**Status:** `[ ]`
**Depends on:** M3

**Goal:** Contact management list with due-for-contact logic running on mock data.

**Deliverables:**
- `/relationships` route
- Contact list with mock contacts (name, frequency, last contact date, notes)
- "Due for contact" section at top — contacts where `last_contact_date + frequency < today` (client-side calculation)
- Add contact form: name, frequency dropdown (weekly/biweekly/monthly/quarterly), notes
- Edit / delete contact actions
- "Log contact" button → updates `last_contact_date` in local state
- Optional link-to-task field (UI only)

**Key files:** `app/(app)/relationships/page.tsx`, `components/relationships/ContactCard.tsx`, `ContactForm.tsx`, `DueList.tsx`

**Done when:** Mock contacts appear sorted. "Due" section updates on "Log contact." Add/edit/delete work in local state.

---

## M9 — Values Alignment + Recovery Blocks (UI)
**Status:** `[ ]`
**Depends on:** M6

**Goal:** Recovery block enforcement UI and values alignment panel integrated into the planner.

**Deliverables:**
- **Recovery Blocks section** in planner: add blocks with start time, end time, label (rest/walk/lunch)
- Enforcement via `localStorage`: warn on 1st skip, soft block on 2nd, hard block on 3rd consecutive day without a recovery block
- **Values Alignment Panel:** collapsible side panel in planner — each value shows today's estimated hours (from task duration) vs. weekly target, color-coded progress bars
- Task form gains optional "Duration (min)" field and "Assign to value" dropdown

**Key files:** `components/planner/RecoveryGate.tsx`, `RecoveryBlockForm.tsx`, `ValuesPanel.tsx`, `hooks/useRecoveryEnforcement.ts`

**Done when:** Recovery enforcement triggers correctly across 3 sessions (localStorage). Values panel shows correct progress from task durations.

---

## M10 — Sprint / Maintenance Modes (UI)
**Status:** `[ ]`
**Depends on:** M3

**Goal:** Two distinct planner templates toggled by the user, persisted in localStorage.

**Deliverables:**
- Mode toggle (pill button) in planner header
- **Sprint mode:** "North Star Outcome" input at top; max 3 tasks (4th triggers warning); Operational tab hidden
- **Maintenance mode:** all context tabs visible; up to 8 tasks; no North Star prompt
- Mode indicator chip in Dashboard topbar
- Default mode stored in `localStorage`
- `/settings` gains "Default Mode" preference

**Key files:** `components/planner/ModeToggle.tsx`, `SprintTemplate.tsx`, `MaintenanceTemplate.tsx`, `app/(app)/settings/page.tsx`

**Done when:** Switching modes changes the planner template immediately. Mode persists across page refreshes via localStorage.

---

## M11 — Database Schema & Auth (Supabase)
**Status:** `[ ]`
**Depends on:** M10

**Goal:** All Supabase tables live, RLS enforced, auth routes working end-to-end.

**Deliverables:**
- Supabase project linked + env vars wired
- Migration `001_initial_schema.sql`: `users`, `tasks`, `daily_plans`, `recovery_blocks`, `contacts`, `values`, `time_entries`
- RLS policies on every user-owned table
- Auth routes: `/login`, `/signup`, `/reset-password` (replace stub pages)
- Supabase middleware protecting all `(app)/` routes → redirect to `/login`
- Onboarding guard: new users redirected to `/onboarding` before `/dashboard`
- `lib/supabase/server.ts`, `lib/supabase/client.ts`, `types/database.ts`

**Key files:** `supabase/migrations/001_initial_schema.sql`, `middleware.ts`, `app/(auth)/login/page.tsx`, `signup/page.tsx`, `reset-password/page.tsx`

**Done when:** New user signs up → `/onboarding`. Login → `/dashboard`. Unauthenticated `/dashboard` → redirected to `/login`.

---

## M12 — Wire App to Supabase
**Status:** `[ ]`
**Depends on:** M11

**Goal:** Replace all mock data and localStorage state with real Supabase queries across every feature.

**Deliverables:**
- Tasks CRUD → `app/api/tasks/route.ts`, `hooks/useDailyPlan.ts` reads/writes Supabase
- Daily plans created/updated on planner open + lock
- Onboarding saves energy profile + values to `users` + `values` tables
- Dashboard queries real aggregated data
- Calendar fetches tasks by date range
- Reports queries `daily_plans` and `time_entries`
- Contacts full CRUD → `contacts` table
- Recovery blocks → `recovery_blocks` table
- Streak counter derived from `daily_plans`
- All `localStorage` replaced with Supabase; localStorage kept only for UI preferences (mode, theme)

**Done when:** Create a task, refresh the page — task persists. All features work with a real Supabase-backed user account.

---

## M13 — Monetization (Stripe + Premium Gating)
**Status:** `[ ]`
**Depends on:** M12

**Goal:** Stripe Checkout wired; premium flag gates proprietary modules (M6–M10).

**Deliverables:**
- Stripe product + price (R$197 one-time, configurable via env)
- `app/api/stripe/checkout/route.ts` — creates Checkout session
- `app/api/stripe/webhook/route.ts` — sets `is_premium = true` on `checkout.session.completed`
- `components/PremiumGate.tsx` — wraps M6–M10 features; shows upgrade prompt for free users
- `/settings/billing` page: current plan + "Upgrade" button
- Stripe test mode end-to-end

**Done when:** Test card purchase → `is_premium = true` in DB → proprietary modules unlock without reload.

---

## M14 — Notifications
**Status:** `[ ]`
**Depends on:** M13

**Goal:** In-app and email reminders for planning and relationship follow-ups.

**Deliverables:**
- Notification bell in topbar with unread badge count
- Notification types: "No plan today", "Contact due: [Name]", "Plan locked — great work!"
- In-app notifications in a `notifications` Supabase table
- Email via Supabase Edge Function + Resend: daily 9am reminder if no plan exists
- `/settings/notifications`: toggle email on/off, set reminder time

**Done when:** User with no plan receives in-app notification on next login. Email arrives via Resend sandbox.

---

## M15 — Landing Page
**Status:** `[ ]`
**Depends on:** M13

**Goal:** High-converting marketing page live at `/`.

**Deliverables:**
- `app/(marketing)/page.tsx` at root `/`
- Hero: headline, sub-headline, CTA → `/signup`
- Problem/solution section (3 core problems from PRD)
- 10 differentiator feature cards
- Social proof placeholder section
- Pricing section: free vs. premium (R$197), CTA wired to Stripe Checkout
- FAQ accordion (5–7 questions)
- Footer with links
- Mobile-responsive, Lighthouse ≥ 90

**Done when:** Landing page live at `/`. CTA completes a Stripe test purchase. Mobile layout verified at 375px.

---

## M16 — Export & Final Polish
**Status:** `[ ]`
**Depends on:** M14, M15

**Goal:** PDF/CSV export, accessibility pass, rate limiting, production hardening.

**Deliverables:**
- Export daily plan as PDF: `app/(app)/planner/print/page.tsx` (print stylesheet)
- Export calibration report as CSV: `app/api/export/route.ts`
- Lighthouse ≥ 90 on performance + accessibility for `/`, `/dashboard`, `/planner`
- Error boundaries on all major routes
- Rate limiting on API routes (Vercel Edge or `@upstash/ratelimit`)
- `app/sitemap.ts` + `app/robots.ts`
- Final mobile QA at 375px on all routes

**Done when:** PDF downloads. CSV opens in Excel. Lighthouse CI passes.

---

## Progress Tracker

| Milestone | Status | Started | Completed |
|-----------|--------|---------|-----------|
| M0 — Project Scaffold | `[ ]` | | |
| M1 — App Shell & Navigation | `[ ]` | | |
| M2 — Onboarding Flow (UI) | `[ ]` | | |
| M3 — Core Daily Planner (UI) | `[ ]` | | |
| M4 — Dashboard (UI) | `[ ]` | | |
| M5 — Calendar View (UI) | `[ ]` | | |
| M6 — Proprietary Modules (UI) | `[ ]` | | |
| M7 — Calibration & Reports (UI) | `[ ]` | | |
| M8 — Relationship Tracker (UI) | `[ ]` | | |
| M9 — Values Alignment + Recovery (UI) | `[ ]` | | |
| M10 — Sprint/Maintenance Modes (UI) | `[ ]` | | |
| M11 — Database Schema & Auth | `[ ]` | | |
| M12 — Wire App to Supabase | `[ ]` | | |
| M13 — Monetization (Stripe) | `[ ]` | | |
| M14 — Notifications | `[ ]` | | |
| M15 — Landing Page | `[ ]` | | |
| M16 — Export & Final Polish | `[ ]` | | |
