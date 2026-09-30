# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


# Mingly

Mingly is currently a frontend-only social app demo. Chats, messages, stories, moments, circles, profile preferences, notifications, and call history are stored in the current browser with `localStorage`; no database or account is required to run it.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Local demo behavior

- Data is isolated to this browser and device. Clearing this site's storage resets the demo to its sample data.
- Calls, invitations, voice notes, and shared attachments are local simulations. They do not contact other users or send real media.
- Authentication, cross-device sync, real-time messaging, and server-backed security require a backend. The UI does not claim that local messages are end-to-end encrypted.

The app's persistence is currently kept behind a small local state hook in `src/App.jsx`; replace that boundary with MongoDB or Supabase access when the backend is ready.
