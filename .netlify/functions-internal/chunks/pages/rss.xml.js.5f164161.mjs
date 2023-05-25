import { _ as __vite_glob_0_0 } from './aleksei-smirnov.md.63ed0e84.mjs';
import { _ as __vite_glob_0_1 } from './alexander-semenov.md.3e65c1cf.mjs';
import { _ as __vite_glob_0_2 } from './dmitry-mytnikau.md.542b27be.mjs';
import { _ as __vite_glob_0_3 } from './elizaveta-obrezkova.md.167f415c.mjs';
import { _ as __vite_glob_0_4 } from './maria-kikot.md.5ce6b339.mjs';
import rss from '@astrojs/rss';
import { a as formatBlogPosts } from './404.astro.929bd0d6.mjs';
import '../astro.f03c80ea.mjs';
import 'cookie';
import 'kleur/colors';
import 'slash';
import 'path-to-regexp';
import 'mime';
import 'html-escaper';
import 'string-width';
import './_...author_.astro.91ae8ad3.mjs';
import 'node:fs/promises';
import 'node:path';
import 'node:url';
import 'http-cache-semantics';
import 'node:os';
import 'image-size';
import 'magic-string';
import 'node:stream';
import './_...page_.astro.83e57c0a.mjs';
import 'react';
import 'react/jsx-runtime';
import 'firebase/firestore';
import 'firebase/app';
import 'svgo';
/* empty css                                     */
const postImportResult = /* #__PURE__ */ Object.assign({"./blog/aleksei-smirnov.md": __vite_glob_0_0,"./blog/alexander-semenov.md": __vite_glob_0_1,"./blog/dmitry-mytnikau.md": __vite_glob_0_2,"./blog/elizaveta-obrezkova.md": __vite_glob_0_3,"./blog/maria-kikot.md": __vite_glob_0_4});
const posts = formatBlogPosts(Object.values(postImportResult));

const get = () =>
  rss({
    stylesheet: "/rss/styles.xsl",
    title: "My Astro Blog",
    description: "A humble Astronaut’s guide to the stars",
    site: "https://astro-tehnocats.netlify.app/",
    items: posts.map((post) => ({
      link: post.url,
      title: post.frontmatter.title,
      pubDate: post.frontmatter.date,
      description: post.frontmatter.description,
      customData: `
      <author>${post.frontmatter.author}</author>
    `,
    })),
  });

export { get };
