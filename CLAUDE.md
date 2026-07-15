# Claude Code Instructions for The Paddocks Site

## Auto-Push to GitHub

After editing any files in this repository, automatically commit and push changes to GitHub. This ensures Netlify auto-deploys the changes immediately without requiring manual GitHub edits.

### When to auto-push:
- After any Edit, Write, or file modification
- For HTML content changes
- For CSS/styling updates
- For image path updates
- For JavaScript modifications

### Commit message format:
- Use descriptive, single-line messages
- Start with action verb: "Update", "Fix", "Add", "Remove", "Refactor"
- Example: "Update logo sizing in header" or "Fix button text wrapping on mobile"

### Commands to run:
```bash
git add -A
git commit -m "<descriptive message>"
git push origin main
```

This allows me to make changes and deploy them automatically without manual intervention, matching the workflow from the agntai.app project.
