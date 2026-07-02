# Work Desk v1.0

**Release date:** 30 June 2026
**Codename:** Foundation
**Status:** Stable

Work Desk v1.0 marks the first formal release of the platform — a feature-complete, mobile-ready operations command center for hospital teams. This release replaces the earlier "Hospital Ops" branding and consolidates two months of feature work and stability fixes.

---

## 🎯 What's in v1.0

A role-aware, real-time operations platform for hospital teams. Manage recurring tasks, handovers, delegations, issues, and staff across departments from a single dashboard.

### Core Capabilities

- **Dashboard & Analytics** — live KPI counters, donut charts, drill-down popups (main admin + staff views)
- **Task Management** — 7 frequencies (daily · 15-day · monthly · quarterly · half-yearly · yearly · delegation), parent/child template engine, extensions, bulk delete, multi-assignee, status pills
- **Handovers** — outgoing + incoming flows, accept/reject with remarks, date-range status engine, email notifications
- **Delegations** — one-off tasks with extension requests, auto-sync into the unified `workdesk-delegations` collection
- **Issues Tracker** — priority-coded (P1/P2/P3) problem reports, escalation, resolve flow, date-range exports
- **Checklists & Escalation** — staff-adoptable templates + P1/P2/P3 escalation with SLA timer
- **Staff & Departments** — directory, incharge assignment, dept password, soft-delete protection
- **Admin Roles** — 22 fine-grained permissions, Main Admin / Admin / Staff hierarchy
- **Notices Module** — Admin Alerts tab (system-routed) + Sent Notices tab (admin-composed) with a top-right Send Notice modal
- **Live Tracking & MIS** — per-employee status, role-scoped reports, date-range Excel export
- **Activity Log + Trash + Links Box** — full audit trail, 30/90-day recovery, bookmark manager
- **Mobile-Responsive UX** — tap-to-expand rows, collapsible date pickers, stacked layouts, all pages phone-ready

### Realtime & Sync

- **Postgres `postgres_changes` channel** — sub-second cross-device sync
- **3-layer architecture** — Supabase (source of truth) → LocalStorage (`workdesk-xxx` cache) → In-memory React state
- **Race-condition guard** — `workdesk-last-local-write` timestamp prevents realtime events from overwriting local optimistic writes
- **Offline-first** — every page works from cache; queued writes flush on reconnect

### Security

- Anon-key Supabase auth (service role never bundled to client)
- 22 fine-grained permission gates on every protected route and action
- 5-minute inactivity auto-logout
- Row-Level Security policies in place for data isolation

---

## 🆕 New in v1.0 (since the rebrand)

### Features

- **Staff Dashboard popup affordance** — drill-down card popups now show a `📋 Open Manage Task →` button when the employee holds the `tasks_view` permission. Without the perm the button is hidden entirely. Routes to `/tasks?focus=<taskId>` so Tasks.jsx opens the matching task's detail modal automatically. (`src/pages/Dashboard.jsx#StaffDashboard`, `TasksDrilldownModal.jsx`, `Tasks.jsx:356-364`)
- **Notices module split** — main admin's Notices page now has two tabs (`🔔 Admin Alerts` + `📤 Sent Notices`) with a top-right `📨 Send Notice` button that opens a modal. Employee Notice History view is unchanged. (`src/pages/Notices.jsx`)

### Fixes

- **Manage Tasks delete** — removed a pending-sibling dedup that was hiding rows after deletion, making the user think "delete didn't work." All pending children are now individually visible and deletable. (`src/pages/Tasks.jsx`)
- **Department change → upcoming tasks** — when an employee accepts a dept change, their upcoming pending tasks are now **marked as cancelled** (not deleted) so they show in the Done tab as `🚫 CANCELLED` for audit. Cascades to child tasks. Multi-assignee tasks strip the moving employee from `assignedTo` instead. (`src/components/layout/AppLayout.jsx#acceptDeptChange`, `src/pages/MyTasks.jsx#checkPendingDeptChange`)

---

## 📋 Full Changelog

### Since the rebrand (4 commits)

Latest commits with various fixes and feature improvements.

### Earlier milestones (selected)

- Rebrand from Hospital Ops to Work Desk
- Mobile-friendly Manage Tasks / Activity Log / MIS Reporting
- Employee dashboard cards-as-popups + tabbed My Tasks
- Shared FilterPopup component across all list pages
- Admin bell notifications for employee activities
- Delegation Tasks page with auto-sync + MIS date filtering
- Project showcase documentation
- Initial commit: Hospital Ops Management System

---

## 🛣 Roadmap (next)

See the roadmap section below for the planned Q3 2026 → Q2 2027 milestones:

- **Q3 2026** — Supabase Auth migration, Row-Level Security policies
- **Q4 2026** — Mobile PWA + Twilio SMS alerts
- **Q1 2027** — Multi-hospital tenancy, custom dashboards
- **Q2 2027** — AI task-suggestion, HIPAA-style audit log export

---

## 🧰 Tech Stack (at v1.0)

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, React Router v7 |
| UI | Tailwind CSS v4, Framer Motion, inline styles, SheetJS |
| State | React Context (AppContext + AuthContext) |
| Backend | Supabase (PostgreSQL 15) — realtime `postgres_changes` |
| Email | Brevo (Sendinblue) SMTP via Express server (`server/`) |
| Hosting | Vercel (SPA rewrite via `vercel.json`) |
| Build | Vite 8, oxlint |

22 permissions · 3 user roles · 7 task frequencies · 25 page components · 11 Supabase tables.

---

## 📄 License

Private project — all rights reserved.
