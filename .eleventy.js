module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/assets/files": "assets/files" });

  eleventyConfig.addFilter("findAlt", function (projects, slug) {
    return (projects || []).find((p) => p.slug === slug);
  });

  eleventyConfig.addFilter("pad2", function (n) {
    return String(n).padStart(2, "0");
  });

  eleventyConfig.setServerOptions({
    domDiff: true,
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "txt"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
