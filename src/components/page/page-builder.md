# Page Builder

A modular, type-safe page builder system for Qwik applications with Payload CMS integration.

## Architecture

```
AppPage
└── AppSection (layout + theming + background)
    ├── AppColumn (grid cell + block rendering)
    │   └── ContentBlocks (20 block types)
    └── AppBackground (media backdrop)
```

## Core Components

### AppPage
Orchestrates sections into semantic HTML structure (`<header>`, `<main>`, `<footer>`).

```tsx
<AppPage sections={[
  { tag: "header", ... },
  { tag: "section", ... },
  { tag: "footer", ... },
]} />
```

### AppSection
Handles layout grid, theming, backgrounds, and gutters.

| Prop | Type | Description |
|------|------|-------------|
| `tag` | `header \| section \| footer` | Semantic HTML element |
| `backgroundTheme` | `ThemeColor` | Section background color |
| `foregroundTheme` | `ForegroundThemeColor` | Text/content color |
| `columnLayout` | `ResponsiveColumns` | Grid columns per breakpoint |
| `gutter` | `GutterSize[]` | Padding directions/sizes |
| `background` | `Media` | Background image/video |
| `columns` | `ColumnDefinition[]` | Column configs with blocks |

### AppColumn
Renders blocks from the registry based on `blockType` discriminator.

### AppBackground
Renders image or video backgrounds with proper attributes (autoplay, muted, loop for video).

## Content Blocks (20 types)

| Block | Description |
|-------|-------------|
| `accordion` | Expandable content panels |
| `avatar` | User profile images |
| `badge` | Status/label indicators |
| `breadcrumb` | Navigation trail |
| `buttonRow` | Horizontal button layout |
| `buttonGroup` | Connected button set |
| `buttonGrid` | Grid of buttons |
| `card` | Content card with media |
| `carousel` | Image/content slider |
| `eyebrow` | Small label text |
| `heading` | H1-H6 with sizing |
| `icon` | Themed icon display |
| `link` | Styled anchor |
| `logoTicker` | Scrolling logo banner |
| `media` | Image/video with captions |
| `review` | Star rating display |
| `richText` | Lexical JSON renderer |
| `tabs` | Tabbed content panels |
| `tile` | Styled content container |
| `timeline` | Vertical timeline |

## Type System

### Discriminated Union Pattern
Each block uses `blockType` as discriminator for type-safe routing:

```tsx
type ContentBlock =
  | { blockType: "heading"; content: string; tag?: HeadingTag; ... }
  | { blockType: "card"; media?: MediaData; richText?: PayloadRichText; ... }
  | ...
```

### Block Data vs Props
- **Data**: CMS-serializable fields (what Payload stores)
- **Props**: Data + runtime fields (`columnNumber`, `blockNumber`)

```tsx
// CMS data shape
interface AppBlockHeadingData extends AnimationProps {
  blockId?: string;
  tag?: HeadingTag;
  content: string;
}

// Runtime props
interface AppBlockHeadingProps extends AppBlockHeadingData {
  columnNumber: number;
  blockNumber: number;
}
```

## Animation System

All blocks extend `AnimationProps` for AOS (Animate On Scroll) support:

```tsx
interface AnimationProps {
  animation?: AnimationType;      // fade-up, zoom-in, etc.
  animationPlacement?: string;    // top-center, etc.
  animationEasing?: string;       // ease, ease-in-out, etc.
}
```

Use `getAosProps()` utility to generate data attributes:

```tsx
const aosProps = getAosProps({ animation, columnNumber, blockNumber });
// Returns: { "data-aos": "fade-up", "data-aos-delay": "150", ... }
```

## Theming

Centralized in `types/theme-types.ts`:

| Map | Purpose |
|-----|---------|
| `sectionBackgroundThemeClassMap` | Section backgrounds |
| `blockBackgroundThemeClassMap` | Block backgrounds |
| `foregroundThemeClassMap` | Text colors |

## Adding a New Block

1. Create component in `app-blocks/app-block-{name}/`
2. Define `Data` interface extending `AnimationProps`
3. Define `Props` interface extending `Data`
4. Use `getAosProps()` for animations
5. Add `id={blockId}` to root element
6. Register in `app-column.tsx` blockRegistry
7. Add to `ContentBlock` union in `block-types.ts`

## Anchor Links

All blocks support `blockId?: string` for anchor linking:

```tsx
// In section config
{ blockType: "heading", blockId: "features", content: "Features" }

// Links to: example.com/page#features
```

## Security

Rich text uses `sanitizeHtml()` utility for XSS protection when rendering HTML content.

