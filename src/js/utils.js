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
  let today = new Date();
  let yesterday = new Date();
  let dateValue = new Date(date);

  const getCustomFormatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join(".");
  };

  const dropHMS = (date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0, 0);
  };

  yesterday.setDate(today.getDate() - 1);

  dropHMS(today);
  dropHMS(yesterday);
  dropHMS(dateValue);

  if (date) {
    if (today.getTime() === dateValue.getTime()) {
      return "Сегодня";
    } else if (yesterday.getTime() === dateValue.getTime()) {
      return "Вчера";
    } else {
      return getCustomFormatDate(date);
    }
  }
};

export function formatBlogPosts(
  posts,
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
  } = {}
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;
    // filterOutDrafts if true
    if (filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    // add post to acc
    acc.push(post);

    return acc;
  }, []);

  // sotrByDate or randomize
  if (sortByDate) {
    filteredPosts.sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;
}
