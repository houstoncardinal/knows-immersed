# Environment Variables Setup Guide

This guide will help you set up all the necessary environment variables for the KNOWS STUDIOS application.

## Quick Start

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual credentials in the `.env` file

3. Never commit the `.env` file to version control (it's already in `.gitignore`)

---

## 🔐 Required Environment Variables

### Supabase Configuration

**Where to get these:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy the Project URL and anon/public key

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Optional Service Role Key (for server-side operations):**
```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```
⚠️ **WARNING:** Never expose the service role key in client-side code!

---

### OpenAI Configuration

**Where to get these:**
1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy your Organization ID from Settings

```env
VITE_OPENAI_API_KEY=sk-...
VITE_OPENAI_ORGANIZATION_ID=org-...
```

**Optional model settings:**
```env
VITE_OPENAI_MODEL=gpt-4-turbo-preview
VITE_OPENAI_MAX_TOKENS=4000
```

---

### ElevenLabs Configuration

**Where to get these:**
1. Go to [ElevenLabs Settings](https://elevenlabs.io/app/settings/api-keys)
2. Generate an API key
3. For Voice ID: Go to Voice Library and copy the ID of your chosen voice

```env
VITE_ELEVENLABS_API_KEY=your_api_key_here
VITE_ELEVENLABS_VOICE_ID=your_voice_id_here
```

**Optional voice settings:**
```env
VITE_ELEVENLABS_MODEL_ID=eleven_monolingual_v1
VITE_ELEVENLABS_STABILITY=0.5
VITE_ELEVENLABS_SIMILARITY_BOOST=0.75
```

---

### Agent Configuration

Set your custom agent ID for AI workflows:

```env
VITE_AGENT_ID=your_agent_id_here
VITE_AGENT_NAME=KNOWS_STUDIOS_ASSISTANT
VITE_AGENT_VERSION=1.0.0
```

---

## 🌐 Application Configuration

### Environment Type
```env
VITE_APP_ENV=development  # or staging, production
```

### URLs
```env
VITE_APP_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 🔌 Optional Third-Party Services

### Google Analytics
```env
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Stripe (for payments)
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### Sentry (for error tracking)
```env
VITE_SENTRY_DSN=https://...@sentry.io/...
```

---

## 🔒 Security Configuration

### JWT & Session Secrets

Generate secure random strings for these:

```bash
# Generate a secure random string (run in terminal)
openssl rand -base64 32
```

```env
JWT_SECRET=your_generated_secret_here
SESSION_SECRET=your_generated_secret_here
```

---

## 📝 Important Notes

### Vite Environment Variables
- All variables prefixed with `VITE_` are exposed to the client
- Variables without `VITE_` prefix are server-side only
- Never put sensitive keys in `VITE_` variables if they shouldn't be public

### Environment Files Priority
1. `.env.local` - Local overrides (highest priority)
2. `.env.[mode].local` - Mode-specific local overrides
3. `.env.[mode]` - Mode-specific variables
4. `.env` - Base environment (lowest priority)

### Security Best Practices
- ✅ DO commit `.env.example` to version control
- ❌ DON'T commit `.env` or `.env.local` files
- ✅ DO rotate API keys regularly
- ❌ DON'T share API keys in screenshots or logs
- ✅ DO use different keys for development/production

---

## 🚀 Verification

After setting up your `.env` file, verify it's working:

```bash
# Start the development server
npm run dev

# Check for any environment variable errors in the console
```

---

## 🆘 Troubleshooting

### Variables not loading?
1. Make sure the file is named exactly `.env` (not `.env.txt`)
2. Restart your development server after changing `.env`
3. Check that variables start with `VITE_` for client-side access
4. Ensure there are no spaces around the `=` sign

### Getting "undefined" values?
1. Verify the variable name matches exactly (case-sensitive)
2. Check that you're accessing it correctly:
   ```typescript
   const apiKey = import.meta.env.VITE_OPENAI_API_KEY
   ```
3. Make sure the variable is prefixed with `VITE_` for client-side code

---

## 📚 Additional Resources

- [Vite Environment Variables Documentation](https://vitejs.dev/guide/env-and-mode.html)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [ElevenLabs API Documentation](https://elevenlabs.io/docs)

---

**Need help?** Contact the development team or check the project documentation.
