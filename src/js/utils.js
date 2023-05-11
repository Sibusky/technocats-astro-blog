export const slugify = (text) => {
  return text
    .toString()
    .toLocaleLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-UK", {
    timeZone: "UTC",
  });
};

export function formatBlogPosts(posts, {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
  } = {}) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;
    // filterOutDrafts if true
    if(filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if true
    if(filterOutFuturePosts && new Date(date) > new Date()) return acc;

    // add post to acc
    acc.push(post)

    return acc;
  }, [])

  // sotrByDate or randomize
  if(sortByDate) {
    filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  } else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  // limit if number is passed
  if(typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;

}