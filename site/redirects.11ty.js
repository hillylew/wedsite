export default class Redirects {
  data() {
    return {
      permalink: "_redirects",
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    let content = "";

    for (const redirect of data.redirects) {
      content += `${redirect.from} ${redirect.to} ${redirect.type}\n`;
    }

    return content;
  }
}
