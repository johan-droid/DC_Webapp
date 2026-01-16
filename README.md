# 🔍 Detective Conan Web (Next.js Edition)

Welcome to the **"Enterprise-Grade"** fan site for Detective Conan! 🕵️‍♂️✨
Now rewritten in **Next.js 15**, **TypeScript**, and **Supabase**.

## 🚀 The New Tech Stack

We moved from old HTML/JS to a modern 2026 stack. Here is what's under the hood:

*   **⚡ Framework**: [Next.js 15](https://nextjs.org/) (App Router) - Fast, SEO-ready, and powerful.
*   **📘 Language**: [TypeScript](https://www.typescriptlang.org/) - Strict type safety (no more random crashes!).
*   **🎨 Styling**: CSS Modules + Global Premium Styles (Ported from legacy design).
*   **🗄️ Database**: [Supabase](https://supabase.com/) (PostgreSQL) - Real-time data for News & Cases.
*   **🎭 Animations**: [Framer Motion](https://www.framer.com/motion/) - Smooth, cinematic entrances.
*   **🛡️ Security**: Secured API Routes with Admin Keys & Rate Limiting.

---

## 📂 Project Structure

It's clean and easy to understand:

```plaintext
src/
 ├── app/                  # Main Pages (Home, News, Cases)
 │   ├── api/              # Backend API (Serverless Functions)
 │   ├── characters/       # Character Profiles Page
 │   ├── investigations/   # Case Files Page
 │   └── globals.css       # The "Premium" Dark Theme
 ├── components/           # Reusable UI (Navbar, Footer, etc.)
 ├── lib/                  # Helpers (Supabase Client, Auth)
 └── data/                 # Static Data (Character lists)
```

---

## 🛠️ How to Run locally

**1. Clone the repo:**
```bash
git clone https://github.com/johan-droid/DC_Webapp.git
cd DC_Webapp
```

**2. Install dependencies:**
```bash
npm install
```

**3. Set up secrets:**
Create a `.env.local` file with your keys:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (for Admin API)
ADMIN_SECRET=your-super-secret-password
```

**4. Lift off! 🚀**
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** and enjoy.

---

## ✨ Features

*   **🕵️ One Truth Prevails**: A stunning hero section with cinematic reveal.
*   **📱 Mobile Ready**: Smooth hamburger menu and responsive grid.
*   **📡 Live Data**: News and Case files fetched directly from Supabase.
*   **🔐 Admin Terminal**: A hidden `/admin` dashboard to post updates (protected!).

> *"When you have eliminated the impossible, whatever remains, however improbable, must be the truth."* - Sherlock Holmes

---
*Maintained by the Detective Boys 🔎*
