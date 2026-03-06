# Design System: ChemSim Pro

Deep, modern, and high-tech lab aesthetic.

## 1. Color Palette
- **Background:** Midnight Blue (#0f172a) to Deep Purple (#1e1b4b) gradients.
- **Glass:** White/10 opacity with backdrop-blur-md.
- **Accents:** Neon Blue (#3b82f6) for primary elements, Emerald (#10b981) for success.
- **Text:** Slate-50 (Primary), Slate-400 (Secondary).

## 2. Typography
- **Primary:** Inter (Modern proportional).
- **Secondary:** Space Grotesk (Tech-heavy headers).
- **Monospace:** JetBrains Mono (For chemical equations).

## 3. Visual Language
- **Roundness:** 16px (Medium-high).
- **Glassmorphism:** Clear frosted glass effect with 1px border (#ffffff1a).
- **Animations:** Smooth spring-based transitions using Framer Motion.

## 6. Design System Notes for Stitch Generation
- Utilize `glass` utility for all containers.
- Use `backdrop-blur-lg` and `border-white/10`.
- Headers should use `Space Grotesk` and `tracking-tight`.
- Floating action buttons should have a `glow` effect on hover.
- Background should be a deep radial gradient.
