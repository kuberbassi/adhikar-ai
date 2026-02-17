<div align="center">

# ⚖️ Adhikar.ai
**Justice, Simplified.**

AI-powered legal empowerment for 1.4 Billion Indians.  
Describe your crisis → Identify the Law → Generate a Notice.

[Live Demo](https://adhikar-ai.vercel.app) · [Report Bug](https://github.com/kuberbassi/adhikar-ai/issues)

---

</div>

## 📖 Introduction

Most Indians navigate a legal system that is often perceived as complex, expensive, and intimidating. **Adhikar.ai** is designed to democratize access to justice by bridging the gap between a citizen's grievance and formal legal drafting. 

Built with the latest in Large Language Model technology, Adhikar.ai analyzes natural language complaints, identifies potential violations under the **Consumer Protection Act (2019)** or the **Indian Penal Code (IPC)**, and generates professional, court-ready legal notices in seconds.

## 🚀 Key Features

- 🤖 **Deep Legal Analysis** — Powered by **Llama 3.3 (70B) via Groq Cloud**, providing high-confidence mapping to Indian Acts and Sections.
- ⚡ **Real-Time Inference** — Sub-second response times using Groq's LPU acceleration, ensuring a seamless user experience.
- ⚖️ **Automated Citations** — Dynamically identifies relevant legal grounds and win probabilities based on provided facts.
- 📄 **Pro-Grade PDF Generation** — Exports standardized, professionally formatted legal notices ready for printing or digital delivery.
- 📁 **Evidence Integration** — Attach and analyze evidence directly within the drafting workflow for a stronger legal argument.
- 🎨 **Modern Interface** — A high-performance, glassmorphic UI built with **Tailwind CSS v4** and **Framer Motion**.

## ⚡ Technical Architecture

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 (Vite) + Tailwind CSS v4 |
| **Backend** | Node.js + Express.js |
| **AI Engine** | Meta Llama 3.3 (70B) |
| **Inference** | Groq Cloud (LPU Technology) |
| **Database** | Firebase Realtime Database |

## 📥 Getting Started

### Prerequisites
- Node.js (v18+)
- Groq Cloud API Key

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kuberbassi/adhikar-ai.git
   cd adhikar-ai
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create a .env file and add your GROQ_API_KEY
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

*The application will be available at `http://localhost:5173`.*

## 📂 Repository Structure

- `client/`: Professional React frontend with localized state management and Tailwind v4 themes.
- `server/`: Express service handling AI prompt engineering and legal logic.
- `PITCH_PREP.md`: Presentation strategy and demonstration guide.

---

<div align="center">

Developed by **Team Binary Bandits**  
*Ayush Tiwari · Kuber Bassi · Kunal Sharma · Kartik Kukreti*

</div>
