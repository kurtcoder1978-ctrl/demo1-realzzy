# realzzy Design System (MASTER)

Dating site where profiles are short videos. Tone: sexy but grown and professional. Sophisticated, sensual, confident, discreet. A luxury hotel bar at night, not a nightclub.

Source: type pairing from ui-ux-pro-max ("Classic Elegant": Playfair Display + Inter). The skill's generated palette/style (light rose "Vibrant & Block") contradicted the brief and was NOT adopted. Palette, spacing, radii and motion are hand-tuned. Page-specific overrides go in `pages/<page>.md` and win over this file.

Stack: Nuxt 4 + Tailwind CSS v4 + shadcn-vue (Reka UI). Tokens live in `app/assets/css/main.css`.

## Mode
Dark only (`color-scheme: dark`).

## Color tokens
| Token | Value | Use |
|---|---|---|
| `--background` | `#140A12` | page |
| `--card` | `#1D111A` | cards, header |
| `--popover` / `--secondary` / `--muted` | `#281826` | menus, inputs, hover |
| `--accent` | `#33202F` | menu item hover |
| `--oxblood` | `#5A1426` | ambient glow, deep accents |
| `--plum` | `#2E1230` | ambient glow |
| `--border` / `--input` | `#3A2433` | hairlines |
| `--foreground` | `#F4ECE4` | text (warm ivory) |
| `--muted-foreground` | `#B9A9B0` | secondary text |
| `--primary` | `#D9B98A` | champagne gold: the single warm accent (buttons, links, focus ring) |
| `--primary-hover` | `#E8CDA3` | hover |
| `--primary-foreground` | `#1A0E14` | text on gold |
| `--destructive` | `#F0788A` | errors |
| `--success` | `#8FCB9B` | confirmations, met rules |

Rules: use tokens, never raw hex in components. Gold is the only warm accent. Body text contrast >= 4.5:1.
Strength meter: rose `#F0788A`, copper `#D98A5F`, gold, sage.

## Typography
- Headlines, wordmark: Playfair Display 400/500/600 (+ italic), tight tracking.
- Body/UI: Inter 300-600.
- Scale: 14 / 16 / 18 / 24 / 32 / 48. Body 16px, line-height 1.5.
- Small labels: uppercase, +0.08em tracking.

## Spacing
4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96. Card padding 40px (24px mobile). Header 72px. 16px page gutters. Controls 44px tall (touch target).

## Radii
Inputs/buttons 10px, cards 16px, menus 12px, avatar full.

## Elevation and texture
Hairline borders; gold at ~20% on card edges; soft warm shadow `0 20px 60px -20px rgba(0,0,0,.6)`; faint oxblood/plum radial glow behind the page. No neon, no heavy gradients.

## Motion (subtle)
- 150-300ms, `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-lux`).
- Card/page enter: fade + 8px rise (`.rise-in`). Menu: fade + slight scale. Links: gold underline slides in (`.link-lux`).
- Animate transform/opacity/color only. Exit faster than enter.
- `prefers-reduced-motion`: all animation/transition effectively disabled.

## Components
- Header (every page): `realzzy.` wordmark left; right: signed in = gold-ringed avatar dropdown (email + Log out); signed out = Log in (ghost) + Sign up (gold).
- Forms: visible labels, error text under the form in `text-destructive`, eye toggle on every password field, strength meter + rule checklist on new-password fields.
- Icons: Lucide SVG only, no emoji.

## Anti-patterns
Neon/club aesthetics, pure black backgrounds, more than one accent colour, light mode, generic stock-profile visuals, hover-only affordances, placeholder-only labels.

## Checklist
- [ ] Focus rings visible (gold), keyboard operable header menu
- [ ] Reduced motion respected
- [ ] Verified at 375 / 768 / 1024 / 1440
- [ ] No horizontal scroll
