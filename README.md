# Portfolio
[![Netlify Status](https://api.netlify.com/api/v1/badges/9456591a-b20f-4375-a2dd-7590e95f6154/deploy-status)](https://app.netlify.com/sites/davebitter/deploys)

## Getting started
Portfolio was bootstrapped with [Next.js](https://nextjs.org/docs/getting-started). Please, read the docs to get up to speed with how pages, routing, server-side functions and more works.

### Run development environment
`yarn dev` or `npm run dev` - starts the development environment with auto reloading and all that good stuff.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Scripts
Besides the development script, there are many more scripts set up:

* `build` - Creates build
* `export` - Creates export
* `deploy` - Creates build and export
* `generate` - Starts interactive CLI tool to generate a component or utility with everything that is needed
* `storybook` - Starts the development environment for storybook
* `storybook:build` - Builds the storybook for production to be hosted by you
* `test` - Runs the Jest and Enzyme test suite
* `test:watch` - Runs the Jest and Enzyme test suite in watch mode
* `test:coverage` - Runs the Jest and Enzyme test suite and shows test coverage
* `eslint` - Runs ESLint for all TypeScript files
* `stylelint` - Runs Stylelint for all SCSS files

### Tech stack
#### Next.js
Portfolio uses [Next.js](https://nextjs.org/)  to
* provide SSR and SSG [React.js](https://reactjs.org/). Pages are automatically optimised to deliver the best experience.
* handle routing
* generate builds
* and more

#### TypeScript
Portfolio used [TypeScript](https://www.typescriptlang.org/) for static checking and documentation. You can view the Typescript config in [./tsconfig.json](./tsconfig.json).

#### Jest and Enzyme
Portfolio uses Jest and Enzyme as the testing suite. All tests can be found in the component and utilities folders with `.test.` postfix. As you may notice, we don't import Jest and Enzyme in the test files. Some things are setup in `config/tests`. Next to that, mock content and components can be found in `config/tests/mocks`.

#### Storybook
Portfolio uses [Storybook](https://storybook.js.org/) for showcasing components. Storybook has its own webpack configuration. You can find this configuration in `.storybook/webpack.config.js` together with all other Storybook specific items.

#### Husky, ESLint, StyleLint and LintStaged
Portfolio uses Husky to automatically run ESLint, Stylelint, LintStaged and the test suite for every commit. This is done by using the `precommit` script found in `package.json`. Never run `--no-verify` as you don't want to ignore these settings. If you have an issue with the config, please update the config file of that linter accordingly.

#### Netflify (CI/CD)
Portfolio uses [Netlify](https://www.netlify.com/) (♥️) to build, deploy and optimise. Every push to the master branch will trigger the deploy pipeline.

#### Netlify CMS
Portfolio uses Netlify CMS. All content is stored as MarkDown in `content/` and directly loaded throughout the application. You can alter the content here and make a new deploy to have it relfect on the live site. The data structure configuration can be found in [./public/admin/config.yml](./public/admin/config.yml). The GUI can be accessed at `/admin/index.html` on both the local and live version. Netlify Identity Service is used to authenticate.
