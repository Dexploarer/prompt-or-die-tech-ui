# @prompt-or-die/tech-ui

> **Professional UI Template Suite** for modern, agentic, and game-inspired interfaces. Strictly typed, production-ready, and designed for the Agentic Age.

![Version](https://img.shields.io/badge/version-0.0.1-orange?style=for-the-badge) ![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge) ![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge)

## 🚀 Overview

`@prompt-or-die/tech-ui` is a comprehensive UI library that bridges the gap between **functional utility** and **cyberpunk aesthetics**. It provides a "plug-and-play" experience for building:

- **Agentic Workflows**: Interfaces for AI Agents, streaming tokens, and thought processes.
- **Game UIs**: HUDs, Radars, and immersive dashboards.
- **Modern Web Apps**: Glassmorphism, high-density data grids, and strict design systems.

Key Features:

- **Strict Typing**: Zero `any` types. Full TypeScript support.
- **Theming**: Unified design system based on standard primitives.
- **Modular**: Use standard components or deep-dive into complex specialized templates.

---

## 📦 Installation

Install the package via your preferred package manager:

```bash
npm install @prompt-or-die/tech-ui clsx tailwind-merge framer-motion lucide-react
# or
bun add @prompt-or-die/tech-ui clsx tailwind-merge framer-motion lucide-react
```

### Peer Dependencies

Ensure you have **React 18+** and **Tailwind CSS 3.4+** installed in your project.

---

## 🛠️ Setup

1.  **Tailwind Configuration**:
    Add the library's content path to your `tailwind.config.ts`:

    ```ts
    export default {
      content: [
        "./node_modules/@prompt-or-die/tech-ui/dist/**/*.{js,ts,jsx,tsx}",
        // ... your other paths
      ],
      // ...
    };
    ```

2.  **Global Styles**:
    Import the base styles in your root layout or `globals.css`:
    _(Note: If copying components manually, ensure you have the `globals.css` theme variables set)_

---

## 🧩 Templates & Layouts

We provide full-page layouts ready for immediate use. Just wire up your data.

### 🤖 AI & Agentic

- **`TechChatLayout`**: A complete ChatGPT-like interface with sidebar history, streaming responses, and input handling.
- **`TechAgentWorkbench`**: A multi-pane IDE for AI agents. Visualizes thought chains (`TechThoughtChain`), file contexts (`TechTree`), and execution logs.

### 🎮 Game & Immersive

- **`TechGameHUD`**: Floating heads-up display with biometric scanners (`TechBiometrics`), radar (`TechRadar`), and weapon slots.
- **`TechGenGameLayout`**: A text-adventure engine layout with scene visualization (`TechHoloProjector`) and narrative streams.

### 🏢 Application

- **`TechAdminLayout`**: Professional sidebar-driven shell with command palette integration.
- **`TechDashboardLayout`**: Widget-based grid system for dense metrics.
- **`TechSettingsLayout`**: Tabbed configuration screens.
- **`TechLandingLayout`**: High-conversion landing page components.

---

## 🧱 Component Library

### Primitives (The Atoms)

- **Controls**: `TechButton`, `TechInput`, `TechSwitch`, `TechCheckbox`, `TechRadio`, `TechSelect`
- **Containers**: `TechCard`, `TechFrame`, `TechPanel`, `TechModal`, `TechGlassPanel`
- **Status**: `TechBadge`, `TechToast`, `TechTooltip`, `StatBar`

### Data Visualization

- **Charts**: `TechChart` (Line/Area), `TechDonut` (Radial Progress)
- **Complex**: `TechRadar` (Spatial), `TechTree` (Hierarchy), `TechNeuralMesh` (Graph), `TechPhaseBar` (Timeline)
- **Metrics**: `TechMetric` (KPIs), `TechGrid` (Data Tables), `KVDisplay` (Debug)

### Specialized

- **Agentic**: `TechTokenStream` (LLM Output), `TechThoughtChain` (Reasoning), `TechCommandPalette` (Omnibar)
- **Visuals**: `TechGlitchText`, `TechCircuit`, `TechGeometry`, `TechLiquidPanel`

---

## 💻 Usage Example

```tsx
import { TechCard, TechMetric, TechButton } from "@prompt-or-die/tech-ui";

export default function SystemMonitor() {
  return (
    <TechCard className="w-96 p-6 border-primary/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-mono text-lg text-primary">CORE_SYSTEMS</h2>
        <div className="animate-pulse w-2 h-2 bg-green-500 rounded-full" />
      </div>

      <div className="space-y-4">
        <TechMetric label="CPU_LOAD" value="84%" status="warning" />
        <TechMetric label="MEMORY" value="12.4GB" status="success" />
        <TechMetric label="NETWORK" value="450Mbps" status="info" />
      </div>

      <TechButton className="w-full mt-6" variant="primary">
        INITIATE_DIAGNOSTIC
      </TechButton>
    </TechCard>
  );
}
```

---

## 👨‍💻 Author

**dexploarer**

- GitHub: [@dexploarer](https://github.com/dexploarer)
- Email: dexploarer@gmail.com
- Organization: [Prompt-or-Die](https://github.com/prompt-or-die)

## 📄 License

MIT © [Prompt-or-Die](https://github.com/prompt-or-die)
