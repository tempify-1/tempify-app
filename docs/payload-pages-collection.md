# Payload CMS Pages Collection - Compatible with AppPage System

## Overview

This document provides a Payload CMS collection config for the **Page > Sections > Columns > Blocks** architecture, including reusable field groups for page card previews.

---

## Reusable Field Groups

Define these first - they can be imported and reused across collections.

```typescript
// fields/cardFields.ts
import type { Field } from 'payload'

/**
 * Reusable card/preview fields for pages, posts, etc.
 * These fields can be queried separately without fetching full page content.
 * Use with Payload's `select` API to fetch only card data.
 */
export const cardFields: Field[] = [
  {
    name: 'card',
    type: 'group',
    label: 'Card Preview',
    admin: {
      description: 'Used when this page appears in lists, carousels, or link previews',
    },
    fields: [
      { name: 'title', type: 'text', required: true, admin: { description: 'Card title (also used for SEO)' } },
      { name: 'description', type: 'textarea', admin: { description: 'Short description for cards and meta' } },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        admin: { description: 'Card thumbnail / OG image' },
      },
      { name: 'href', type: 'text', admin: { description: 'Override link (defaults to page slug)' } },
      {
        name: 'badge',
        type: 'group',
        fields: [
          { name: 'text', type: 'text' },
          {
            name: 'type',
            type: 'select',
            options: ['blue', 'dark', 'green', 'red', 'yellow', 'indigo', 'purple', 'pink', 'default'],
          },
        ],
      },
    ],
  },
]

/**
 * SEO/Meta fields - extends card fields with additional meta
 */
export const metaFields: Field[] = [
  {
    name: 'meta',
    type: 'group',
    label: 'SEO & Meta',
    admin: { position: 'sidebar' },
    fields: [
      { name: 'title', type: 'text', admin: { description: 'Override page title for SEO' } },
      { name: 'description', type: 'textarea', maxLength: 160 },
      { name: 'keywords', type: 'text' },
      { name: 'ogImage', type: 'upload', relationTo: 'media' },
      { name: 'noIndex', type: 'checkbox', defaultValue: false },
    ],
  },
]
```

---

## Responsive Breakpoint Fields

```typescript
// fields/responsiveFields.ts
import type { Field } from 'payload'

export const responsiveNumberFields = (name: string, label: string): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    { name: 'xs', type: 'number', min: 1, max: 12, defaultValue: 1 },
    { name: 'sm', type: 'number', min: 1, max: 12, defaultValue: 1 },
    { name: 'md', type: 'number', min: 1, max: 12, defaultValue: 2 },
    { name: 'lg', type: 'number', min: 1, max: 12, defaultValue: 2 },
    { name: 'xl', type: 'number', min: 1, max: 12, defaultValue: 2 },
    { name: '2xl', type: 'number', min: 1, max: 12, defaultValue: 2 },
  ],
})

export const colSpanFields: Field = {
  name: 'colSpan',
  type: 'group',
  label: 'Column Span (per breakpoint)',
  admin: { condition: (_, siblingData) => siblingData?.enableColSpan },
  fields: [
    { name: 'xs', type: 'number', min: 1, max: 12 },
    { name: 'sm', type: 'number', min: 1, max: 12 },
    { name: 'md', type: 'number', min: 1, max: 12 },
    { name: 'lg', type: 'number', min: 1, max: 12 },
    { name: 'xl', type: 'number', min: 1, max: 12 },
    { name: '2xl', type: 'number', min: 1, max: 12 },
  ],
}
```

---

## Theme & Gutter Fields

```typescript
// fields/themeFields.ts
import type { Field } from 'payload'

export const themeColorOptions = [
  { label: 'Blue', value: 'blue' },
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Purple', value: 'purple' },
  { label: 'Pink', value: 'pink' },
  { label: 'Indigo', value: 'indigo' },
  { label: 'Gray', value: 'gray' },
  { label: 'Transparent', value: 'transparent' },
]

export const foregroundColorOptions = [
  ...themeColorOptions,
  { label: 'White', value: 'white' },
]

export const gutterSizeOptions = ['none', 'xs', 'sm', 'md', 'lg', 'xl']

export const gutterDirectionOptions = [
  'horizontal', 'vertical', 'left', 'right', 'top', 'bottom'
].flatMap(dir => gutterSizeOptions.map(size => ({
  label: `${dir}-${size}`,
  value: `${dir}-${size}`,
})))

export const backgroundThemeField: Field = {
  name: 'backgroundTheme',
  type: 'select',
  options: themeColorOptions,
  defaultValue: 'transparent',
}

export const foregroundThemeField: Field = {
  name: 'foregroundTheme',
  type: 'select',
  options: foregroundColorOptions,
  defaultValue: 'gray',
}

export const gutterField: Field = {
  name: 'gutter',
  type: 'select',
  hasMany: true,
  options: gutterDirectionOptions,
  defaultValue: ['horizontal-md', 'vertical-md'],
}
```

---

## Animation Fields

```typescript
// fields/animationFields.ts
import type { Field } from 'payload'

export const animationFields: Field[] = [
  {
    name: 'animation',
    type: 'select',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Fade', value: 'fade' },
      { label: 'Fade Up', value: 'fade-up' },
      { label: 'Fade Down', value: 'fade-down' },
      { label: 'Fade Left', value: 'fade-left' },
      { label: 'Fade Right', value: 'fade-right' },
      { label: 'Zoom In', value: 'zoom-in' },
      { label: 'Zoom Out', value: 'zoom-out' },
      { label: 'Flip Up', value: 'flip-up' },
      { label: 'Flip Down', value: 'flip-down' },
    ],
    defaultValue: 'fade-up',
  },
  {
    name: 'animationPlacement',
    type: 'select',
    options: [
      { label: 'Top Bottom', value: 'top-bottom' },
      { label: 'Center Bottom', value: 'center-bottom' },
      { label: 'Bottom Bottom', value: 'bottom-bottom' },
    ],
    admin: { condition: (_, { animation }) => animation && animation !== 'none' },
  },
  {
    name: 'animationEasing',
    type: 'select',
    options: [
      { label: 'Ease', value: 'ease' },
      { label: 'Ease In', value: 'ease-in' },
      { label: 'Ease Out', value: 'ease-out' },
      { label: 'Ease In Out', value: 'ease-in-out' },
      { label: 'Linear', value: 'linear' },
    ],
    admin: { condition: (_, { animation }) => animation && animation !== 'none' },
  },
]
```

---

## Content Blocks

```typescript
// blocks/index.ts
import type { Block } from 'payload'
import { animationFields } from '../fields/animationFields'

// Shared base fields for all blocks
const blockBaseFields = [
  { name: 'blockId', type: 'text' as const, admin: { description: 'Anchor ID for linking' } },
  ...animationFields,
]

export const HeadingBlock: Block = {
  slug: 'heading',
  fields: [
    ...blockBaseFields,
    { name: 'content', type: 'text', required: true },
    {
      name: 'tag',
      type: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      defaultValue: 'h2',
    },
    {
      name: 'size',
      type: 'select',
      options: ['9xl', '8xl', '7xl', '6xl', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'base', 'sm'],
      defaultValue: '2xl',
    },
    { name: 'className', type: 'text' },
  ],
}

export const EyebrowBlock: Block = {
  slug: 'eyebrow',
  fields: [
    ...blockBaseFields,
    { name: 'content', type: 'text', required: true },
    { name: 'tag', type: 'select', options: ['p', 'span', 'div'], defaultValue: 'p' },
    { name: 'size', type: 'select', options: ['xs', 'sm', 'base', 'lg'], defaultValue: 'sm' },
    { name: 'className', type: 'text' },
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  fields: [
    ...blockBaseFields,
    { name: 'richText', type: 'richText', required: true },
    { name: 'className', type: 'text' },
  ],
}

export const MediaBlock: Block = {
  slug: 'media',
  fields: [
    ...blockBaseFields,
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'className', type: 'text' },
  ],
}

export const CardBlock: Block = {
  slug: 'card',
  fields: [
    ...blockBaseFields,
    { name: 'horizontal', type: 'checkbox', defaultValue: false },
    { name: 'href', type: 'text' },
    { name: 'media', type: 'upload', relationTo: 'media' },
    { name: 'richText', type: 'richText' },
    { name: 'sticky', type: 'checkbox', defaultValue: false },
    { name: 'className', type: 'text' },
  ],
}

export const BadgeBlock: Block = {
  slug: 'badge',
  fields: [
    ...blockBaseFields,
    { name: 'content', type: 'text', required: true },
    {
      name: 'badgeType',
      type: 'select',
      options: ['blue', 'dark', 'green', 'red', 'yellow', 'indigo', 'purple', 'pink', 'default'],
      defaultValue: 'default',
    },
    { name: 'size', type: 'select', options: ['xs', 'sm'], defaultValue: 'sm' },
    { name: 'bordered', type: 'checkbox', defaultValue: false },
    { name: 'href', type: 'text' },
    { name: 'icon', type: 'text', admin: { description: 'Flowbite icon name' } },
    { name: 'className', type: 'text' },
  ],
}

export const ButtonRowBlock: Block = {
  slug: 'buttonRow',
  fields: [
    ...blockBaseFields,
    {
      name: 'buttons',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text' },
        { name: 'variant', type: 'select', options: ['primary', 'secondary', 'outline', 'ghost'] },
        { name: 'size', type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
        { name: 'icon', type: 'text' },
      ],
    },
    { name: 'className', type: 'text' },
  ],
}

export const AccordionBlock: Block = {
  slug: 'accordion',
  fields: [
    ...blockBaseFields,
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'richText', type: 'richText' },
      ],
    },
    { name: 'alwaysOpen', type: 'checkbox', defaultValue: false },
    { name: 'className', type: 'text' },
  ],
}

export const TabsBlock: Block = {
  slug: 'tabs',
  fields: [
    ...blockBaseFields,
    {
      name: 'tabs',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'richText', type: 'richText' },
      ],
    },
    { name: 'variant', type: 'select', options: ['default', 'underline', 'pills'] },
    { name: 'className', type: 'text' },
  ],
}

export const CarouselBlock: Block = {
  slug: 'carousel',
  fields: [
    ...blockBaseFields,
    {
      name: 'cards',
      type: 'array',
      fields: CardBlock.fields.filter(f => f.name !== 'blockId'), // Reuse card fields
    },
    { name: 'autoPlay', type: 'checkbox', defaultValue: false },
    { name: 'showIndicators', type: 'checkbox', defaultValue: true },
    { name: 'showControls', type: 'checkbox', defaultValue: true },
    { name: 'className', type: 'text' },
  ],
}

// ... Add remaining blocks: avatar, breadcrumb, buttonGroup, buttonGrid,
// icon, link, logoTicker, review, tile, timeline

// Export all blocks
export const contentBlocks: Block[] = [
  HeadingBlock,
  EyebrowBlock,
  RichTextBlock,
  MediaBlock,
  CardBlock,
  BadgeBlock,
  ButtonRowBlock,
  AccordionBlock,
  TabsBlock,
  CarouselBlock,
  // ... remaining blocks
]
```

---

## Pages Collection

```typescript
// collections/Pages.ts
import type { CollectionConfig } from 'payload'
import { cardFields, metaFields } from '../fields/cardFields'
import { responsiveNumberFields, colSpanFields } from '../fields/responsiveFields'
import { backgroundThemeField, foregroundThemeField, gutterField } from '../fields/themeFields'
import { animationFields } from '../fields/animationFields'
import { contentBlocks } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'card.title',
    defaultColumns: ['card.title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // SLUG - for routing
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
    },

    // CARD FIELDS - reusable for lists/carousels (can query separately)
    ...cardFields,

    // META/SEO FIELDS
    ...metaFields,

    // SECTIONS ARRAY - the main page content
    {
      name: 'sections',
      type: 'array',
      label: 'Page Sections',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data }) => data?.id || 'Section',
        },
      },
      fields: [
        // Section metadata
        { name: 'id', type: 'text', admin: { description: 'Section anchor ID' } },
        {
          name: 'tag',
          type: 'select',
          options: [
            { label: 'Header', value: 'header' },
            { label: 'Section', value: 'section' },
            { label: 'Footer', value: 'footer' },
          ],
          defaultValue: 'section',
        },

        // Theme & styling
        backgroundThemeField,
        foregroundThemeField,
        gutterField,
        {
          name: 'shape',
          type: 'select',
          options: ['round', 'rectangle'],
          defaultValue: 'rectangle',
        },
        {
          name: 'height',
          type: 'select',
          options: [
            { label: 'Auto', value: 'auto' },
            { label: 'Full Viewport', value: '100vh' },
            { label: 'Half Viewport', value: '50vh' },
            { label: 'Min Full Viewport', value: 'min-h-screen' },
          ],
          defaultValue: 'auto',
        },
        { name: 'className', type: 'text' },

        // Background media (optional)
        {
          name: 'background',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Background image/video for section' },
        },

        // Column layout (responsive grid)
        responsiveNumberFields('columnLayout', 'Grid Columns (per breakpoint)'),

        // COLUMNS ARRAY - nested inside sections
        {
          name: 'columns',
          type: 'array',
          label: 'Columns',
          admin: { initCollapsed: true },
          fields: [
            // Column-level colSpan override
            { name: 'enableColSpan', type: 'checkbox', defaultValue: false },
            colSpanFields,
            { name: 'className', type: 'text' },

            // CONTENT BLOCKS - the actual content
            {
              name: 'contentBlocks',
              type: 'blocks',
              blocks: contentBlocks, // All 20 block types
              label: 'Content Blocks',
            },
          ],
        },
      ],
    },
  ],
}
```

---

## Fetching Pages with Card Data Only

The card field group enables efficient queries for lists/carousels:

```typescript
// Fetch only card data for page lists (no sections)
import { PayloadSDK } from '@shopnex/payload-sdk'

const sdk = new PayloadSDK({ baseURL: 'https://your-payload.com/api' })

// Get all pages with ONLY card fields (for carousels, lists, grids)
const { docs: pageCards } = await sdk.collections.pages.find({
  select: {
    slug: true,
    card: true, // Only the card group
  },
  where: {
    status: { equals: 'published' },
  },
})

// Result shape:
// {
//   slug: 'about-us',
//   card: {
//     title: 'About Us',
//     description: 'Learn more about our company...',
//     image: { url: '...', alt: '...', width: 800, height: 600 },
//     badge: { text: 'New', type: 'green' }
//   }
// }

// Fetch full page with sections for rendering
const fullPage = await sdk.collections.pages.findOne({
  where: { slug: { equals: 'home' } },
  depth: 2, // Populate media relationships
})
```

---

## Mapper: Payload → AppPage

```typescript
// utils/mapPayloadToAppPage.ts
import type { SectionProps } from '@/components/page/types/section-types'
import type { ContentBlock } from '@/components/page/types/block-types'
import type { AppBlockMediaData } from '@/components/page/app-blocks/app-block-media/app-block-media'

interface PayloadPage {
  slug: string
  card: {
    title: string
    description?: string
    image?: PayloadMedia
    href?: string
    badge?: { text?: string; type?: string }
  }
  sections: PayloadSection[]
}

interface PayloadMedia {
  id: number
  url: string
  alt?: string
  width: number
  height: number
  filename: string
  mimeType: string
  filesize: number
  focalX?: number
  focalY?: number
  updatedAt: string
  createdAt: string
}

interface PayloadSection {
  id?: string
  tag?: 'header' | 'section' | 'footer'
  backgroundTheme?: string
  foregroundTheme?: string
  gutter?: string[]
  shape?: 'round' | 'rectangle'
  height?: string
  className?: string
  background?: PayloadMedia
  columnLayout?: Record<string, number>
  columns?: PayloadColumn[]
}

interface PayloadColumn {
  enableColSpan?: boolean
  colSpan?: Record<string, number>
  className?: string
  contentBlocks?: PayloadBlock[]
}

interface PayloadBlock {
  blockType: string
  [key: string]: any
}

// Map Payload media to AppBlockMediaData
function mapMedia(media: PayloadMedia): AppBlockMediaData {
  return {
    id: media.id,
    url: media.url,
    alt: media.alt || '',
    width: media.width,
    height: media.height,
    filename: media.filename,
    mimeType: media.mimeType,
    filesize: media.filesize,
    focalX: media.focalX ?? 50,
    focalY: media.focalY ?? 50,
    updatedAt: media.updatedAt,
    createdAt: media.createdAt,
  }
}

// Map Payload block to ContentBlock
function mapBlock(block: PayloadBlock): ContentBlock {
  const { blockType, className, media, ...rest } = block

  return {
    blockType,
    class: className,
    ...(media ? { ...mapMedia(media) } : {}),
    ...rest,
  } as ContentBlock
}

// Main mapper
export function mapPayloadToAppPage(page: PayloadPage): SectionProps[] {
  return page.sections.map((section): SectionProps => ({
    id: section.id,
    tag: section.tag,
    backgroundTheme: section.backgroundTheme as any,
    foregroundTheme: section.foregroundTheme as any,
    gutter: section.gutter as any,
    shape: section.shape,
    height: section.height,
    class: section.className,
    background: section.background ? mapMedia(section.background) : undefined,
    columnLayout: section.columnLayout as any,
    columns: section.columns?.map((col) => ({
      colSpan: col.enableColSpan ? col.colSpan as any : undefined,
      class: col.className,
      contentBlocks: col.contentBlocks?.map(mapBlock) || [],
    })),
  }))
}

// Card mapper for lists/carousels
export function mapPayloadToCard(page: PayloadPage) {
  return {
    title: page.card.title,
    description: page.card.description,
    href: page.card.href || `/${page.slug}`,
    media: page.card.image ? mapMedia(page.card.image) : undefined,
    badge: page.card.badge,
  }
}
```

---

## Usage Example

```typescript
// routes/[slug]/index.tsx
import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { AppPage } from '~/components/page/app-page/app-page'
import { mapPayloadToAppPage } from '~/utils/mapPayloadToAppPage'
import { sdk } from '~/lib/payload-sdk'

export const usePageData = routeLoader$(async ({ params, status }) => {
  const page = await sdk.collections.pages.findOne({
    where: { slug: { equals: params.slug } },
    depth: 2,
  })

  if (!page) {
    status(404)
    return null
  }

  return {
    sections: mapPayloadToAppPage(page),
    meta: page.meta,
    card: page.card,
  }
})

export default component$(() => {
  const pageData = usePageData()

  if (!pageData.value) {
    return <div>Page not found</div>
  }

  return <AppPage sections={pageData.value.sections} />
})
```

---

## Summary: Reusable Field Groups

| Field Group | Purpose | Query Separately |
|-------------|---------|------------------|
| `cardFields` | Title, description, image, badge for lists/carousels | ✅ `select: { card: true }` |
| `metaFields` | SEO title, description, OG image, noindex | ✅ `select: { meta: true }` |
| `responsiveNumberFields` | xs/sm/md/lg/xl/2xl breakpoint values | Part of sections |
| `animationFields` | AOS animation, placement, easing | Part of blocks |
| `themeFields` | Background/foreground colors, gutters | Part of sections |

This architecture lets you fetch **only card data** for page listings without loading the entire page content.

