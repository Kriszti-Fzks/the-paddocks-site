# The Paddocks Website

A modern, fully responsive website for The Paddocks—an architectural automotive luxury destination.

## Project Structure

```
the-paddocks-site/
├── index.html              # Single page with all sections (hero, experience, gallery, calendar, resources, contact)
├── css/
│   └── styles.css          # All shared styles, typography, colors
├── assets/
│   ├── Burgundy_logo.svg
│   ├── white_logo.svg
│   ├── Hero_image.png
│   ├── Experience_image*.png
│   ├── Gallery_*.png
│   ├── Calander-image.png
│   └── Resources_visual.png
├── netlify.toml            # Netlify deployment config
└── README.md              # This file
```

## Design System

### Colors
- **Primary Red**: `#84111c` (The Paddocks Red)
- **Dark Red**: `#681018` (Hover state)
- **Text Dark**: `#111111` (Headlines)
- **Text Graphite**: `#3a3a3c` (Body text)
- **Background Light**: `#f7f5f2`
- **Background Page**: `#f8f7f4`
- **White**: `#ffffff`

### Typography
- **Display Font**: Racing Sans One (headlines, section labels)
- **Body Font**: Montserrat (400, 500, 600 weights)

### Responsive Breakpoints
- Desktop: 980px and up (full navigation)
- Tablet: 700px - 980px (mobile menu, adjusted spacing)
- Mobile: Below 700px (optimized for small screens)

## Section Details (All in index.html)

The single page includes 8 sections with smooth anchor link navigation:

### #home - Hero Section
- Full-screen hero section with background image
- Split headline with accent color on last line
- Two CTAs: Primary and secondary buttons

### #experience - Experience Section
- Section heading with description
- Horizontal scrollable image carousel (5 images)
- 5-column feature cards layout
- Primary CTA button

### #gallery - Gallery Section
- Responsive masonry grid of 6 images
- Centered headline
- Large CTA text
- Primary button

### #calendar - Events Calendar Section
- Monthly calendar widget (June 2025)
- Right-side lifestyle image
- Newsletter signup section
- Email input + Subscribe button

### #promo-video - Promo Video Section
- Responsive video player container
- Placeholder for YouTube/Vimeo embed
- Call-to-action to early interest list

### #resources - Resources Section
- Three resource cards (Floor Plans, Pricing, Documents)
- Center floor plan visualization image
- "Questions?" contact section
- Email + CTA button

### #contact - Contact Section
- Two-column layout: form on left, contact info on right
- Contact form (5 fields)
- Team contact information with icons
- Early interest signup section
- Social media links (Instagram, Facebook)

### #early-interest - Early Interest Section
- Simple form: Name, Email, Phone
- Clean, focused design
- "Join The List" button

## Deployment to Netlify

### Option 1: Connect Git Repository (Recommended)

1. Initialize a git repository:
   ```bash
   cd the-paddocks-site
   git init
   git add .
   git commit -m "Initial commit: Complete Paddocks website"
   ```

2. Create a repository on GitHub

3. Push to GitHub:
   ```bash
   git remote add origin https://github.com/yourusername/the-paddocks-site.git
   git branch -M main
   git push -u origin main
   ```

4. Go to [netlify.com](https://netlify.com) and connect your GitHub repository
5. Netlify will automatically deploy whenever you push changes

### Option 2: Direct Upload

1. Drag and drop the `the-paddocks-site` folder into [Netlify](https://app.netlify.com/drop)
2. Your site will be live immediately

### Option 3: Netlify CLI

```bash
npm install -g netlify-cli
cd the-paddocks-site
netlify deploy --prod
```

## Making Updates

All sections are in `index.html`. Edit directly and Netlify will auto-deploy.

### Update Navigation Links
Edit the `<nav class="desktop-nav">` section at the top of `index.html`. Links use anchor navigation:
- `#home` - Hero
- `#experience` - Experience
- `#gallery` - Gallery
- `#calendar` - Events Calendar
- `#promo-video` - Promo Video
- `#resources` - Resources
- `#contact` - Contact
- `#early-interest` - Early Interest List

### Replace Placeholder Content

**Promo Video** (search for "video-placeholder")
- Replace the `<div class="video-placeholder">` with your video embed:
  ```html
  <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
          title="The Paddocks Promo"></iframe>
  ```

**Resources** (search for "#resources")
- Update the `href="#"` links in resource items to actual URLs
- Replace `assets/Resources_visual.png` with your floor plan image

**Contact Forms** (Contact & Early Interest sections)
- Update form `onsubmit` handlers to point to your backend service
- Integrate with form submission service (Formspree, Basin, Netlify Forms, etc.)

**Contact Information** (search for "#contact")
- Update phone number: `(949) XXX-XXXX`
- Update email: `info@thepaddocks.com`
- Update office hours and location

## Local Development

Serve locally to test before deployment:

```bash
cd the-paddocks-site
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Notes

- All assets are optimized images
- CSS is minified and loaded once
- No external dependencies (pure HTML/CSS/JavaScript)
- Mobile-first responsive design
- Smooth scrolling and transitions
- Accessibility-first approach (ARIA labels, semantic HTML)

## Customization Tips

1. **Change brand color**: Update `--paddocks-red` in `css/styles.css`
2. **Adjust spacing**: Update `--page-padding` and section padding values
3. **Modify typography**: Update font sizes in media queries or base sizes
4. **Add pages**: Copy an existing page template and adjust the content
5. **Update images**: Replace files in `assets/` folder with same filenames

## Support

For deployment questions, visit [Netlify Docs](https://docs.netlify.com/)
For design questions, reference the PDF specs provided.

---

**Built with** ❤️ for The Paddocks
