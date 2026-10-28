// Renders the post list on blog/index.html from blog/blogs/index.json.

const list = document.getElementById("posts");

loadPosts()
  .then((posts) => {
    if (!posts.length) {
      list.innerHTML = '<li class="muted">Nothing here yet.</li>';
      return;
    }
    for (const post of posts) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "/blog/post.html?p=" + encodeURIComponent(post.slug);

      const text = document.createElement("div");
      const title = document.createElement("span");
      title.className = "post-title";
      title.textContent = post.title;
      const date = document.createElement("span");
      date.className = "post-date";
      date.textContent = formatDate(post.date);
      text.append(title, date);
      if (post.summary) {
        const summary = document.createElement("span");
        summary.className = "post-summary";
        summary.textContent = post.summary;
        text.append(summary);
      }
      a.append(text);

      if (post.image) {
        const img = document.createElement("img");
        img.className = "post-thumb";
        img.src = resolvePath(post.image);
        img.alt = "";
        img.loading = "lazy";
        a.append(img);
      }

      li.append(a);
      list.append(li);
    }
  })
  .catch((err) => {
    list.innerHTML = '<li class="muted"></li>';
    list.firstChild.textContent = err.message;
  });
