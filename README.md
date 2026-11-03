<div align="center">

# ⚖️ Adhikar.ai
**Justice, Simplified.**

*AI-Powered Legal Empowerment & Digital Rights Intelligence for 1.4 Billion Indians.*  
Describe your dispute → Identify the Law & Licenses → Generate Court-Ready Notices in Seconds.

[Live Platform](https://adhikar.ai.kuberbassi.com) · [Report Bug](https://github.com/kuberbassi/adhikar-ai/issues) · [Technical Docs](PROJECT_DOCUMENTATION.md)

---

</div>

## 📖 Introduction

Navigating the Indian legal system is traditionally perceived as slow, intimidating, and cost-prohibitive. **Adhikar.ai** bridges the gap between everyday grievances and professional legal remedy. 

Whether you are an ordinary consumer facing an unfair trade practice, a tenant fighting an arbitrary eviction, an indie game developer wondering if store assets and anime music can be commercialized on Steam, or a freelance creator dealing with an unpaid client using your design commercially — Adhikar.ai analyzes your situation in plain natural language, maps it to established Indian statutes, and drafts court-ready legal notices and Cease & Desist letters in seconds.

---

## 🚀 Core Capabilities

### 1. 🤖 AI Dispute Analysis & Notice Drafting
- **Plain-Language Input:** Type or speak your complaint naturally — no legal terminology required.
- **Deep Statutory Mapping:** Analyzes complaints against 55+ Indian Acts and 420+ key sections powered by **Llama 3.3 (70B) via Groq Cloud LPU**.
- **Court-Ready Notices:** Automatically generates formatted, legally sound notices adhering to Indian civil practice conventions with a 15-day response deadline.
- **Evidence Vault Integration:** Attach supporting invoices, agreements, and screenshots that get incorporated into notice annexures.

### 2. 🎮 Digital Media, Gaming & IP Rights Advisor *(NEW)*
- **Interactive Case Matcher:** Dedicated advisory hub (`/digital-rights`) for digital creators, game studios, streamers, artists, and software developers.
- **Video Game & Asset Licensing:** Clarifies Unity/Unreal commercial asset store terms, EULAs, engine revenue share (Unreal 5% after $1M vs Godot MIT), and music synchronization rights.
- **YouTube & Streaming Copyright:** Evaluates statutory **Fair Dealing** under **Section 52 of the Copyright Act, 1957** (strictly narrower than US Fair Use) versus copyright strike risks.
- **Freelance IP Theft Protection:** Enforces **Section 17 (First Ownership)** and **Section 57 (Moral Rights)** against non-paying clients using branding or videos commercially without copyright transfer.
- **Open-Source Compliance:** Breaks down permissive (MIT, Apache 2.0) vs copyleft (GNU GPL v3, AGPL) implications for commercial SaaS and mobile apps.
- **Real-Money Gaming & Esports:** Evaluates game-of-skill versus game-of-chance rules under the **2023 IT Online Gaming Amendment Rules** and Self-Regulatory Body (SRB) requirements.
- **Instant Cease & Desist Generator:** Generates customizable, copyable legal demand notices and DMCA counter-representations.

### 3. 📜 Comprehensive Curated Legal Database
- **55+ Major Acts & 420+ Provisions:** Full-text search and category filtering covering Constitutional, Criminal (BNS 2023), Consumer Protection, Labour, Property, Cyber, and IP Law.
- **Rigorous Constitutional Law Accuracy:**
  - **Part III General Scope (Articles 12 & 13):** Accurately tagged as *General preliminary interpretive provisions* defining "the State" and establishing Judicial Review, distinct from substantive individual rights.
  - **Article 31 [Repealed]:** Explicitly marked as repealed by the **Constitution (Forty-fourth Amendment) Act, 1978** and re-enacted as a constitutional/legal right under **Article 300A** in Part XII.
  - **Saving of Certain Laws:** Accurately classifies Articles 31A, 31B (Ninth Schedule immunity), and 31C (Directive Principles).

### 4. 🔒 Privacy-First & Zero-Ops Architecture
- **Data Minimization:** No personal grievance text is persisted unnecessarily; client-side PDF compilation ensures data confidentiality.
- **Deterministic Offline Fallbacks:** Built-in keyword and domain matching engines guarantee instant responses even without an external AI connection.

---

## ⚡ Technical Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19 + Vite 7 | Next-gen lightning-fast reactive user interface |
| **Styling** | Tailwind CSS v4 | High-performance zero-runtime styling engine |
| **Typography** | Playfair Display, Source Serif 4, Plus Jakarta Sans, JetBrains Mono | Prestigious legal serif editorial typography with crisp modern UI and monospace code blocks |
| **Backend** | Node.js + Express.js | Stateless API orchestrator and rate-limiting gateway |
| **AI Inference** | Groq Cloud LPU + Meta Llama 3.3 (70B-Versatile) | Sub-second legal reasoning and structured JSON output |
| **Database** | Firebase Realtime Database | Real-time audit logs and synchronized legal database cache |
| **Document Engine** | jsPDF + HTML2Canvas | Client-side court-ready PDF compilation |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/analyze` | Evaluates a grievance story and maps it to Indian law violations, section citations, and confidence scores. |
| `POST` | `/api/draft` | Generates a full, formal legal notice draft incorporating user details, opposing party info, and evidence. |
| `POST` | `/api/ip-advisor` | Analyzes digital media, game development, copyright, open-source, or freelance licensing scenarios with risk ratings and notices. |
| `GET` | `/api/laws` | Returns the complete curated database of 55+ Indian Acts and key provisions. |
| `GET` | `/api/audit/:caseId` | Retrieves non-sensitive session metadata for legal audit trails. |

---

## 📥 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- Groq Cloud API Key (optional — offline rule engine runs automatically as fallback)

### Local Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kuberbassi/adhikar-ai.git
   cd adhikar-ai
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create .env with:
   # PORT=5000
   # GROQ_API_KEY=your_groq_api_key
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## 📂 Repository Layout

```
adhikar-ai/
├── client/
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   └── sitemap.xml             # Search engine index with /digital-rights
│   ├── src/
│   │   ├── components/             # Dashboard, FileUpload, Hero, PrivacyPreferences
│   │   ├── data/
│   │   │   └── legalDatabase.js    # 55+ curated Acts & 420+ provisions
│   │   ├── pages/
│   │   │   ├── DigitalRightsAdvisorPage.jsx  # IP & Gaming Advisor Hub
│   │   │   ├── LegalDatabasePage.jsx         # Searchable Acts Database
│   │   │   ├── SolutionsPage.jsx             # Product Offerings
│   │   │   ├── HowItWorksPage.jsx            # 3-Step Process
│   │   │   └── PrivacyPolicyPage.jsx
│   │   ├── App.jsx                 # Routing & Top Navigation
│   │   └── index.css               # Warm Law-Office Design System
│   └── index.html                  # SEO & Typography Imports
├── server/
│   ├── routes/
│   │   ├── analyze.js              # Case violation analyzer route
│   │   ├── draft.js                # Notice drafter route
│   │   └── ipAdvisor.js            # Digital rights & licensing advisor route
│   ├── services/
│   │   ├── ai.js                   # Groq Llama 3.3 integration & prompt pipelines
│   │   ├── firebase.js             # Realtime DB persistence adapter
│   │   └── seedData.js             # Legal database seed loader
│   └── server.js                   # Express server entry point
├── PROJECT_DOCUMENTATION.md        # Comprehensive technical & architecture spec
└── README.md                       # Project overview & quickstart
```

---

## ⚖️ Legal Disclaimer

*Adhikar.ai is an artificial intelligence-assisted legal research and notice drafting platform designed for informational and procedural empowerment. It does not constitute formal legal representation, nor does it create an advocate-client relationship. Users should have notices reviewed by a licensed advocate before initiating formal judicial proceedings.*

---

<div align="center">

Developed with pride for Indian Citizens & Creators  
**Adhikar.ai — Justice, Simplified.**

</div>
