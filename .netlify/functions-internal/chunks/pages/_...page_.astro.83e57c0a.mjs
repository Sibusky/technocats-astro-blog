import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderComponent } from '../astro.f03c80ea.mjs';
import { a as formatBlogPosts, s as slugify, $ as $$Link, b as $$MainLayout } from './404.astro.929bd0d6.mjs';
import { $ as $$PostCard } from './_...author_.astro.91ae8ad3.mjs';

const $$Astro$2 = createAstro("https://astro-tehnocats.netlify.app/");
const $$CategoryCloud = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CategoryCloud;
  const allPosts = await Astro2.glob(/* #__PURE__ */ Object.assign({"../pages/blog/aleksei-smirnov.md": () => import('./aleksei-smirnov.md.63ed0e84.mjs').then(n => n._),"../pages/blog/alexander-semenov.md": () => import('./alexander-semenov.md.3e65c1cf.mjs').then(n => n._),"../pages/blog/dmitry-mytnikau.md": () => import('./dmitry-mytnikau.md.542b27be.mjs').then(n => n._),"../pages/blog/elizaveta-obrezkova.md": () => import('./elizaveta-obrezkova.md.167f415c.mjs').then(n => n._),"../pages/blog/maria-kikot.md": () => import('./maria-kikot.md.5ce6b339.mjs').then(n => n._)}), () => "../pages/blog/*.md");
  const formattedPosts = formatBlogPosts(allPosts, {
    filterOutDrafts: false,
    filterOutFuturePosts: false,
    sortByDate: true,
    limit: 6
  });
  const allCategories = formattedPosts.map((cat) => cat.frontmatter.category.toLowerCase()).flat();
  const processedCats = allCategories.reduce((acc, category) => {
    const value = acc[category] || 0;
    return {
      ...acc,
      [category]: value + 1
    };
  }, {});
  const { showCount } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<ul class="categories">
  ${Object.entries(processedCats).map(([key, val]) => renderTemplate`<li>
        <a class="badge"${addAttribute(`/category/${slugify(key)}/`, "href")}>${key} ${showCount && `(${val})`}</a>
      </li>`)}
</ul>`;
}, "/Users/Sibusky/dev/birka/src/components/CategoryCloud.astro");

const $$Astro$1 = createAstro("https://astro-tehnocats.netlify.app/");
const $$Pagination = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { prevUrl, nextUrl } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<nav aria-label="Blog pages">
  ${prevUrl && renderTemplate`${renderComponent($$result, "Link", $$Link, { "text": "Previous", "href": prevUrl, "style": "primary", "borderVisible": true, "isFilled": false, "icon": {
    name: "tabler:arrow-big-left-line",
    side: "left"
  } })}`}
  ${nextUrl && renderTemplate`${renderComponent($$result, "Link", $$Link, { "text": "Next", "href": nextUrl, "style": "primary", "borderVisible": true, "isFilled": false, "icon": {
    name: "tabler:arrow-big-right-line",
    side: "right"
  } })}`}
</nav>`;
}, "/Users/Sibusky/dev/birka/src/components/Pagination.astro");

const $$Astro = createAstro("https://astro-tehnocats.netlify.app/");
const Astro = $$Astro;
async function getStaticPaths({ paginate }) {
  const allPosts = await Astro.glob(/* #__PURE__ */ Object.assign({"./aleksei-smirnov.md": () => import('./aleksei-smirnov.md.63ed0e84.mjs').then(n => n._),"./alexander-semenov.md": () => import('./alexander-semenov.md.3e65c1cf.mjs').then(n => n._),"./dmitry-mytnikau.md": () => import('./dmitry-mytnikau.md.542b27be.mjs').then(n => n._),"./elizaveta-obrezkova.md": () => import('./elizaveta-obrezkova.md.167f415c.mjs').then(n => n._),"./maria-kikot.md": () => import('./maria-kikot.md.5ce6b339.mjs').then(n => n._)}), () => "./*.md");
  const formattedPosts = formatBlogPosts(allPosts, {
    filterOutDrafts: false,
    filterOutFuturePosts: false,
    sortByDate: true,
    limit: 6
  });
  return paginate(formattedPosts, {
    pageSize: 3
  });
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "TehnoCats", "description": "TehnoCats internship in Birka company" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<section class="container" aria-label="New Blog Posts">
      <h1 class="h1">All Blog Posts</h1>
      <div class="post-container">
        ${page.data.map(
    (post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "frontmatter": post.frontmatter, "url": post.url, "tagType": "h2" })}`
  )}
      </div>
      ${renderComponent($$result2, "Pagination", $$Pagination, { "prevUrl": page.url.prev, "nextUrl": page.url.next })}
  </section>
   <aside class="container" aria-label="Blog categories">
    <h2 class="h3">Blog Categories</h2>
    ${renderComponent($$result2, "CategoryCloud", $$CategoryCloud, { "showCount": true })}
  </aside>
` })}`;
}, "/Users/Sibusky/dev/birka/src/pages/blog/[...page].astro");

const $$file = "/Users/Sibusky/dev/birka/src/pages/blog/[...page].astro";
const $$url = "/blog/[...page]";

const ____page_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$CategoryCloud as $, ____page_ as _ };
