import { _ as __vite_glob_0_0 } from './aleksei-smirnov.md.2453da39.mjs';
import { _ as __vite_glob_0_1 } from './alexander-semenov.md.3a38e63a.mjs';
import { _ as __vite_glob_0_2 } from './dmitry-mytnikau.md.1a9f8a13.mjs';
import { _ as __vite_glob_0_3 } from './elizaveta-obrezkova.md.eb31b809.mjs';
import { _ as __vite_glob_0_4 } from './igor-teplostanski.md.ae4901cc.mjs';
import { _ as __vite_glob_0_5 } from './maria-kikot.md.b1d9ec8a.mjs';
import rss from '@astrojs/rss';
import { a as formatBlogPosts } from './404.astro.5affa770.mjs';
import '../astro.f03c80ea.mjs';
import 'cookie';
import 'kleur/colors';
import 'slash';
import 'path-to-regexp';
import 'mime';
import 'html-escaper';
import 'string-width';
import './_...author_.astro.db676f95.mjs';
import 'node:fs/promises';
import 'node:path';
import 'node:url';
import 'http-cache-semantics';
import 'node:os';
import 'image-size';
import 'magic-string';
import 'node:stream';
import './_...page_.astro.d244b4f3.mjs';
import 'react';
import 'react-google-recaptcha';
import 'react/jsx-runtime';
import 'firebase/firestore';
import 'firebase/app';
import 'svgo';
/* empty css                                     */
const postImportResult = /* #__PURE__ */ Object.assign({"./blog/aleksei-smirnov.md": __vite_glob_0_0,"./blog/alexander-semenov.md": __vite_glob_0_1,"./blog/dmitry-mytnikau.md": __vite_glob_0_2,"./blog/elizaveta-obrezkova.md": __vite_glob_0_3,"./blog/igor-teplostanski.md": __vite_glob_0_4,"./blog/maria-kikot.md": __vite_glob_0_5});
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
