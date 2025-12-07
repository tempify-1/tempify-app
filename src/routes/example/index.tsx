import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <span data-embed-icon="IconHomeOutline"></span>
      <div style="height:200vh;">
        <h1>Example Hi 👋</h1>
        <div>
          Can't wait to see what you build with qwik!
          <br />
          Happy coding.
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
