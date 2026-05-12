# 💎 Premium Developer Portfolio

A high-performance, gallery-inspired portfolio aesthetic tailored for creative professionals. Built with **Next.js 14**, **Supabase**, and **Tailwind CSS**, this project fuses the airy transparency of **Glassmorphism** with a strictly disciplined **Minimalist** structure.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-DB%20%26%20Auth-green?style=for-the-badge&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

---

## ✨ Features

-   **🎨 Premium Glassmorphic UI**: Utilizing backdrop blurs, subtle specular highlights, and tonal stacking to create a boutique studio feel.
-   **🛠️ Dynamic CMS (Admin Panel)**: Fully functional admin dashboard to manage:
    -   **Projects**: Add, edit, and categorize your work.
    -   **Certificates**: Showcase your credentials with image support.
    -   **Expertise & Skills**: Dynamically update your technical stack.
    -   **Experience & Education**: Professional timeline management.
-   **📩 Integrated Contact System**: A seamless contact form with a dedicated "Incoming Messages" module in the admin panel.
-   **🔐 Secure Authentication**: Protected admin routes using Supabase Auth and Middleware.
-   **📱 Fully Responsive**: A 12-column grid system that elegantly collapses into a single-column stack for mobile.
-   **🚀 Optimized Performance**: Built with Next.js App Router for superior speed and SEO.

---

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
-   **Database & Auth**: [Supabase](https://supabase.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Icons**: [Heroicons](https://heroicons.com/)
-   **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 🎨 Design System

| Element | Specification |
| :--- | :--- |
| **Typography** | **Space Grotesk** (Headings), **Inter** (Body) |
| **Primary Color** | Gallery White (#F8F9FA) |
| **Accent Color** | Champagne Gold (#C5A059) |
| **Surface** | Glassmorphism (Blur 20px, 1px specular borders) |
| **Grid** | 12-Column Fixed Grid (1440px max-width) |

---

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   Supabase Account

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yusaduymaz/new-portfolio.git
    cd new-portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Database Setup**:
    Apply the migrations located in the `/supabase/migrations` folder to your Supabase project to set up the schema.

---

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router (Pages & API)
├── components/     # Reusable UI components
├── lib/            # Shared utilities and Supabase client
├── types/          # TypeScript definitions
└── supabase/       # Migrations and schema definitions
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🇹🇷 Türkçe Özet

Bu proje, yaratıcı profesyoneller için tasarlanmış, **Next.js 14** ve **Supabase** tabanlı, premium bir portfolyo uygulamasıdır. **Glassmorphism** (cam efekti) ve minimalizm prensipleriyle oluşturulmuş estetik bir arayüze sahiptir.

**Öne Çıkan Özellikler:**
-   Yönetici paneli üzerinden dinamik içerik yönetimi (Projeler, Sertifikalar, Deneyimler).
-   Supabase Auth ile güvenli giriş.
-   Gelişmiş iletişim formu ve mesaj yönetim sistemi.
-   Mobil uyumlu, yüksek performanslı yapı.

---
Developed with ❤️ by [Yusa Duymaz](https://github.com/yusaduymaz)
