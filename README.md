# HelpHive

A community-driven platform where people create, join and track social service events in their local area, such as winter clothes distribution, blanket distribution, plantation drives and cleanups.

**Live site:** https://your-live-site-url.vercel.app  <!-- replace with your real URL after deployment -->

## Features

- Create events with title, type, location, thumbnail and a future-only date.
- Browse upcoming events with search by title or location and a filter by event type.
- Join an event with one click. Your joined events are listed on a separate page, sorted by date.
- Manage your own events: update or delete them. Only the creator can change an event.
- Secure email and password login plus GitHub login, with protected routes that survive a page reload.
- Light and dark theme toggle that changes the whole website.
- Loading skeletons on every data page, and a profile page to update your name and photo.

## Tech stack

Next.js (App Router), Tailwind CSS, daisyUI, Better Auth (MongoDB adapter + JWT plugin), Express.js, MongoDB.

## Run it locally

1. Install packages: `npm install`
2. Copy `.env.example` to `.env.local` and fill in every value.
3. Start the API server first (see `../server/README.md`).
4. Start this app: `npm run dev` and open http://localhost:3000

## Deploy

1. Push to GitHub and import the `client` folder into Vercel.
2. Add all variables from `.env.example` in Vercel. Set `BETTER_AUTH_URL` to your live URL and `NEXT_PUBLIC_API_URL` to your live server URL.
3. In your GitHub OAuth App, set the callback URL to `https://<your-live-url>/api/auth/callback/github`.
