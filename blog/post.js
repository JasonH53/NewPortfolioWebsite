// Renders a single post on blog/post.html?p=<slug>.

const slug = new URLSearchParams(location.search).get("p");
const content = document.getElementById("content");

async function render() {
  const post = (await loadPosts()).find((p) => p.slug === slug);
  if (!post) throw new Error("Post not found.");

  document.title = post.title + " | Jason Hon";
  document.getElementById("title").textContent = post.title;
  document.getElementById("date").textContent = formatDate(post.date);

  const res = await fetch(BLOG_DIR + encodeURIComponent(post.file), { cache: "no-cache" });
  if (!res.ok) throw new Error("Could not load " + post.file);
  content.innerHTML = marked.parse(await res.text());

  // Relative image/link paths inside the markdown point into blog/blogs/
  content.querySelectorAll("img[src]").forEach((el) => (el.src = resolvePath(el.getAttribute("src"))));
  content.querySelectorAll("a[href]").forEach((el) => (el.href = resolvePath(el.getAttribute("href"))));
}

render().catch((err) => {
  content.innerHTML = '<p class="muted"></p>';
  content.firstChild.textContent = err.message;
});
