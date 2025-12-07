import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { AppPage } from "~/components/page/app-page/app-page";
import type { SectionProps } from "~/components/page/app-section/app-section";

export default component$(() => {
  // Define sections with different tags: header, sections, and footer
  const sections: SectionProps[] = [
    // Section 1: Header section
    {
      tag: "header",
      backgroundTheme: "blue",
      foregroundTheme: "white",
      shape: "rectangle",
      height: "100vh",
      gutter: ["horizontal-lg", "vertical-lg"],
      columnLayout: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, "2xl": 1 },
      class: "flex items-center justify-center",
      background: {
        id: 100,
        alt: "Mountain landscape at sunset",
        caption: null,
        updatedAt: "2025-12-03T08:41:21.445Z",
        createdAt: "2025-12-03T00:33:47.091Z",
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        thumbnailURL: null,
        filename: "mountain-sunset.jpg",
        mimeType: "image/jpeg",
        filesize: 2500000,
        width: 1920,
        height: 1080,
        focalX: 50,
        focalY: 40,
        fixed: true,
      },
      columns: [
        {
          class: "text-center",
          contentBlocks: [
            {
              blockType: "breadcrumb",
              items: [
                { label: "Home", href: "/", home: true },
                { label: "Examples", href: "/examples" },
                { label: "Page Example" },
              ],
            },
            {
              blockType: "eyebrow",
              content: "Welcome to Our Platform",
              tag: "p",
              size: "base",
            },
            {
              blockType: "heading",
              content: "Build Amazing Things with Qwik",
              tag: "h1",
              size: "7xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "heading",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Admin Dashboard",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      tag: "h3",
                      version: 1,
                    },
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Manage this site's pages and products from the ",
                          version: 1,
                        },
                        {
                          type: "link",
                          children: [
                            {
                              type: "text",
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "admin dashboard",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          fields: {
                            linkType: "custom",
                            newTab: false,
                            url: "/admin",
                          },
                          format: "",
                          indent: 0,
                          version: 2,
                        },
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: ".",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
            {
              blockType: "buttonRow",
              buttons: [
                {
                  label: "Explore Features",
                  href: "/features",
                  color: "blue",
                  size: "lg",
                  prefix: "IconWandSparklesSolid",
                },
                {
                  label: "Watch Demo",
                  href: "/demo",
                  color: "light",
                  size: "lg",
                  prefix: "IconVideoSolid",
                  suffix: "IconArrowRightOutline",
                },
              ],
            },
            {
              blockType: "buttonRow",
              buttons: [
                {
                  label: "Pink Glow",
                  href: "/glow",
                  gradient: "pink",
                  shadow: "pink",
                  size: "lg",
                },
                {
                  label: "Purple Glow",
                  href: "/glow",
                  gradient: "purple",
                  shadow: "purple",
                  size: "lg",
                },
                {
                  label: "Cyan Glow",
                  href: "/glow",
                  gradient: "cyan",
                  shadow: "cyan",
                  size: "lg",
                },
              ],
            },
            {
              blockType: "buttonGroup",
              buttons: [
                {
                  label: "Monthly",
                  href: "/pricing/monthly",
                  color: "blue",
                },
                {
                  label: "Yearly",
                  href: "/pricing/yearly",
                  color: "blue",
                },
                {
                  label: "Enterprise",
                  href: "/pricing/enterprise",
                  color: "blue",
                },
              ],
            },
            {
              blockType: "buttonGrid",
              buttons: [
                {
                  label: "Dashboard",
                  href: "/dashboard",
                  color: "blue",
                  prefix: "IconGridSolid",
                },
                {
                  label: "Analytics",
                  href: "/analytics",
                  color: "purple",
                  prefix: "IconChartPieSolid",
                },
                {
                  label: "Settings",
                  href: "/settings",
                  color: "dark",
                  prefix: "IconAdjustmentsHorizontalSolid",
                },
                {
                  label: "Help",
                  href: "/help",
                  color: "light",
                  prefix: "IconQuestionCircleSolid",
                },
              ],
            },
            {
              blockType: "link",
              href: "https://qwik.dev",
              text: "Learn more about Qwik",
              newTab: true,
            },
            {
              blockType: "link",
              href: "/docs",
              text: "View Documentation",
              newTab: false,
            },
          ],
        },
      ],
    },

    // Logo Ticker Section
    {
      tag: "section",
      backgroundTheme: "transparent",
      foregroundTheme: "transparent",
      shape: "rectangle",
      height: "auto",
      gutter: ["horizontal-none", "vertical-md"],
      columnLayout: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, "2xl": 1 },
      columns: [
        {
          contentBlocks: [
            {
              blockType: "logoTicker",
              duration: 60,
              reverse: false,
              fadeEdges: true,
              logos: [
                {
                  id: 201,
                  alt: "Spotify",
                  caption: null,
                  updatedAt: "2025-12-03T08:41:21.445Z",
                  createdAt: "2025-12-03T00:33:47.091Z",
                  url: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/customers/spotify-grayscale.svg",
                  thumbnailURL: null,
                  filename: "spotify.svg",
                  mimeType: "image/svg+xml",
                  filesize: 5000,
                  width: 120,
                  height: 40,
                  focalX: 50,
                  focalY: 50,
                },
                {
                  id: 202,
                  alt: "Microsoft",
                  caption: null,
                  updatedAt: "2025-12-03T08:41:21.445Z",
                  createdAt: "2025-12-03T00:33:47.091Z",
                  url: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/customers/microsoft-grayscale.svg",
                  thumbnailURL: null,
                  filename: "microsoft.svg",
                  mimeType: "image/svg+xml",
                  filesize: 5000,
                  width: 120,
                  height: 40,
                  focalX: 50,
                  focalY: 50,
                },
                {
                  id: 203,
                  alt: "Google",
                  caption: null,
                  updatedAt: "2025-12-03T08:41:21.445Z",
                  createdAt: "2025-12-03T00:33:47.091Z",
                  url: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/customers/google-grayscale.svg",
                  thumbnailURL: null,
                  filename: "google.svg",
                  mimeType: "image/svg+xml",
                  filesize: 5000,
                  width: 120,
                  height: 40,
                  focalX: 50,
                  focalY: 50,
                },
                {
                  id: 204,
                  alt: "Spotify",
                  caption: null,
                  updatedAt: "2025-12-03T08:41:21.445Z",
                  createdAt: "2025-12-03T00:33:47.091Z",
                  url: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/customers/spotify-grayscale.svg",
                  thumbnailURL: null,
                  filename: "spotify.svg",
                  mimeType: "image/svg+xml",
                  filesize: 5000,
                  width: 120,
                  height: 40,
                  focalX: 50,
                  focalY: 50,
                },
                {
                  id: 205,
                  alt: "Microsoft",
                  caption: null,
                  updatedAt: "2025-12-03T08:41:21.445Z",
                  createdAt: "2025-12-03T00:33:47.091Z",
                  url: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/customers/microsoft-grayscale.svg",
                  thumbnailURL: null,
                  filename: "microsoft.svg",
                  mimeType: "image/svg+xml",
                  filesize: 5000,
                  width: 120,
                  height: 40,
                  focalX: 50,
                  focalY: 50,
                },
                {
                  id: 206,
                  alt: "Google",
                  caption: null,
                  updatedAt: "2025-12-03T08:41:21.445Z",
                  createdAt: "2025-12-03T00:33:47.091Z",
                  url: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/customers/google-grayscale.svg",
                  thumbnailURL: null,
                  filename: "google.svg",
                  mimeType: "image/svg+xml",
                  filesize: 5000,
                  width: 120,
                  height: 40,
                  focalX: 50,
                  focalY: 50,
                },
              ],
            },
          ],
        },
      ],
    },

    // Section 2: Two column layout with badges and content
    {
      tag: "section",
      backgroundTheme: "transparent",
      foregroundTheme: "purple",
      shape: "rectangle",
      height: "auto",
      gutter: ["horizontal-md", "vertical-xl"],
      columnLayout: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2, "2xl": 2 },
      columns: [
        {
          contentBlocks: [
            {
              blockType: "media",
              id: 2,
              alt: "Modern architecture",
              caption: null,
              updatedAt: "2025-12-03T08:41:21.445Z",
              createdAt: "2025-12-03T00:33:47.091Z",
              url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",
              thumbnailURL: null,
              filename: "architecture.jpg",
              mimeType: "image/jpeg",
              filesize: 1856000,
              width: 1920,
              height: 1280,
              focalX: 50,
              focalY: 50,
            },
            {
              blockType: "badge",
              class: "w-fit",
              type: "blue",
              content: "Performance",
              icon: "IconBellOutline",
            },
            {
              blockType: "heading",
              content: "Fast Performance",
              tag: "h2",
              size: "4xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Experience lightning-fast performance with Qwik's innovative approach to web development.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
            {
              blockType: "review",
              rating: 4.5,
              scale: 5,
              size: "md",
              reviewLink: {
                href: "/reviews",
                text: "Read 128 reviews",
              },
            },
          ],
        },
        {
          contentBlocks: [
            {
              blockType: "media",
              id: 3,
              alt: "Creative workspace",
              caption: null,
              updatedAt: "2025-12-03T08:41:21.445Z",
              createdAt: "2025-12-03T00:33:47.091Z",
              url: "https://images.unsplash.com/photo-1497366216548-37526070297c",
              thumbnailURL: null,
              filename: "workspace.jpg",
              mimeType: "image/jpeg",
              filesize: 1920000,
              width: 1920,
              height: 1280,
              focalX: 50,
              focalY: 50,
            },
            {
              blockType: "eyebrow",
              content: "Built for Developers",
              tag: "p",
              size: "sm",
            },
            {
              blockType: "badge",
              class: "w-fit",
              type: "green",
              content: "DX First",
              icon: "IconCodeOutline",
            },
            {
              blockType: "heading",
              content: "Developer Experience",
              tag: "h2",
              size: "4xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Build with confidence using modern tooling and best practices.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
      ],
    },

    // Section 2.5: App Cards Example
    {
      tag: "section",
      backgroundTheme: "transparent",
      foregroundTheme: "gray",
      shape: "rectangle",
      height: "auto",
      gutter: ["horizontal-lg", "vertical-xl"],
      columnLayout: { xs: 1, sm: 1, md: 3, lg: 3, xl: 3, "2xl": 3 },
      columns: [
        {
          contentBlocks: [
            {
              blockType: "tile",
              backgroundTheme: "blue",
              foregroundTheme: "blue",
              icon: {
                name: "IconRocketOutline",
                color: "blue",
                size: 8,
              },
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "heading",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Fast & Efficient",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      tag: "h3",
                      version: 1,
                    },
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Qwik delivers instant loading with resumability - no hydration needed.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          contentBlocks: [
            {
              blockType: "tile",
              backgroundTheme: "green",
              foregroundTheme: "green",
              icon: {
                name: "IconShieldCheckOutline",
                color: "green",
                size: 8,
              },
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "heading",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Scalable",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      tag: "h3",
                      version: 1,
                    },
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Build apps that scale effortlessly with lazy-loading by default.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          contentBlocks: [
            {
              blockType: "tile",
              backgroundTheme: "purple",
              foregroundTheme: "purple",
              icon: {
                name: "IconLightbulbOutline",
                color: "purple",
                size: 8,
              },
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "heading",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Developer Friendly",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      tag: "h3",
                      version: 1,
                    },
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Familiar React-like syntax with powerful optimizations built-in.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
      ],
    },

    // Section 2.6: Card Examples
    {
      tag: "section",
      backgroundTheme: "transparent",
      foregroundTheme: "gray",
      shape: "rectangle",
      height: "auto",
      gutter: ["horizontal-lg", "vertical-xl"],
      columnLayout: { xs: 1, sm: 1, md: 3, lg: 3, xl: 3, "2xl": 3 },
      columns: [
        {
          contentBlocks: [
            {
              blockType: "card",
              media: {
                id: 10,
                alt: "Mountain landscape",
                caption: null,
                updatedAt: "2025-12-03T08:41:21.445Z",
                createdAt: "2025-12-03T00:33:47.091Z",
                url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
                thumbnailURL: null,
                filename: "mountain.jpg",
                mimeType: "image/jpeg",
                filesize: 2048000,
                width: 1920,
                height: 1080,
                focalX: 50,
                focalY: 50,
              },
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "heading",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Mountain Adventures",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      tag: "h3",
                      version: 1,
                    },
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Explore breathtaking mountain landscapes and discover nature's beauty.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          contentBlocks: [
            {
              blockType: "card",
              href: "https://example.com",
              media: {
                id: 11,
                alt: "Ocean waves",
                caption: null,
                updatedAt: "2025-12-03T08:41:21.445Z",
                createdAt: "2025-12-03T00:33:47.091Z",
                url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
                thumbnailURL: null,
                filename: "ocean.jpg",
                mimeType: "image/jpeg",
                filesize: 1920000,
                width: 1920,
                height: 1280,
                focalX: 50,
                focalY: 50,
              },
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "heading",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Ocean Escapes",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      tag: "h3",
                      version: 1,
                    },
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Click to discover serene beaches and crystal-clear waters.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          contentBlocks: [
            {
              blockType: "card",
              media: {
                id: 12,
                alt: "Forest path",
                caption: null,
                updatedAt: "2025-12-03T08:41:21.445Z",
                createdAt: "2025-12-03T00:33:47.091Z",
                url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                thumbnailURL: null,
                filename: "forest.jpg",
                mimeType: "image/jpeg",
                filesize: 1850000,
                width: 1920,
                height: 1280,
                focalX: 50,
                focalY: 50,
              },
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "heading",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Forest Trails",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      tag: "h3",
                      version: 1,
                    },
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Walk through enchanting forests and reconnect with nature.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
      ],
    },

    // Section 2.7: Carousel Example
    {
      tag: "section",
      backgroundTheme: "transparent",
      foregroundTheme: "blue",
      shape: "rectangle",
      height: "auto",
      gutter: ["horizontal-lg", "vertical-xl"],
      columnLayout: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, "2xl": 1 },
      columns: [
        {
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "New Component",
              tag: "p",
              size: "sm",
            },
            {
              blockType: "heading",
              content: "Card Carousel",
              tag: "h2",
              size: "4xl",
            },
            {
              blockType: "carousel",
              showArrows: true,
              showDots: true,
              gap: 24,
              snapAlign: "start",
              ariaLabel: "Featured destinations carousel",
              cards: [
                {
                  media: {
                    id: 20,
                    alt: "Mountain landscape",
                    caption: null,
                    updatedAt: "2025-12-03T08:41:21.445Z",
                    createdAt: "2025-12-03T00:33:47.091Z",
                    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
                    thumbnailURL: null,
                    filename: "mountain.jpg",
                    mimeType: "image/jpeg",
                    filesize: 2048000,
                    width: 1920,
                    height: 1080,
                    focalX: 50,
                    focalY: 50,
                  },
                  class: "min-w-[300px] max-w-[350px]",
                  richText: {
                    root: {
                      type: "root",
                      children: [
                        {
                          type: "heading",
                          children: [{ type: "text", detail: 0, format: 0, mode: "normal", style: "", text: "Mountain Views", version: 1 }],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          tag: "h3",
                          version: 1,
                        },
                        {
                          type: "paragraph",
                          children: [{ type: "text", detail: 0, format: 0, mode: "normal", style: "", text: "Explore breathtaking mountain landscapes.", version: 1 }],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  },
                },
                {
                  media: {
                    id: 21,
                    alt: "Ocean sunset",
                    caption: null,
                    updatedAt: "2025-12-03T08:41:21.445Z",
                    createdAt: "2025-12-03T00:33:47.091Z",
                    url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
                    thumbnailURL: null,
                    filename: "ocean.jpg",
                    mimeType: "image/jpeg",
                    filesize: 1920000,
                    width: 1920,
                    height: 1280,
                    focalX: 50,
                    focalY: 50,
                  },
                  class: "min-w-[300px] max-w-[350px]",
                  richText: {
                    root: {
                      type: "root",
                      children: [
                        {
                          type: "heading",
                          children: [{ type: "text", detail: 0, format: 0, mode: "normal", style: "", text: "Ocean Escapes", version: 1 }],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          tag: "h3",
                          version: 1,
                        },
                        {
                          type: "paragraph",
                          children: [{ type: "text", detail: 0, format: 0, mode: "normal", style: "", text: "Discover serene beaches and crystal waters.", version: 1 }],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  },
                },
                {
                  media: {
                    id: 22,
                    alt: "Forest path",
                    caption: null,
                    updatedAt: "2025-12-03T08:41:21.445Z",
                    createdAt: "2025-12-03T00:33:47.091Z",
                    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                    thumbnailURL: null,
                    filename: "forest.jpg",
                    mimeType: "image/jpeg",
                    filesize: 1850000,
                    width: 1920,
                    height: 1280,
                    focalX: 50,
                    focalY: 50,
                  },
                  class: "min-w-[300px] max-w-[350px]",
                  richText: {
                    root: {
                      type: "root",
                      children: [
                        {
                          type: "heading",
                          children: [{ type: "text", detail: 0, format: 0, mode: "normal", style: "", text: "Forest Trails", version: 1 }],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          tag: "h3",
                          version: 1,
                        },
                        {
                          type: "paragraph",
                          children: [{ type: "text", detail: 0, format: 0, mode: "normal", style: "", text: "Walk through enchanting forest paths.", version: 1 }],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  },
                },
                {
                  media: {
                    id: 23,
                    alt: "Desert dunes",
                    caption: null,
                    updatedAt: "2025-12-03T08:41:21.445Z",
                    createdAt: "2025-12-03T00:33:47.091Z",
                    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35",
                    thumbnailURL: null,
                    filename: "desert.jpg",
                    mimeType: "image/jpeg",
                    filesize: 1750000,
                    width: 1920,
                    height: 1280,
                    focalX: 50,
                    focalY: 50,
                  },
                  class: "min-w-[300px] max-w-[350px]",
                  richText: {
                    root: {
                      type: "root",
                      children: [
                        {
                          type: "heading",
                          children: [{ type: "text", detail: 0, format: 0, mode: "normal", style: "", text: "Desert Adventures", version: 1 }],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          tag: "h3",
                          version: 1,
                        },
                        {
                          type: "paragraph",
                          children: [{ type: "text", detail: 0, format: 0, mode: "normal", style: "", text: "Experience vast desert landscapes.", version: 1 }],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  },
                },
                {
                  media: {
                    id: 24,
                    alt: "City skyline",
                    caption: null,
                    updatedAt: "2025-12-03T08:41:21.445Z",
                    createdAt: "2025-12-03T00:33:47.091Z",
                    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
                    thumbnailURL: null,
                    filename: "city.jpg",
                    mimeType: "image/jpeg",
                    filesize: 2100000,
                    width: 1920,
                    height: 1280,
                    focalX: 50,
                    focalY: 50,
                  },
                  class: "min-w-[300px] max-w-[350px]",
                  richText: {
                    root: {
                      type: "root",
                      children: [
                        {
                          type: "heading",
                          children: [{ type: "text", detail: 0, format: 0, mode: "normal", style: "", text: "Urban Exploration", version: 1 }],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          tag: "h3",
                          version: 1,
                        },
                        {
                          type: "paragraph",
                          children: [{ type: "text", detail: 0, format: 0, mode: "normal", style: "", text: "Discover vibrant city life and culture.", version: 1 }],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // Section 3: Single column with video/image placeholder
    {
      tag: "section",
      backgroundTheme: "pink",
      foregroundTheme: "pink",
      shape: "round",
      gutter: ["horizontal-sm", "vertical-sm"],
      columnLayout: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, "2xl": 1 },
      columns: [
        {
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "See it in action",
              tag: "p",
              size: "base",
            },
            {
              blockType: "heading",
              content: "Watch Our <i>demo</i>.",
              tag: "h2",
              size: "7xl",
            },
            {
              blockType: "media",
              id: 1,
              alt: "Random nature landscape",
              caption: null,
              updatedAt: "2025-12-03T08:41:21.445Z",
              createdAt: "2025-12-03T00:33:47.091Z",
              url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
              thumbnailURL: null,
              filename: "nature-landscape.jpg",
              mimeType: "image/jpeg",
              filesize: 2048000,
              width: 1920,
              height: 1080,
              focalX: 50,
              focalY: 50,
            },
          ],
        },
      ],
    },

    // Section 3.5: Table Example
    {
      tag: "section",
      backgroundTheme: "transparent",
      foregroundTheme: "gray",
      shape: "rectangle",
      height: "auto",
      gutter: ["horizontal-lg", "vertical-lg"],
      columnLayout: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, "2xl": 1 },
      columns: [
        {
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "Transparent Pricing",
              tag: "p",
              size: "sm",
            },
            {
              blockType: "heading",
              content: "Pricing Comparison",
              tag: "h2",
              size: "4xl",
            },
            {
              blockType: "badge",
              class: "w-fit mb-4",
              type: "purple",
              content: "Simple & Clear",
              icon: "IconWandSparklesSolid",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "table",
                      children: [
                        {
                          type: "tablerow",
                          children: [
                            {
                              type: "tablecell",
                              headerState: 1,
                              children: [
                                {
                                  type: "paragraph",
                                  children: [
                                    {
                                      type: "text",
                                      detail: 0,
                                      format: 0,
                                      mode: "normal",
                                      style: "",
                                      text: "Plan",
                                      version: 1,
                                    },
                                  ],
                                  direction: "ltr",
                                  format: "",
                                  indent: 0,
                                  version: 1,
                                },
                              ],
                              version: 1,
                            },
                            {
                              type: "tablecell",
                              headerState: 1,
                              children: [
                                {
                                  type: "paragraph",
                                  children: [
                                    {
                                      type: "text",
                                      detail: 0,
                                      format: 0,
                                      mode: "normal",
                                      style: "",
                                      text: "Price",
                                      version: 1,
                                    },
                                  ],
                                  direction: "ltr",
                                  format: "",
                                  indent: 0,
                                  version: 1,
                                },
                              ],
                              version: 1,
                            },
                            {
                              type: "tablecell",
                              headerState: 1,
                              children: [
                                {
                                  type: "paragraph",
                                  children: [
                                    {
                                      type: "text",
                                      detail: 0,
                                      format: 0,
                                      mode: "normal",
                                      style: "",
                                      text: "Features",
                                      version: 1,
                                    },
                                  ],
                                  direction: "ltr",
                                  format: "",
                                  indent: 0,
                                  version: 1,
                                },
                              ],
                              version: 1,
                            },
                          ],
                          version: 1,
                        },
                        {
                          type: "tablerow",
                          children: [
                            {
                              type: "tablecell",
                              children: [
                                {
                                  type: "paragraph",
                                  children: [
                                    {
                                      type: "text",
                                      detail: 0,
                                      format: 0,
                                      mode: "normal",
                                      style: "",
                                      text: "Starter",
                                      version: 1,
                                    },
                                  ],
                                  direction: "ltr",
                                  format: "",
                                  indent: 0,
                                  version: 1,
                                },
                              ],
                              version: 1,
                            },
                            {
                              type: "tablecell",
                              children: [
                                {
                                  type: "paragraph",
                                  children: [
                                    {
                                      type: "text",
                                      detail: 0,
                                      format: 0,
                                      mode: "normal",
                                      style: "",
                                      text: "$9/month",
                                      version: 1,
                                    },
                                  ],
                                  direction: "ltr",
                                  format: "",
                                  indent: 0,
                                  version: 1,
                                },
                              ],
                              version: 1,
                            },
                            {
                              type: "tablecell",
                              children: [
                                {
                                  type: "paragraph",
                                  children: [
                                    {
                                      type: "text",
                                      detail: 0,
                                      format: 0,
                                      mode: "normal",
                                      style: "",
                                      text: "Basic features, 1 user",
                                      version: 1,
                                    },
                                  ],
                                  direction: "ltr",
                                  format: "",
                                  indent: 0,
                                  version: 1,
                                },
                              ],
                              version: 1,
                            },
                          ],
                          version: 1,
                        },
                      ],
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
      ],
    },

    // Section 4: Custom colSpan example - 6 column grid with varied spans
    {
      tag: "section",
      backgroundTheme: "indigo",
      foregroundTheme: "yellow",
      shape: "rectangle",
      height: "auto",
      gutter: ["horizontal-md", "vertical-lg"],
      columnLayout: { xs: 1, sm: 2, md: 6, lg: 6, xl: 6, "2xl": 6 },
      columns: [
        {
          colSpan: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3, "2xl": 3 },
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "Spans 3 columns",
              tag: "p",
              size: "sm",
            },
            {
              blockType: "badge",
              class: "w-fit mb-2",
              type: "yellow",
              content: "Featured",
              icon: "IconStarOutline",
            },
            {
              blockType: "heading",
              content: "Large Feature Block",
              tag: "h3",
              size: "3xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "This is a large feature block spanning multiple columns.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          colSpan: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3, "2xl": 3 },
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "Spans 3 columns",
              tag: "p",
              size: "sm",
            },
            {
              blockType: "heading",
              content: "Another Large Block",
              tag: "h3",
              size: "3xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Another large block with rich content capabilities.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          colSpan: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2, "2xl": 2 },
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "Spans 2 columns",
              tag: "p",
              size: "sm",
            },
            {
              blockType: "heading",
              content: "Medium Block One",
              tag: "h4",
              size: "xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Medium-sized content block with flexible layout.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          colSpan: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2, "2xl": 2 },
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "Spans 2 columns",
              tag: "p",
              size: "sm",
            },
            {
              blockType: "heading",
              content: "Medium Block Two",
              tag: "h4",
              size: "xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Second medium block with responsive design.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          colSpan: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2, "2xl": 2 },
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "Spans 2 columns",
              tag: "p",
              size: "sm",
            },
            {
              blockType: "heading",
              content: "Medium Block Three",
              tag: "h4",
              size: "xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Third medium block completing the grid layout.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
      ],
    },

    // Section 5: Three column layout with features
    {
      tag: "section",
      backgroundTheme: "transparent",
      foregroundTheme: "green",
      shape: "rectangle",
      height: "auto",
      gutter: ["horizontal-md", "vertical-lg"],
      columnLayout: { xs: 1, sm: 1, md: 3, lg: 3, xl: 3, "2xl": 3 },
      columns: [
        {
          contentBlocks: [
            {
              blockType: "icon",
              name: "IconRocketOutline",
              color: "red",
              size: 6,
            },
            {
              blockType: "badge",
              class: "w-fit mb-2",
              type: "red",
              content: "New",
              icon: "IconFireOutline",
            },
            {
              blockType: "heading",
              content: "Feature One",
              tag: "h3",
              size: "2xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Feature one brings innovative solutions to your workflow.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          contentBlocks: [
            {
              blockType: "icon",
              name: "IconUsersGroupOutline",
              color: "blue",
              size: 7,
            },
            {
              blockType: "eyebrow",
              content: "Collaboration Tools",
              tag: "p",
              size: "xs",
            },
            {
              blockType: "badge",
              class: "w-fit mb-2",
              type: "indigo",
              content: "Popular",
              icon: "IconHeartOutline",
            },
            {
              blockType: "heading",
              content: "Feature Two",
              tag: "h3",
              size: "2xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Feature two enhances productivity with cutting-edge technology.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          contentBlocks: [
            {
              blockType: "icon",
              name: "IconChartMixedOutline",
              color: "green",
              size: 8,
            },
            {
              blockType: "heading",
              content: "Feature Three",
              tag: "h3",
              size: "2xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Feature three drives growth and success for your business.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
      ],
    },

    // Section 6: Call to action section with centered content
    {
      tag: "section",
      backgroundTheme: "pink",
      foregroundTheme: "pink",
      shape: "round",
      height: "50vh",
      gutter: ["horizontal-lg", "vertical-xl"],
      columnLayout: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, "2xl": 1 },
      background: {
        id: 102,
        alt: "Vibrant sunset over ocean",
        caption: null,
        updatedAt: "2025-12-03T08:41:21.445Z",
        createdAt: "2025-12-03T00:33:47.091Z",
        url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869",
        thumbnailURL: null,
        filename: "ocean-sunset.jpg",
        mimeType: "image/jpeg",
        filesize: 2200000,
        width: 1920,
        height: 1080,
        focalX: 50,
        focalY: 60,
      },
      columns: [
        {
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "Get Started Today",
              tag: "p",
              size: "base",
            },
            {
              blockType: "badge",
              class: "w-fit mb-4",
              type: "pink",
              content: "Limited Offer",
              icon: "IconGiftBoxOutline",
            },
            {
              blockType: "heading",
              content: "Ready to Build Something Amazing?",
              tag: "h2",
              size: "6xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Join thousands of developers building the future of the web.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
            {
              blockType: "buttonRow",
              buttons: [
                {
                  label: "Get Started",
                  href: "/signup",
                  color: "blue",
                  size: "lg",
                  suffix: "IconArrowRightOutline",
                },
                {
                  label: "Learn More",
                  href: "/docs",
                  color: "light",
                  size: "lg",
                  prefix: "IconBookOutline",
                },
                {
                  label: "Contact Sales",
                  href: "/contact",
                  color: "purple",
                  size: "lg",
                  prefix: "IconPhoneOutline",
                },
              ],
            },
            {
              blockType: "buttonGroup",
              outline: true,
              buttons: [
                {
                  label: "Previous",
                  href: "/prev",
                  color: "dark",
                  prefix: "IconArrowLeftOutline",
                },
                {
                  label: "1",
                  href: "/page/1",
                  color: "dark",
                },
                {
                  label: "2",
                  href: "/page/2",
                  color: "dark",
                },
                {
                  label: "3",
                  href: "/page/3",
                  color: "dark",
                },
                {
                  label: "Next",
                  href: "/next",
                  color: "dark",
                  suffix: "IconArrowRightOutline",
                },
              ],
            },
          ],
        },
      ],
    },

    // Section 7: FAQ Accordion section
    {
      tag: "section",
      backgroundTheme: "transparent",
      foregroundTheme: "gray",
      shape: "rectangle",
      height: "auto",
      gutter: ["horizontal-lg", "vertical-xl"],
      columnLayout: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, "2xl": 1 },
      columns: [
        {
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "FAQ",
              tag: "p",
              size: "base",
            },
            {
              blockType: "heading",
              content: "Frequently Asked Questions",
              tag: "h2",
              size: "5xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Find answers to common questions about our platform and services.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
            {
              blockType: "accordion",
              items: [
                {
                  id: "faq-1",
                  heading: "What is Qwik and how is it different?",
                  richText: {
                    root: {
                      type: "root",
                      children: [
                        {
                          type: "paragraph",
                          children: [
                            {
                              type: "text",
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "Qwik is a revolutionary web framework that achieves instant-on interactivity through resumability. Unlike traditional frameworks that require hydration, Qwik can resume execution exactly where the server left off, resulting in ",
                              version: 1,
                            },
                            {
                              type: "text",
                              detail: 0,
                              format: 1,
                              mode: "normal",
                              style: "",
                              text: "zero JavaScript",
                              version: 1,
                            },
                            {
                              type: "text",
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: " being loaded on initial page load.",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  },
                },
                {
                  id: "faq-2",
                  heading: "How does resumability work?",
                  richText: {
                    root: {
                      type: "root",
                      children: [
                        {
                          type: "paragraph",
                          children: [
                            {
                              type: "text",
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "Resumability allows Qwik to serialize the application state on the server and resume it on the client without re-executing the application logic. This means:",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                        {
                          type: "list",
                          listType: "bullet",
                          start: 1,
                          tag: "ul",
                          children: [
                            {
                              type: "listitem",
                              value: 1,
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: "No hydration required",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                            {
                              type: "listitem",
                              value: 2,
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: "Instant interactivity",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                            {
                              type: "listitem",
                              value: 3,
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: "Optimal performance on any device",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  },
                },
                {
                  id: "faq-3",
                  heading: "Can I use Qwik with my existing tools?",
                  richText: {
                    root: {
                      type: "root",
                      children: [
                        {
                          type: "paragraph",
                          children: [
                            {
                              type: "text",
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "Yes! Qwik integrates seamlessly with modern development tools including TypeScript, Vite, Tailwind CSS, and more. You can also use popular UI libraries like Flowbite through ",
                              version: 1,
                            },
                            {
                              type: "link",
                              fields: {
                                linkType: "custom",
                                url: "https://flowbite-qwik.com",
                                newTab: true,
                              },
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: "flowbite-qwik",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                            {
                              type: "text",
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: ".",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  },
                },
                {
                  id: "faq-4",
                  heading: "What about SEO and performance?",
                  richText: {
                    root: {
                      type: "root",
                      children: [
                        {
                          type: "paragraph",
                          children: [
                            {
                              type: "text",
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "Qwik excels at both SEO and performance:",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                        {
                          type: "list",
                          listType: "number",
                          start: 1,
                          tag: "ol",
                          children: [
                            {
                              type: "listitem",
                              value: 1,
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 1,
                                  mode: "normal",
                                  style: "",
                                  text: "SEO:",
                                  version: 1,
                                },
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: " Full server-side rendering ensures search engines can crawl your content",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                            {
                              type: "listitem",
                              value: 2,
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 1,
                                  mode: "normal",
                                  style: "",
                                  text: "Performance:",
                                  version: 1,
                                },
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: " Minimal JavaScript means faster load times and better Core Web Vitals scores",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  },
                },
              ],
              alwaysOpen: false,
              openFirstItem: true,
              flush: false,
            },
          ],
        },
      ],
    },

    // Section 8: Features Tabs section
    {
      tag: "section",
      backgroundTheme: "blue",
      foregroundTheme: "white",
      shape: "rectangle",
      height: "auto",
      gutter: ["horizontal-lg", "vertical-xl"],
      columnLayout: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, "2xl": 1 },
      columns: [
        {
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "Features",
              tag: "p",
              size: "base",
            },
            {
              blockType: "heading",
              content: "Explore Our Platform",
              tag: "h2",
              size: "5xl",
            },
            {
              blockType: "richText",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Discover the powerful features that make our platform the best choice for modern web development.",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
            {
              blockType: "tabs",
              variant: "underline",
              items: [
                {
                  id: "tab-performance",
                  heading: "Performance",
                  active: true,
                  richText: {
                    root: {
                      type: "root",
                      children: [
                        {
                          type: "heading",
                          tag: "h3",
                          children: [
                            {
                              type: "text",
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "Lightning-Fast Performance",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                        {
                          type: "paragraph",
                          children: [
                            {
                              type: "text",
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "Our platform delivers exceptional performance through:",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                        {
                          type: "list",
                          listType: "bullet",
                          start: 1,
                          tag: "ul",
                          children: [
                            {
                              type: "listitem",
                              value: 1,
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 1,
                                  mode: "normal",
                                  style: "",
                                  text: "Zero JavaScript",
                                  version: 1,
                                },
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: " on initial page load",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                            {
                              type: "listitem",
                              value: 2,
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 1,
                                  mode: "normal",
                                  style: "",
                                  text: "Instant interactivity",
                                  version: 1,
                                },
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: " through resumability",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  },
                },
                {
                  id: "tab-developer-experience",
                  heading: "Developer Experience",
                  richText: {
                    root: {
                      type: "root",
                      children: [
                        {
                          type: "heading",
                          tag: "h3",
                          children: [
                            {
                              type: "text",
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "Built for Developers",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                        {
                          type: "paragraph",
                          children: [
                            {
                              type: "text",
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "We prioritize developer experience with modern tooling and best practices. Our platform includes:",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                        {
                          type: "list",
                          listType: "number",
                          start: 1,
                          tag: "ol",
                          children: [
                            {
                              type: "listitem",
                              value: 1,
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: "Full TypeScript support",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                            {
                              type: "listitem",
                              value: 2,
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: "Hot module replacement",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                            {
                              type: "listitem",
                              value: 3,
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: "Comprehensive documentation",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  },
                },
                {
                  id: "tab-scalability",
                  heading: "Scalability",
                  richText: {
                    root: {
                      type: "root",
                      children: [
                        {
                          type: "heading",
                          tag: "h3",
                          children: [
                            {
                              type: "text",
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "Scale with Confidence",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                        {
                          type: "paragraph",
                          children: [
                            {
                              type: "text",
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "Our architecture is designed to scale from small projects to enterprise applications. Whether you're building a simple landing page or a complex web application, our platform grows with your needs.",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                        {
                          type: "paragraph",
                          children: [
                            {
                              type: "text",
                              detail: 0,
                              format: 2,
                              mode: "normal",
                              style: "",
                              text: "Key benefits:",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                        {
                          type: "list",
                          listType: "bullet",
                          start: 1,
                          tag: "ul",
                          children: [
                            {
                              type: "listitem",
                              value: 1,
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: "Automatic code splitting",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                            {
                              type: "listitem",
                              value: 2,
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: "Edge-ready deployment",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                            {
                              type: "listitem",
                              value: 3,
                              children: [
                                {
                                  type: "text",
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: "Optimized bundle sizes",
                                  version: 1,
                                },
                              ],
                              direction: "ltr",
                              format: "",
                              indent: 0,
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // Section 9: Footer section - Flowbite style
    {
      tag: "footer",
      backgroundTheme: "transparent",
      foregroundTheme: "gray",
      shape: "rectangle",
      height: "auto",
      gutter: ["horizontal-lg", "vertical-lg"],
      columnLayout: { xs: 1, sm: 2, md: 4, lg: 4, xl: 4, "2xl": 4 },
      columns: [
        // Brand column
        {
          class: "sm:col-span-2 md:col-span-1",
          contentBlocks: [
            {
              blockType: "media",
              id: 200,
              alt: "Flowbite Logo",
              caption: null,
              updatedAt: "2025-12-03T08:41:21.445Z",
              createdAt: "2025-12-03T00:33:47.091Z",
              url: "https://flowbite.com/docs/images/logo.svg",
              thumbnailURL: null,
              filename: "flowbite-logo.svg",
              mimeType: "image/svg+xml",
              filesize: 5000,
              width: 40,
              height: 40,
              focalX: 50,
              focalY: 50,
            },
            {
              blockType: "heading",
              content: "Flowbite",
              tag: "h3",
              size: "2xl",
            },
          ],
        },
        // About column
        {
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "About",
              tag: "p",
              size: "sm",
              class: "font-semibold mb-2",
            },
            {
              blockType: "link",
              href: "#",
              text: "Flowbite",
              class: "font-normal hover:underline",
            },
            {
              blockType: "link",
              href: "#",
              text: "Tailwind CSS",
              class: "font-normal hover:underline",
            },
          ],
        },
        // Follow us column
        {
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "Follow us",
              tag: "p",
              size: "sm",
              class: "font-semibold mb-2",
            },
            {
              blockType: "link",
              href: "#",
              text: "Github",
              class: "font-normal hover:underline",
            },
            {
              blockType: "link",
              href: "#",
              text: "Discord",
              class: "font-normal hover:underline",
            },
          ],
        },
        // Legal column
        {
          contentBlocks: [
            {
              blockType: "eyebrow",
              content: "Legal",
              tag: "p",
              size: "sm",
              class: "font-semibold mb-2",
            },
            {
              blockType: "link",
              href: "#",
              text: "Privacy Policy",
              class: "font-normal hover:underline",
            },
            {
              blockType: "link",
              href: "#",
              text: "Terms & Conditions",
              class: "font-normal hover:underline",
            },
          ],
        },
        // Bottom row - Copyright and social icons (spans full width)
        {
          colSpan: { xs: 1, sm: 2, md: 4, lg: 4, xl: 4, "2xl": 4 },
          class: "flex flex-col sm:flex-row items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-700",
          contentBlocks: [
            {
              blockType: "richText",
              class: "mb-4 sm:mb-0",
              richText: {
                root: {
                  type: "root",
                  children: [
                    {
                      type: "paragraph",
                      children: [
                        {
                          type: "text",
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "© 2025 Flowbite™",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                },
              },
            },
            {
              blockType: "buttonRow",
              class: "gap-4",
              buttons: [
                {
                  label: "",
                  href: "#",
                  color: "light",
                  size: "sm",
                  prefix: "IconFacebookSolid",
                },
                {
                  label: "",
                  href: "#",
                  color: "light",
                  size: "sm",
                  prefix: "IconGithubSolid",
                },
                {
                  label: "",
                  href: "#",
                  color: "light",
                  size: "sm",
                  prefix: "IconDribbbleSolid",
                },
                {
                  label: "",
                  href: "#",
                  color: "light",
                  size: "sm",
                  prefix: "IconLinkedinSolid",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  return <AppPage sections={sections} />;
});

export const head: DocumentHead = {
  title: "Page Example - AppPage Component",
  meta: [
    {
      name: "description",
      content:
        "Comprehensive example of the AppPage component with varied sections",
    },
  ],
};
