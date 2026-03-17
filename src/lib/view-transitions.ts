let resolveTransition: (() => void) | null = null;
let transitionTimeout: ReturnType<typeof setTimeout> | null = null;

type ViewTransitionCapableDocument = Document & {
  startViewTransition: Exclude<Document["startViewTransition"], undefined>;
};

declare global {
  interface Window {
    __vtResolve?: () => void;
  }
}

function supportsViewTransition(
  doc: Document
): doc is ViewTransitionCapableDocument {
  return typeof (doc as ViewTransitionCapableDocument).startViewTransition === "function";
}

export function onNavigationComplete(): void {
  if (transitionTimeout) {
    clearTimeout(transitionTimeout);
    transitionTimeout = null;
  }
  if (resolveTransition) {
    resolveTransition();
    resolveTransition = null;
  }

  if (typeof window !== "undefined" && window.__vtResolve) {
    window.__vtResolve();
  }
}

export function navigateWithTransition(navigate: () => void): void {
  if (
    typeof document === "undefined" ||
    !supportsViewTransition(document)
  ) {
    navigate();
    return;
  }

  document.documentElement.dataset.vtDirection = "forward";

  document.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        resolveTransition = resolve;

        transitionTimeout = setTimeout(() => {
          if (resolveTransition === resolve) {
            resolve();
            resolveTransition = null;
          }
        }, 150);

        navigate();
      })
  );
}
