# The Paddocks — Updates design draft

Files: `updates.html`, `updates-data.js`, `updates.js`. Standalone, no build step, no repository edits, no publishing. Burgundy #84111c, Montserrat/Racing Sans One typography, white/paper backgrounds, responsive layout. Branding references: existing index.html and car-events.html (read only). Header links target existing home-page anchors. The simple footer references home/contact; it does not duplicate an unavailable shared footer component.

## Preview / integration
Place these three files beside the existing site's `index.html` when approved. Existing `assets/web/logo.png` and `assets/web/hero.webp` are referenced relative to that root; the hero is labeled **example poster**, never actual update media. The draft folder intentionally does not copy those assets. To preview locally, serve a staging directory containing a COPY of the original public assets/index.html and these files (do not edit the original). The parent may integrate into a test site after authorization. Existing anchor links and images require that site context. No links to invented posts or videos exist.

The preview notice and `noindex,nofollow` are intentional. Before an eventual production release, confirm real content, remove the preview notice/placeholder notes and robots directive, and set the site's final title/metadata. No analytics or backend is added. Google Fonts is optional: system fonts are the fallback.

## Edit content
Edit only `window.PADDOCKS_UPDATE` in updates-data.js. Use plain strings (rendered as text, never HTML). Keep `title: "Update"`, or add an approved title; set date to YYYY-MM-DD. Invalid dates remain visibly unfilled. Date-only values are formatted in UTC intentionally so no viewer timezone changes the calendar date. Write the short description of changes since the last update. Leave unknown fields empty; do not invent progress.

### Video
- `mode: "direct"`: set `url` to a publicly accessible HTTPS .mp4/.webm (query strings allowed) or `assets/video.mp4`. Controls are native, no autoplay. Optional actual `poster` and English WebVTT `captions` path. Host must serve the proper MIME type and support streaming/range requests. Cross-origin captions require appropriate CORS headers. Supply captions/transcript for spoken content before release.
- `mode: "embed"`: accepts standard YouTube watch, shorts, youtu.be, embed links, or numeric Vimeo/video links. Only exact YouTube/Vimeo hosts pass the allowlist; embed URLs are rebuilt, query parameters discarded. YouTube uses privacy-enhanced domain. Private/unlisted Vimeo hash links need developer handling; use link mode instead. Provider privacy settings/CSP may block playback; test the actual URL.
- `mode: "link"`: any valid HTTPS storage/viewing page opens in a new tab, optionally behind a poster. This is the fallback for cloud storage without embedding support. Use a share/view link, not an account-only editor link.
- `fallbackUrl`: optional valid HTTPS hosting-page link displayed below direct/embed media. Add this when configuring a video so visitors can still watch if embedding fails. No fallback URL is fabricated.

No upload/admin button exists: upload video to the chosen host separately, then put its public link in the config. This page does not store videos, authenticate users or provide a CMS.

### Selected Instagram updates
`instagram` defaults to `[]`. Add only manually selected update posts, with `url`, your own approved `image` thumbnail path, descriptive `alt`, and `caption`. Only exact instagram.com /p/ or /reel/ URLs are accepted. No automatic feed, API token, scraping or unrelated posts. A local image is recommended; Instagram image URLs are often temporary. Each valid card opens its real post; without an image a text card is still visible. Test public access to every link. This intentionally avoids third-party Instagram embed scripts/cookies; thumbnails must be supplied separately.

## Validation / handoff
Run `node --check updates.js` and `node --check updates-data.js`. Test at mobile and desktop widths, keyboard navigation, date/content updates, direct/embed/link video modes and real selected posts. No actual media or post links were supplied, so provider playback cannot yet be verified. Host alongside the existing static site; no server dependencies. Retain existing index content and navigation unless separately approved.
