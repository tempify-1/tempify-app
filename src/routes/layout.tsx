import { component$, Slot } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { AppEmbedLayout, AppMainLayout } from "~/components/layout/index";

// Server-side variable to track if the page is loaded in an iframe
let isIframe = false;

export const onGet: RequestHandler = async ({ cacheControl, request }) => {
  isIframe = request.headers.get("Sec-Fetch-Dest") === "iframe";

  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return isIframe === false ? (
    <AppMainLayout>
      <Slot />
    </AppMainLayout>
  ) : (
    <AppEmbedLayout>
      <Slot />
    </AppEmbedLayout>
  );
});
