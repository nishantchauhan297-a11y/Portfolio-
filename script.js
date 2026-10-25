(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  var NAME = (PROFILE.name || "").trim() || "Your Name";
  var GH_USER = (PROFILE.github || "").trim();
  var GH_URL = GH_USER ? "https://github.com/" + GH_USER : "";

  function el(tag, props, children) {
    var n = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === "text") n.textContent = props[k];
      else n.setAttribute(k, props[k]);
    });
    (children || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }

  /* ---------- Personal details (Task 1) ---------- */
  function renderProfile() {
    document.title = NAME + " | Portfolio";
    $("brandName").textContent = NAME;
    $("heroName").textContent = NAME;
    $("heroRole").textContent = PROFILE.role || "";
    $("heroTagline").textContent = PROFILE.tagline || "";
    $("aboutIntro").textContent = PROFILE.intro || "";
    $("aboutLocation").textContent = PROFILE.location ? "Based in " + PROFILE.location : "";
    $("footerText").textContent = "\u00A9 " + new Date().getFullYear() + " " + NAME + ". All rights reserved.";

    var gh = $("heroGithub");
    if (GH_URL) gh.href = GH_URL; else gh.hidden = true;

    // Profile photo with initials fallback if the image file is missing
    var img = $("profileImg"), fb = $("avatarFallback");
    var initials = NAME.split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join("").toUpperCase();
    fb.textContent = initials;
    img.onerror = function () { img.hidden = true; fb.hidden = false; };
    img.src = PROFILE.photo;

    var edu = $("educationList");
    (PROFILE.education || []).forEach(function (e) {
      edu.appendChild(el("li", {}, [
        el("strong", { text: e.title }),
        el("span", { class: "muted", text: [e.place, e.years].filter(Boolean).join(" \u00B7 ") })
      ]));
    });
    if (!edu.children.length) edu.parentElement.hidden = true;

    var sk = $("skillList");
    (PROFILE.skills || []).forEach(function (s) { sk.appendChild(el("li", { text: s })); });

    var c = $("contactList");
    function row(label, value, href) {
      var li = el("li", {}, [el("span", { text: label })]);
      li.appendChild(href ? el("a", { href: href, target: href.indexOf("mailto:") === 0 ? "_self" : "_blank", rel: "noopener", text: value }) : document.createTextNode(value));
      c.appendChild(li);
    }
    if (PROFILE.email) row("Email", PROFILE.email, "mailto:" + PROFILE.email);
    if (GH_URL) row("GitHub", "github.com/" + GH_USER, GH_URL);
    if (PROFILE.linkedin) row("LinkedIn", PROFILE.linkedin, PROFILE.linkedin);
    if (PROFILE.phone) row("Phone", PROFILE.phone, "tel:" + PROFILE.phone.replace(/\s+/g, ""));
    if (PROFILE.location) row("Location", PROFILE.location);
  }

  /* ---------- Projects, search and filter (Tasks 2 & 3) ---------- */
  var activeTag = "All";
  var query = "";

  function repoUrl(p) { return GH_URL ? GH_URL + "/" + p.repo : ""; }

  function buildCard(p) {
    var tags = el("div", { class: "tags" });
    p.tech.forEach(function (t) { tags.appendChild(el("span", { class: "tag", text: t })); });

    var links = el("div", { class: "card-links" });
    var repo = repoUrl(p);
    if (repo) links.appendChild(el("a", { class: "btn", href: repo, target: "_blank", rel: "noopener", text: "GitHub Repo" }));
    if (p.live) links.appendChild(el("a", { class: "btn primary", href: p.live, target: "_blank", rel: "noopener", text: "Live App" }));

    return el("article", { class: "card" }, [
      el("h3", { text: p.title }),
      el("p", { text: p.description }),
      tags,
      links
    ]);
  }

  function matches(p) {
    var inTag = activeTag === "All" || p.tech.some(function (t) { return t.toLowerCase() === activeTag.toLowerCase(); });
    if (!inTag) return false;
    var q = query.trim().toLowerCase();
    if (!q) return true;
    var haystack = (p.title + " " + p.description + " " + p.tech.join(" ")).toLowerCase();
    return q.split(/\s+/).every(function (w) { return haystack.indexOf(w) !== -1; });
  }

  function renderProjects() {
    var grid = $("projectGrid");
    grid.textContent = "";
    var shown = PROJECTS.filter(matches);
    shown.forEach(function (p) { grid.appendChild(buildCard(p)); });
    $("noResults").hidden = shown.length > 0;
    $("resultCount").textContent = "Showing " + shown.length + " of " + PROJECTS.length + " projects";
  }

  function renderFilters() {
    var seen = {}, tags = ["All"];
    PROJECTS.forEach(function (p) {
      p.tech.forEach(function (t) {
        var k = t.toLowerCase();
        if (!seen[k]) { seen[k] = true; tags.push(t); }
      });
    });
    var bar = $("filterBar");
    tags.forEach(function (t) {
      var b = el("button", { type: "button", class: "filter", "aria-pressed": String(t === activeTag), text: t });
      b.addEventListener("click", function () {
        activeTag = t;
        Array.prototype.forEach.call(bar.children, function (x) {
          x.setAttribute("aria-pressed", String(x.textContent === activeTag));
        });
        renderProjects();
      });
      bar.appendChild(b);
    });
  }

  /* ---------- Light / dark mode (Task 3) ---------- */
  function applyThemeUI() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    $("themeIcon").innerHTML = dark ? "&#9728;" : "&#9790;";
    $("themeBtn").setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  $("themeBtn").addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    applyThemeUI();
  });

  /* ---------- Mobile menu + active nav link ---------- */
  var menuBtn = $("menuBtn"), links = $("navLinks");
  menuBtn.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", function () {
    links.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });

  if ("IntersectionObserver" in window) {
    var anchors = Array.prototype.slice.call(links.querySelectorAll("a"));
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          anchors.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("main section").forEach(function (s) { io.observe(s); });
  }

  /* ---------- Init ---------- */
  $("searchInput").addEventListener("input", function (e) { query = e.target.value; renderProjects(); });
  renderProfile();
  renderFilters();
  renderProjects();
  applyThemeUI();

  if (!PROFILE.name || !PROFILE.github || !PROFILE.email) {
    console.warn("Portfolio: fill in name, github and email in data.js before submitting.");
  }
})();
