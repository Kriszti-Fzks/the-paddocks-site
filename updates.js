"use strict";
(() => {
  const data = window.PADDOCKS_UPDATE || {};
  const $ = id => document.getElementById(id);
  // Only safe HTTPS URLs or same-directory/descendant asset paths; no script/data URLs.
  function safeURL(value, local = false) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value);
      return url.protocol === "https:" && !url.username && !url.password ? url : null;
    } catch (_) {
      if (local && /^(?:assets\/|docs\/)[a-zA-Z0-9_./% -]+$/.test(value) && !value.includes("..")) {
        return {href: value, pathname: value};
      }
      return null;
    }
  }
  function embedURL(value) {
    const url = safeURL(value);
    if (!url) return null;
    const host = url.hostname;
    let id;
    if (["youtube.com", "www.youtube.com", "m.youtube.com", "www.youtube-nocookie.com"].includes(host)) {
      id = url.pathname === "/watch" ? url.searchParams.get("v") : url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)\/?$/)?.[1];
    } else if (host === "youtu.be") id = url.pathname.slice(1);
    if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return "https://www.youtube-nocookie.com/embed/" + id;
    if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(host)) {
      id = url.pathname.match(/^\/(?:video\/)?([0-9]+)\/?$/)?.[1];
      if (id) return "https://player.vimeo.com/video/" + id;
    }
    return null;
  }
  function externalLink(url, label) {
    const a = document.createElement("a");
    a.href = url.href; a.target = "_blank"; a.rel = "noopener noreferrer";
    a.textContent = label + " (opens in a new tab)";
    return a;
  }
  if (data.title?.trim()) $("update-title").textContent = data.title;
  if (/^\d{4}-\d{2}-\d{2}$/.test(data.date || "")) {
    const date = new Date(data.date + "T12:00:00Z");
    if (!isNaN(date) && date.toISOString().slice(0, 10) === data.date) {
      const time = document.createElement("time"); time.dateTime = data.date;
      time.textContent = new Intl.DateTimeFormat("en-US", {month:"long",day:"numeric",year:"numeric",timeZone:"UTC"}).format(date);
      $("update-date").replaceChildren(time);
    }
  }
  if (data.description?.trim()) {
    $("description").textContent = data.description;
    $("description-note").hidden = true;
  }
  const v = data.video || {}, area = $("video-area");
  const source = safeURL(v.url, true), poster = safeURL(v.poster, true);
  let rendered = false;
  if (v.mode === "direct" && source && /\.(mp4|webm)$/i.test(source.pathname)) {
    const video = document.createElement("video");
    video.controls = true; video.preload = "metadata"; video.playsInline = true;
    video.setAttribute("aria-label", v.title || "Update video"); video.src = source.href;
    if (poster) video.poster = poster.href;
    const captions = safeURL(v.captions, true);
    if (captions) {
      const track = document.createElement("track"); track.kind = "captions"; track.srclang = "en";
      track.label = "English"; track.src = captions.href; track.default = true; video.append(track);
    }
    area.replaceChildren(video); rendered = true;
  } else if (v.mode === "embed" && embedURL(v.url)) {
    const frame = document.createElement("iframe");
    frame.src = embedURL(v.url); frame.title = v.title || "Update video";
    frame.loading = "lazy"; frame.allow = "fullscreen; picture-in-picture";
    frame.allowFullscreen = true; frame.referrerPolicy = "strict-origin-when-cross-origin";
    area.replaceChildren(frame); rendered = true;
  } else if (v.mode === "link" && safeURL(v.url)) {
    const link = externalLink(safeURL(v.url), "Watch update video");
    const label = document.createElement("span"); label.textContent = link.textContent;
    link.replaceChildren();
    if (poster) {const img = document.createElement("img"); img.src = poster.href; img.alt = ""; link.append(img);}
    link.append(label); area.replaceChildren(link); rendered = true;
  }
  if (rendered) {
    area.setAttribute("aria-label", v.title || "Update video");
    $("video-caption").textContent = v.mode === "link" ? "Video opens on its hosting site." : "Update video · If playback is unavailable, check hosting permissions.";
    const fallback = safeURL(v.fallbackUrl);
    if (fallback) $("video-caption").append(" ", externalLink(fallback, "Open video on hosting site"));
  } else if (v.url) {
    $("video-caption").textContent = "Preview placeholder: the video configuration is unsupported or invalid. Add a supported video or choose a valid HTTPS external link.";
  }
  let count = 0;
  for (const post of Array.isArray(data.instagram) ? data.instagram : []) {
    const url = safeURL(post.url);
    if (!url || !["instagram.com", "www.instagram.com"].includes(url.hostname) || !/^\/(?:p|reel)\/[a-zA-Z0-9_-]+\/?$/.test(url.pathname)) continue;
    const card = externalLink(url, post.caption || "View selected update on Instagram"); card.className = "post";
    const label = document.createElement("span"); label.textContent = card.textContent; card.replaceChildren();
    const image = safeURL(post.image, true);
    if (image) {const img = document.createElement("img"); img.src = image.href; img.alt = post.alt || "Selected Instagram update"; img.loading = "lazy"; card.append(img);}
    card.append(label); $("instagram-posts").append(card); count++;
  }
  $("instagram-empty").hidden = count > 0;
})();
