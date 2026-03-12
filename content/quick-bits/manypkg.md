---
type: quick-bits
date: 2022-06-01T00:00:00.000Z
slug: manypkg
tags:
  - front-end
intro: >-
  When building a component library as a mono-repo, you need to keep internal
  and external dependencies up-to-date between packages. You could do this
  manually once in a while, but there is a better way. Let’s have a look at
  Manypkg!
teaserCopy: >-
  When building a component library as a mono-repo, you need to keep internal
  and external dependencies up-to-date between packages. You could do this
  manually once in a while, but there is a better way. Let’s have a look at
  Manypkg!
teaserImage: /img/quick-bits/mono-repo.webp
title: Keeping dependencies in sync in your mono-repo
---
As a reference, the mono-repo might look something like this:
```
packages/
├── foo-pkg
│   └── package.json
├── bar-pkg
│   └── package.json
├── baz-pkg
│   └── package.json
└── qux-pkg
    └── package.json


```
In its essence, [Manypkg](https://github.com/Thinkmill/manypkg) is a linter for `package.json` files in Yarn, Bolt or pnpm mono-repos. You can use it to automate these chores. Simply run `yarn add @manypkg/cli` and you can run the following commands in your pre-commit hooks and pipelines:
## `manypkg check`
I use this to check whether all `package.json` files are alphabetically sorted, there are internal and external mismatches between packages, there are invalid dev and peer dependency relationships, invalid package names and more. You can have a look at the checks [here](https://github.com/Thinkmill/manypkg#checks).
## `manypkg fix`
This will run the check and try to automatically resolve the issues it finds. Usually, it’s a wise idea to run this command in your pre-commit hook. That way, your pipeline won’t fail mid-way because of a minor issue.
## `manypkg run <partial package name or directory> <script>`
With this command, you can run a script in a `package.json` file of a particular package in the mono-repo. Let’s say you have a package that has a script that runs a test for that package. You can then run `manypkg run your-package some-tests`.
## `manypkg exec <cli command>`
This will let you run a CLI command in each of the packages. For example, you can run `yarn manypkg exec rm -rf dist` to remove the dist folder in every package in the mono-repo.
## Verdict
Although the latter two are nice to have, the check and fix commands are vital in any mono-repo to me. It not only helps me but gives me peace of mind that a large group of developers can work on the mono-repo and we have checks and tools in place to make sure that dependencies are properly checked and fixed.
Since introducing this into a project I work on, we managed to easily keep everything up-to-date across the mono-repo.
Try it out in your project! You’ll see that it makes your life way easier.
