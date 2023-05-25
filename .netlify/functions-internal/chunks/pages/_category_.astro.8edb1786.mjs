import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, b as addAttribute } from '../astro.f03c80ea.mjs';
import { s as slugify, a as formatBlogPosts, b as $$MainLayout } from './404.astro.929bd0d6.mjs';
import { $ as $$PostCard } from './_...author_.astro.91ae8ad3.mjs';
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
async function getStaticPaths() {
  return [
    {
      params: { category: slugify("Changing the career") },
      props: { name: "Changing the career" }
    },
    {
      params: { category: slugify("General") },
      props: { name: "General" }
    },
    {
      params: { category: slugify("Astro") },
      props: { name: "Astro" }
    },
    {
      params: { category: slugify("React") },
      props: { name: "React" }
    }
  ];
}
const $$category = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$category;
  const { category } = Astro2.params;
  const { name } = Astro2.props;
  const allPosts = await Astro2.glob(/* #__PURE__ */ Object.assign({"../blog/aleksei-smirnov.md": () => import('./aleksei-smirnov.md.63ed0e84.mjs').then(n => n._),"../blog/alexander-semenov.md": () => import('./alexander-semenov.md.3e65c1cf.mjs').then(n => n._),"../blog/dmitry-mytnikau.md": () => import('./dmitry-mytnikau.md.542b27be.mjs').then(n => n._),"../blog/elizaveta-obrezkova.md": () => import('./elizaveta-obrezkova.md.167f415c.mjs').then(n => n._),"../blog/maria-kikot.md": () => import('./maria-kikot.md.5ce6b339.mjs').then(n => n._)}), () => "../blog/*.md");
  const formattedPosts = formatBlogPosts(allPosts);
  const catPosts = formattedPosts.filter((post) => slugify(post.frontmatter.category) === category);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": name }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<section class="container"${addAttribute(`Posts about ${name}`, "aria-label")}>
      <h1 class="h1">Posts about <span>${name}</span></h1>
      <div class="post-container">
        ${catPosts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "frontmatter": post.frontmatter, "url": post.url, "tagType": "h2" })}`)}
      </div>
  </section>
` })}`;
}, "/Users/Sibusky/dev/birka/src/pages/category/[category].astro");

const $$file = "/Users/Sibusky/dev/birka/src/pages/category/[category].astro";
const $$url = "/category/[category]";

export { $$category as default, $$file as file, getStaticPaths, $$url as url };
