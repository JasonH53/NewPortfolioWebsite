// Shared helpers for the blog list and post pages.

const BLOG_DIR = "/blog/blogs/";

// blog/blogs/index.json lists each post: { file, title, date, summary, image }
async function loadPosts() {
  const res = await fetch(BLOG_DIR + "index.json", { cache: "no-cache" });
  if (!res.ok) throw new Error("Could not load blog/blogs/index.json");
  const posts = await res.json();
  for (const post of posts) post.slug = post.file.replace(/\.md$/i, "");
  return posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

function resolvePath(path) {
  if (!path || /^([a-z]+:|\/|#)/i.test(path)) return path;
  return BLOG_DIR + path;
}

// e.g. "2026-10-28" -> "October 28, 2026"
function formatDate(date) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!m) return date;
  return new Date(m[1], m[2] - 1, m[3]).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
