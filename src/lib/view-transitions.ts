let resolveTransition: (() => void) | null = null;
let transitionTimeout: ReturnType<typeof setTimeout> | null = null;

export function onNavigationComplete(): void {
  if (transitionTimeout) {
    clearTimeout(transitionTimeout);
    transitionTimeout = null;
  }
  if (resolveTransition) {
    resolveTransition();
    resolveTransition = null;
  }

  if (typeof window !== "undefined" && (window as any).__vtResolve) {
    (window as any).__vtResolve();
  }
}

export function navigateWithTransition(navigate: () => void): void {
  if (
    typeof document === "undefined" ||
    !("startViewTransition" in document)
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
