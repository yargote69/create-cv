# Resume Builder

A modern resume builder application built with Astro, React, and TailwindCSS. Create professional resumes with a beautiful and intuitive interface.

## 🚀 Features

- Modern and responsive UI built with TailwindCSS
- React components for interactive elements
- PDF export functionality using html2canvas and jsPDF
- Form validation with Zod
- TypeScript support for better development experience
- Beautiful icons with Heroicons

## 🛠️ Tech Stack

- [Astro](https://astro.build) - Static Site Generator
- [React](https://reactjs.org) - UI Components
- [TailwindCSS](https://tailwindcss.com) - Styling
- [TypeScript](https://www.typescriptlang.org) - Type Safety
- [Zod](https://zod.dev) - Schema Validation
- [html2canvas](https://html2canvas.hertzen.com) - HTML to Canvas
- [jsPDF](https://github.com/parallax/jsPDF) - PDF Generation

## 🚀 Project Structure

```text
/
├── public/          # Static assets
├── src/
│   ├── components/  # React and Astro components
│   ├── layouts/     # Page layouts
│   ├── pages/       # Application pages
│   ├── styles/      # Global styles
│   └── env.d.ts     # TypeScript declarations
├── astro.config.mjs # Astro configuration
├── biome.json       # Biome (formatter/linter) configuration
├── package.json     # Project dependencies
└── tsconfig.json    # TypeScript configuration
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🧪 Development

This project uses:
- Biome for code formatting and linting
- TypeScript for type safety
- Playwright for testing

## 📝 License

This project is private and not licensed for public use.

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
