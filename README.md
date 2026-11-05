# Nuxt 4 + Supabase Auth

Sign up with email confirmation, login, and forgot/reset password. Built with Nuxt 4 and `@nuxtjs/supabase`.

## Supabase setup

1. Create a project at supabase.com. Copy the **Project URL** and **anon/publishable key** into `.env` (see `.env.example`).
2. **Authentication > Providers > Email**: enable it and keep **Confirm email** ON. This is what blocks login until the email is confirmed.
3. **Authentication > URL Configuration**: set Site URL to `http://localhost:3000` and add `http://localhost:3000/**` to Redirect URLs (add your production URL too when deploying).
4. **Authentication > Sign In / Providers > Password requirements** (or Policies): min length 8, require lowercase, uppercase, digits and symbols. The UI enforces this too, but the server must as well.
5. The built-in mailer is heavily rate limited. Configure custom SMTP for anything beyond testing.

## Run

```bash
npm install
cp .env.example .env   # then edit
npm run dev            # http://localhost:3000
```

## Flow

- `/signup` - email, password (eye toggle, strength meter, rule checklist), confirm password. Sends a confirmation email, then shows "Check your email" with a resend button.
- `/confirm` - landing page for the email link; signs in and redirects to `/dashboard`.
- `/login` - blocked with a clear message (and resend option) until the email is confirmed.
- `/forgot-password` - emails a reset link to `/reset-password`, where a new password (same rules) is set.
- `/dashboard` - protected; redirects to `/login` when signed out.
