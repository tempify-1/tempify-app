import { component$ } from "@builder.io/qwik";
import { AppSection, type SectionProps } from "../app-section/app-section";

export interface AppPageProps {
  sections: SectionProps[];
}

export const AppPage = component$((props: AppPageProps) => {
  const { sections } = props;

  if (!sections || sections.length === 0) {
    return null;
  }

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

