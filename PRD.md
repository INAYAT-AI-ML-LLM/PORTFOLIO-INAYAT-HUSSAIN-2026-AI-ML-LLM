# Product Requirements Document (PRD)
## Inayat 2026 Portfolio

### 1. Project Overview
The "Inayat 2026 Portfolio" is a state-of-the-art, hyper-immersive digital portfolio designed to showcase the skills, experience, projects, and certifications of **Inayat**, a forward-thinking software developer. Built with next-generation web technologies, the platform rejects flat, traditional layouts in favor of an immersive "2026 Neo-Webism" aesthetic featuring interactive 3D spatial grids, cinematic scrolling, and advanced glassmorphism.

### 2. Creator Information
*   **Name:** Inayat (Inayatullah)
*   **Role:** Software Engineer / Full Stack Developer
*   **Portfolio Purpose:** To serve as a premium, high-impact digital resume and project showcase to impress top-tier employers, clients, and industry peers.

### 3. Core Tech Stack
*   **Framework:** Next.js (App Router)
*   **Library:** React 19
*   **Styling:** Tailwind CSS v4, Custom CSS Variables
*   **Animations:** Framer Motion, GSAP (ScrollTrigger)
*   **3D Rendering:** React Three Fiber (R3F), Three.js, React Three Drei
*   **Icons:** Lucide-React, Devicon
*   **Scrolling:** Lenis (Smooth scroll architecture)

### 4. Design Language & Aesthetics (2026 Neo-Webism)
*   **Theme:** Deep Dark Mode (`#030303` base) with brilliant, highly-saturated neon accents.
*   **Primary Accent:** Cyan (`#00e5ff`)
*   **Secondary Accent:** Deep Purple/Neon Violet (`#b026ff`)
*   **UI Paradigm:** Glassmorphism (blur filters with low-opacity borders), dynamic glows, and immersive hover states.
*   **3D Spatial Architecture:** Zero-overlap design system. Components exist in a Z-axis space, using extreme perspective (`perspective: 1200px`) and deep grid gaps to create hovering, floating panels rather than linear scrolling pages.
*   **Typography:** Space Grotesk (Display headings), Inter (Body copy), JetBrains Mono (Technical badges and metrics). 

### 5. Application Architecture & Pages
The application is structured as a powerful Single Page Application (SPA), dynamically loading heavy modules for maximum performance.

#### 5.1 Global Interactive Elements
*   **Immersive 3D Background:** A persistent WebGL canvas layer built with R3F covering the entire viewport. It features thousands of parallax star particles and floating geometric wireframe meshes that react and rotate based on scroll depth.
*   **Custom Intelligent Cursor:** A custom circular ring cursor that scales and changes states when hovering over interactive elements.
*   **Preloader:** A cinematic entry sequence masking the heavy initialization of 3D assets.

#### 5.2 Navigation (`Navbar.tsx`)
*   Floating, frosted-glass header.
*   Smooth internal anchor routing to page sections.
*   Magnetic hover effects on navigation items.

#### 5.3 Hero Section (`Hero.tsx`)
*   High-impact first impression.
*   Animated "Text Scramble" introduction text.
*   Interactive particle system or deep gradient layers.
*   Direct call-to-action (CTA) to view work or download resume.

#### 5.4 About Section (`About.tsx`)
*   Personal narrative and background story.
*   Glass cards highlighting core philosophies or brief metrics.

#### 5.5 Skills Section (`Skills.tsx`)
*   Visual grid of technologies mastered by the creator.
*   Utilizes Devicon for exact branding of tech logos (Python, React, Node.js, etc.).

#### 5.6 Experience & Education (`Experience.tsx`)
*   **Architecture:** Complex 3D Spatial Grid.
*   Discards standard vertical timelines in favor of staggered, floating glass panels.
*   Displays Role, Company/Institution, timeframe, and a grid of specific technologies applied during the tenure.

#### 5.7 Projects Section (`Projects.tsx`)
*   Deep-dive showcases of significant work (e.g., Budget Tracker, SerenitySphere).
*   Rich imagery thumbnails with overlay data.
*   Links to source code (GitHub) and live deployments.

#### 5.8 Certifications Section (`Certifications.tsx`)
*   **Architecture:** Asymmetric Spatial Grid Feed.
*   Highly detailed credentials matching LinkedIn data schemas.
*   Fields: Title, Issuer (Organization), Issue Date, Credential ID, deep descriptions, and a mapped array of Core Competencies/Skills.
*   Verification outbound links.

#### 5.9 Contact Section (`Contact.tsx`)
*   Secure form architecture.
*   Links to external social profiles (GitHub, LinkedIn).
*   Matching glowing border states on input focus.

### 6. Performance & UX Requirements
*   **Zero-Overlap Guarantee:** Strict margin and spatial transforms ensure elements never clip or crash into each other during complex scroll calculations.
*   **Lazy Loading:** Below-the-fold components and heavy WebGL components (`next/dynamic`) are lazy-loaded to ensure immediate Above-The-Fold (ATF) paint times.
*   **Accessibility:** ARIA labels on all custom interactive elements, maintaining "skip to content" keyboard navigation despite heavy visual flair.

### 7. Future Roadmap / Scope
*   Integration of a headless CMS (Sanity/Contentful) to allow Inayat to update project details without pushing raw code.
*   Advanced WebGL shader transitions between major portfolio sections.
*   Upload and implementation of specific compressed WebP images for project thumbnails.
