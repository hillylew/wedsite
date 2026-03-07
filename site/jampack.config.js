export default {
  css: {
    inline_critical_css: true,
  },

  image: {
    max_width: 1920,
    external: {
      process: "download",
    },
    svg: {
      compress: false,
    },
  },

  misc: {
    prefetch_links: "in_viewport",
  },
};
