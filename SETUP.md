# Google Calendar connection setup

Google events already use ECBC's own calendar layout. News remains managed in ECBC.
Production is blocked until the placeholder API_URL in app.js is replaced with the actual backend Worker origin.

## Cloudflare
Deploy worker.js to the intended backend Worker, preserving existing data.
Bind a D1 database as DB; tables initialize automatically.
Configure:
- SITE_URL: https://seunghyeonbang78-bot.github.io/ecbc-/
- OWNER_CODE (secret): your Owner code, 7–128 characters
- GOOGLE_CLIENT_ID: Google OAuth web client ID
- GOOGLE_CLIENT_SECRET (secret): Google OAuth client secret
- GOOGLE_TOKEN_KEY (secret): randomly generated secret of at least 32 characters; retain it to decrypt saved tokens
- GOOGLE_REDIRECT_URI: actual Worker HTTPS origin followed by /oauth/callback

Never save secrets in GitHub. Replace API_URL in app.js with that Worker's origin.
Add a Cron Trigger with expression `* * * * *` to run the existing scheduled handler every minute.
The website polls every 30 seconds. Allow roughly 1–2 minutes under normal conditions.
Without a Cron Trigger, use Sync now. Trigger changes may take time to propagate.

## Google Cloud
Enable Google Calendar API. Configure the consent screen.
Create an OAuth client with application type Web application.
Add the exact GOOGLE_REDIRECT_URI as an authorized redirect URI.
Scopes:
- openid
- email
- https://www.googleapis.com/auth/calendar.calendarlist.readonly
- https://www.googleapis.com/auth/calendar.events.readonly

In Testing mode, add each Owner as a test user. Calendar refresh tokens in Testing can expire after seven days.
For ongoing use, complete Google's applicable publishing/verification requirements.

## Owner steps
1. Sign in with the ECBC Owner code.
2. Click Connect Google Calendar and authorize your Google account.
3. Select a dedicated ECBC calendar in the automatically displayed selector.
4. Confirm publication of that calendar's titles, times, locations and descriptions.
5. Add, change or delete events in Google Calendar; ECBC updates using its existing layout.

Explicitly private events are excluded. News stays separate.
Recurring, all-day and multi-day events are supported. Times display in America/New_York.
Different owners can connect their accounts; identical calendar IDs are deduplicated.
Sync continues after logout. New Owner sessions may require Google reconnection to manage the account's settings.
The sync window covers roughly the previous year and the next two years.

## Verify after setup
Check Owner login and News editing, Google callback and calendar selection.
Add, modify and delete a test Google event and check ECBC after sync.
Confirm private events are excluded and shared calendars do not appear twice.
Log out and check that public calendar events remain visible.

## Official references
https://developers.google.com/identity/protocols/oauth2/web-server
https://developers.cloudflare.com/workers/configuration/cron-triggers/
