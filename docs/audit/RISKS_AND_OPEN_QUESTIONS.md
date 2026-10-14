# Risks and Open Questions

## 1. Technical Risks & Mitigations

| Risk | Impact | Mitigation Strategy |
|---|---|---|
| **Heavy 3D rendering on low-end mobile devices** | Frame drops / battery drain | Use CSS 3D transforms + lightweight canvas shaders with automatic low-power / reduced-motion fallback. |
| **Email service rate limits / delivery failure** | User messages lost | Strict validation, rate limiting, and prominent fallback direct contact links (Email & LinkedIn). |
| **CORS / Rate limits on public GitHub repos API** | Empty project grid on high traffic | Graceful fallback cache with curated verified projects so the gallery never appears broken or blank. |
| **Accidental leak of private automation keys** | Security compromise | All private keys strictly kept in `.env` (ignored by git). AI Hub only exposes public information. |

## 2. Open Questions Resolved
- **Profile Photo:** Resolved — `image.png` is authentic, high-res, and validated.
- **Resume:** Resolved — `Harshit_Mishra.pdf` is current and verified.
- **AI Hub Placement:** Resolved — Extracted to separate `ai-hub.html` page to preserve professional core portfolio focus.
- **Build Kit Security:** Resolved — Added to `.gitignore` and untracked from Git.
