# HelpHive Client

**HelpHive** is a community-driven event management platform that helps people organise, discover, and participate in local social-service activities. Users can create events such as winter clothing distributions, food drives, plantation programmes, blood donation campaigns, and community cleanups. Volunteers can browse upcoming events, join activities, and keep track of their commitments.

The application is built with the Next.js App Router and Better Auth. Event data is loaded from a separately running HelpHive API, while MongoDB is used by Better Auth for authentication data.


## Technology Stack

### Frontend

- Next.js 15
- React 19
- JavaScript
- Tailwind CSS 
- DaisyUI 
- Better Auth
- React Hot Toast
- React Icons

### Backend and data services

- Express.js API 
- MongoDB
- Better Auth MongoDB adapter and JWT plugin
- Google OAuth (optional; requires Google OAuth credentials)

## Features

1. **Community Event Discovery** — Browse upcoming community-service events, view event information, and explore activities by category.
2. **Event Search and Filtering** — Search events by title or location and filter the results by event type.
3. **Event Creation and Management** — Signed-in users can create events with a title, description, category, image URL, location, and event date. Organisers can edit or delete their own events.
4. **Event Participation** — Signed-in users can join available events, view their joined events, and leave events they no longer plan to attend.
5. **User Authentication** — Register and sign in with email and password, or use Google sign-in when Google OAuth credentials are configured.
6. **Protected User Pages** — Create Event, Manage Events, Joined Events, and My Profile pages require an authenticated session.
7. **Profile Management** — View account information and update the profile name. A profile image URL can be supplied during registration.
8. **Light and Dark Themes** — Switch between light and dark colour themes; the selected theme is saved in browser local storage.
9. **Responsive Interface** — Responsive layouts support desktop, tablet, and mobile screen sizes.
10. **Loading and Feedback States** — Data pages include loading skeletons, empty states, error messages, retry actions, and toast notifications.
