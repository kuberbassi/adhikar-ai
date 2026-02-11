<div align="center">

# ⚖️ Adhikar.ai

**justice, simplified.**

AI-powered legal notice generator for Indian citizens.  
describe your problem → get a court-ready notice → send it.

[Live Demo](https://adhikar-ai.vercel.app) · [Report Bug](https://github.com/yourusername/adhikar-ai/issues)

---

</div>

## what it does

you tell it what happened. it figures out which law was broken.  
then it drafts a proper legal notice — with the right act, section, and formal language.

no lawyer needed. no legal jargon. just plain language in, legal notice out.

## the stack

| layer | tech |
|-------|------|
| **frontend** | react + vite + tailwind css v4 |
| **backend** | node.js + express |
| **ai** | llama 3.3 70b via groq (open-source) |
| **icons** | lucide react |

## features

- 🤖 **real ai analysis** — powered by llama 3.3 (70B params), not just keyword matching
- 📜 **6 legal categories** — consumer, rental, employment, fraud, service, general
- 📄 **auto-drafted notices** — professional format with act/section references
- 📚 **legal database** — searchable indian acts with 25+ sections
- 💰 **pricing page** — freemium model (everything free in demo)
- 🔒 **privacy & terms** — proper legal pages included
- 📱 **fully responsive** — works on mobile, tablet, desktop
- 🎨 **dark premium ui** — glassmorphism, animations, the works

## quick start

```bash
# clone
git clone https://github.com/yourusername/adhikar-ai.git
cd adhikar-ai

# install everything
npm install
cd client && npm install
cd ../server && npm install
cd ..

# add your free groq api key
# get one at https://console.groq.com (free, no credit card)
cp server/.env.example server/.env
# edit server/.env → paste your key

# run
npm start
```

opens at `http://localhost:5173`

## deployment (vercel)

since this is a monorepo (react + express), i've added a `vercel.json` config for you.

1. **push to github**
   ```bash
   git remote add origin https://github.com/yourusername/adhikar-ai.git
   git branch -M main
   git push -u origin main
   ```

2. **connect to vercel**
   - go to [vercel.com](https://vercel.com) → click "add new..." → "project"
   - import your `adhikar-ai` repo
   - **framework preset**: choose "other" (or let it detect, but make sure it uses the root directory)
   - **environment variables**: add `GROQ_API_KEY`
   - click **deploy**

vercel will handle the rest:
- acts as a web server for the react app
- turns the express backend into serverless functions

## structure

```
adhikar-ai/
├── client/                 # react frontend
│   ├── src/
│   │   ├── components/     # Hero, FileUpload, Dashboard, LoadingOverlay
│   │   └── pages/          # Solutions, Pricing, LegalDatabase, HowItWorks, Privacy, Terms
│   └── index.html
├── server/                 # express backend
│   ├── routes/             # /api/analyze, /api/draft
│   └── services/           # ai.js (groq integration)
└── package.json            # runs both with concurrently
```

## screenshots

> coming soon — the ui is too good to screenshot at 2am

## how the ai works

1. your complaint goes to the `/api/analyze` endpoint
2. groq sends it to **llama 3.3 70b** (open-source by meta)
3. the model identifies the violated law, section, severity
4. returns structured json → frontend renders it
5. then `/api/draft` generates a full legal notice using the same model

if the api key isn't set, it falls back to keyword-based analysis.  
still works. just less impressive.

## credits & acknowledgements

built in a caffeine-fueled hackathon sprint ☕

- **[TRAE IDE](https://trae.ai)** — used for debugging the tailwind v4 migration issues and brainstorming the loading overlay animation flow. also helped with structuring the groq api integration and the legal database search/filter logic. solid tool for pair-programming sessions.
- **[groq](https://groq.com)** — free api for llama inference. stupidly fast.
- **[lucide](https://lucide.dev)** — clean icon set that doesn't make your eyes bleed.
- india's open legal framework — for being publicly accessible.

## license

[MIT](LICENSE) — do whatever you want with it.

---

<div align="center">

made with sleep deprivation and good intentions 🇮🇳

</div>
