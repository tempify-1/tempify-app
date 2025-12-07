import {
  $,
  component$,
  Slot,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { IconAngleLeftOutline, IconAngleRightOutline } from "flowbite-qwik-icons";
import { AppButton } from "~/components/ui/app-button/app-button";
import styles from "./carousel.css?inline";

export interface CarouselProps {
  /** Show/hide previous/next arrow buttons (default: true) */
  showArrows?: boolean;
  /** Show/hide navigation dots (default: true) */
  showDots?: boolean;
  /** Gap between slides in pixels (default: 16) */
  gap?: number;
  /** Scroll snap alignment (default: 'start') */
  snapAlign?: "start" | "center" | "end";
  /** Intersection Observer threshold for visibility detection 0-1 (default: 0.5) */
  visibilityThreshold?: number;
  /** Custom class for the carousel container */
  class?: string;
  /** ARIA label for the carousel region */
  ariaLabel?: string;
}

export const Carousel = component$<CarouselProps>((props) => {
  useStyles$(styles);

  const {
    showArrows = true,
    showDots = true,
    gap = 16,
    snapAlign = "start",
    visibilityThreshold = 0.5,
    class: className,
    ariaLabel = "Carousel",
  } = props;

  const trackRef = useSignal<HTMLElement>();
  const slideCount = useSignal(0);
  const visibleSlides = useSignal<number[]>([]);

  // Client-side Intersection Observer for tracking visible slides
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    ({ cleanup }) => {
      const track = trackRef.value;
      if (!track) return;

      const slides = Array.from(track.children) as HTMLElement[];
      slideCount.value = slides.length;

      const observer = new IntersectionObserver(
        (entries) => {
          const currentVisible = new Set(visibleSlides.value);
          entries.forEach((entry) => {
            const index = slides.indexOf(entry.target as HTMLElement);
            if (index === -1) return;
            if (entry.isIntersecting) {
              currentVisible.add(index);
            } else {
              currentVisible.delete(index);
            }
          });
          visibleSlides.value = Array.from(currentVisible).sort((a, b) => a - b);
        },
        {
          root: track,
          threshold: visibilityThreshold,
        }
      );

      slides.forEach((slide) => observer.observe(slide));

      cleanup(() => observer.disconnect());
    },
    { strategy: "document-ready" }
  );

  const scrollToSlide = $((index: number) => {
    const track = trackRef.value;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    if (slides[index]) {
      slides[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: snapAlign,
      });
    }
  });

  const scrollPrev = $(() => {
    const track = trackRef.value;
    if (!track) return;
    const firstChild = track.firstElementChild as HTMLElement | null;
    const slideWidth = firstChild?.offsetWidth || 0;
    track.scrollBy({ left: -(slideWidth + gap), behavior: "smooth" });
  });

  const scrollNext = $(() => {
    const track = trackRef.value;
    if (!track) return;
    const firstChild = track.firstElementChild as HTMLElement | null;
    const slideWidth = firstChild?.offsetWidth || 0;
    track.scrollBy({ left: slideWidth + gap, behavior: "smooth" });
  });

  const containerClasses = ["carousel", className].filter(Boolean).join(" ");

  return (
    <div
      class={containerClasses}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      {/* Scroll Container */}
      <div class="carousel-viewport">
        <div
          ref={trackRef}
          class="carousel-track"
          role="group"
          aria-live="polite"
          style={{
            "--carousel-gap": `${gap}px`,
            "--carousel-snap-align": snapAlign,
          }}
        >
          <Slot />
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <div class="carousel-arrows" aria-hidden="true">
          <AppButton
            onClick$={scrollPrev}
            aria-label="Previous slide"
            square
            color="light"
          >
            <IconAngleLeftOutline class="h-5 w-5" />
          </AppButton>
          <AppButton
            onClick$={scrollNext}
            aria-label="Next slide"
            square
            color="light"
          >
            <IconAngleRightOutline class="h-5 w-5" />
          </AppButton>
        </div>
      )}

      {/* Navigation Dots */}
      {showDots && slideCount.value > 0 && (
        <div class="carousel-dots" role="tablist" aria-label="Slide navigation">
          {Array.from({ length: slideCount.value }).map((_, index) => {
            const isActive = visibleSlides.value.includes(index);
            return (
              <button
                type="button"
                key={index}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${index + 1}`}
                class={`carousel-dot ${isActive ? "carousel-dot--active" : ""}`}
                onClick$={() => scrollToSlide(index)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
});

