import Alpine from "alpinejs";
import focus from "@alpinejs/focus";
import intersect from "@alpinejs/intersect";

window.Alpine = Alpine;

// Plugins.
Alpine.plugin(focus);
Alpine.plugin(intersect);

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
