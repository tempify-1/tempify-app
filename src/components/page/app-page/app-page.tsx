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

  // Group sections by their semantic role based on tag prop
  const headerSections = sections.filter((s) => s.tag === "header");
  const footerSections = sections.filter((s) => s.tag === "footer");
  const mainSections = sections.filter((s) => s.tag !== "header" && s.tag !== "footer");

  return (
    <>
      {/* Render header sections (outside main) */}
      {headerSections.map((sectionProps, index) => (
        <AppSection key={`header-section-${index}`} {...sectionProps} />
      ))}

      {/* Main content wrapper - only render if there are main sections */}
      {mainSections.length > 0 && (
        <main>
          {mainSections.map((sectionProps, index) => (
            <AppSection key={`main-section-${index}`} {...sectionProps} />
          ))}
        </main>
      )}

      {/* Render footer sections (outside main) */}
      {footerSections.map((sectionProps, index) => (
        <AppSection key={`footer-section-${index}`} {...sectionProps} />
      ))}
    </>
  );
});

