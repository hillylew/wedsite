import Alpine from "alpinejs";
import focus from "@alpinejs/focus";

window.Alpine = Alpine;

// Plugins.
Alpine.plugin(focus);

// Global store.
Alpine.store("app", {
  prefersReducedMotion: false,

  init() {
    // Set reduced motion preference.
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.prefersReducedMotion = mediaQuery.matches;
  },
});

// Init Alpine.
Alpine.start();
