# TikTok Next: Reimagined Social Interaction 🚀

A high-fidelity, interactive, and responsive TikTok prototype built with modern web technologies. This project focuses on the "Social Interaction Layer," transforming passive content consumption into an active, data-driven creator-audience conversation.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-06B6D4.svg?logo=tailwindcss)

## ✨ Core Features

### 📡 Real-Time Social Layer
- **HLS Live Streaming**: Integrated `hls.js` for professional-grade broadcasting simulations using real `.m3u8` streams.
- **Creator Reply Suite**: A specialized interface for creators to respond via voice notes, video duets, or smart templates.
- **Pinned Highlights**: Dynamic floating cards that highlight top fan comments and allow for instant creator replies.
- **Live Interactions Sidebar**: A dedicated desktop engagement panel with real-time comment feeds, pinning, and reply logic.

### 📊 Data-Driven Engagement
- **Sentiment Timeline**: D3.js-powered responsive engagement graph that visualizes audience mood over the video duration.
- **Analytics Dashboard**: Comprehensive creator tools showing viewer retention, sentiment shifts, and engagement metrics.

### 🎮 High-Fidelity UX
- **Interactive Video Feed**: Custom autoplay engine with bypass logic for browser restrictions and spring-loaded interaction physics.
- **Q&A Mode**: Animated overlay system for creator-audience question sessions.
- **Social Sharing**: High-fidelity sharing grid with clipboard feedback and platform-specific simulations (Instagram, X, Facebook).
- **Favorites & More**: TikTok-style secondary action menu with "Save to Favorites," "Not Interested," and reporting tools.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) (using the modern `@theme` engine)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Visualizations**: [D3.js](https://d3js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Streaming**: [Hls.js](https://github.com/video-dev/hls.js/)

## 📂 Project Structure

```text
src/
├── components/          # Interactive UI Modules
│   ├── LiveStream.tsx   # HLS Streaming & Live Chat
│   ├── VideoCard.tsx    # Core Feed Item & Interactions
│   ├── CreatorTools.tsx # Reply Suite & Templates
│   ├── SentimentTimeline.tsx # D3 Engagement Chart
│   └── ...              # Modals, Sections, and Overlays
├── utils/               # Tailwind merge & helper functions
├── App.tsx              # Global Navigation & State Orchestration
└── main.tsx             # Entry Point
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd scrsr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Responsiveness
The project is engineered with a mobile-first approach using `100svh` and responsive grid layouts, ensuring a perfect "app-like" experience on:
- **Mobile**: Full-screen vertical feed and swipe-friendly modals.
- **Tablet**: Optimized interaction layouts.
- **Desktop**: Multi-panel view with persistent navigation and engagement sidebars.

## 📄 License
This project is for demonstration purposes, showcasing advanced React patterns and interactive UI/UX design.
