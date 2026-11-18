# ProjAnvil website

Static site for the ProjAnvil organization, deployed with GitHub Pages.

- Built with Astro. English at `/`, Chinese at `/zh/`.
- Content source: the public repositories under <https://github.com/orgs/ProjAnvil/repositories>.
- Product pages explain what each tool does, how to install it and how another agent can use it.
- Blog posts live in `src/content/blog/` as Markdown.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The output is written to `dist/`.

## Adding a blog post

Create one Markdown file per language. The file name becomes the URL slug and should match across languages.

```text
src/content/blog/en/my-post.md   -> /blog/my-post/
src/content/blog/zh/my-post.md   -> /zh/blog/my-post/
```

Required frontmatter:

```yaml
title: "Post title"
description: "Short summary"
pubDate: 2026-11-18
lang: en          # en or zh
tags: [topic]
```

## Updating a product page

Edit `src/data/projects.ts`. Each project carries both English and Chinese copy, install commands, quick start commands and agent integration notes.

## Deployment

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. The Pages source must be set to **GitHub Actions** in repository settings.
