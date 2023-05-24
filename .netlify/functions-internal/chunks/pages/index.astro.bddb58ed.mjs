import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../astro.f03c80ea.mjs';
import { a as formatBlogPosts, $ as $$Link, b as $$MainLayout } from './404.astro.bbf30d01.mjs';
import { $ as $$PostCard } from './_...author_.astro.4c759066.mjs';
import 'cookie';
import 'kleur/colors';
import 'slash';
import 'path-to-regexp';
import 'mime';
import 'html-escaper';
import 'string-width';
import 'svgo';
/* empty css                                     */import 'node:fs/promises';
import 'node:path';
import 'node:url';
import 'http-cache-semantics';
import 'node:os';
import 'image-size';
import 'magic-string';
import 'node:stream';

const $$Astro = createAstro("https://astro-tehnocats.netlify.app/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const allPosts = await Astro2.glob(/* #__PURE__ */ Object.assign({"./blog/aleksei-smirnov.md": () => import('./aleksei-smirnov.md.3366715d.mjs').then(n => n._),"./blog/alexander-semenov.md": () => import('./alexander-semenov.md.bf9941b1.mjs').then(n => n._),"./blog/dmitry-mytnikau.md": () => import('./dmitry-mytnikau.md.cecad0c7.mjs').then(n => n._),"./blog/elizaveta-obrezkova.md": () => import('./elizaveta-obrezkova.md.10467632.mjs').then(n => n._),"./blog/maria-kikot.md": () => import('./maria-kikot.md.b81238e8.mjs').then(n => n._)}), () => "./blog/*.md");
  const formattedPosts = formatBlogPosts(allPosts, {
    limit: 3
  });
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "TehnoCats", "description": "TehnoCats internship in Birka company" }, { "default": ($$result2) => renderTemplate`

  ${maybeRenderHead($$result2)}<section class="container about" aria-label="About TehnoCats">
    <img src="/images/tehnoCats.jpg" alt="TehnoCats" width="200" height="330">
    <div class="content">
      <h1 class="h1">TehnoCats</h1>
      <p>This page provides information about TehnoCats</p>
      ${renderComponent($$result2, "Link", $$Link, { "href": "/blog/", "text": "Cats", "style": "secondary" })}
    </div>
  </section>

  <section class="container" aria-label="New Blog Posts">
    <h2 class="h1">New Blog Posts</h2>
    <div class="post-container">
      ${formattedPosts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "frontmatter": post.frontmatter, "url": post.url, "tagType": "h3" })}`)}
    </div>
  </section>

` })}`;
}, "D:/webWork/intern/projects/birka/src/pages/index.astro");

const $$file = "D:/webWork/intern/projects/birka/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
