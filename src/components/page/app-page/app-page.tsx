import { component$ } from "@builder.io/qwik";
import { AppSection, type SectionProps } from "../app-section/app-section";

/**
 * Props for the AppPage component
 */
export interface AppPageProps {
  sections: SectionProps[];
}

/**
 * AppPage component that renders a complete page structure
 * Uses the tag prop in SectionProps to differentiate between header, section, and footer
 * Typically: first section has tag="header", middle sections have tag="section", last section has tag="footer"
 */
export const AppPage = component$((props: AppPageProps) => {
  const { sections } = props;

  const firstSection = sections[0];
  const lastSection = sections[sections.length - 1];
  const middleSections = sections.slice(1, -1);

  return (
    <>
      {firstSection && (
        <AppSection key="section-0" {...firstSection} />
      )}

      <main>
        {middleSections.map((sectionProps, index) => (
          <AppSection
            key={`section-${index + 1}`}
            {...sectionProps}
          />
        ))}
      </main>

      {lastSection && sections.length > 1 && (
        <AppSection key={`section-${sections.length - 1}`} {...lastSection} />
      )}
    </>
  );
});

