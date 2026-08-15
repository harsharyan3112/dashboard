# Nexora Pulse

Frontend-only interactive SaaS dashboard prototype.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Architecture

UI -> hooks/state -> service layer -> mock data

The mock service layer is deliberately separated so it can later be replaced with Spring Boot REST APIs without rebuilding the UI.

## Current working interactions

- Dashboard navigation
- Project search
- Add project modal
- Create project
- Project status updates
- Revenue range selector
- Notification toast
- Responsive mobile navigation
- Responsive project table
- Charts
- Demo-mode indicator

## Backend migration

Replace `lib/services/project-service.ts` with API calls such as:

GET /api/projects
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id

Keep the UI components unchanged wherever possible.
