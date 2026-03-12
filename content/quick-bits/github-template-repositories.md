---
type: quick-bits
date: 2020-06-18T00:00:00.000Z
slug: github-template-repositories
tags:
  - git-hub
intro: >-
  I tend to do a lot of side projects. I like to try out and explore instead of
  just reading about something. This leads to quite a few public and private
  repositories on my GitHub (at the time of writing ~80). Most of these never
  see the light of day, but still require a project set up to get started. Next
  to that, I start quite a few actual projects as well. I like to have a few
  things like frameworks, linting, testing etc. setup. Let's have a look at
  making this a breeze with GitHub template repositories.
teaserCopy: >-
  Let's have a quick look at GitHub Template repositores. We'll go over the why
  and the how with a practical example.
teaserImage: /img/articles/next-boilerplate-repository.webp
title: Using template repositories with GitHub
---
## The old way
I used to start new projects in three different ways:
* Fork another repository that fits the needs and remove what is not needed
* Fork a boilerplate repository
* Create a new repository and copy files from another local repository

These three do the trick but come with issues. Firstly, I don't want to fork or copy files from another repository to then remove what is not needed. Secondly, I don't want to for another repository and then squash the entire history and/or remove all branches besides the main one.
## The new way
Luckily, the folks over at GitHub recognize these issues and provide a solution: GitHub template repositories. So, how is this different from having a boilerplate repository? Well, they offer:
* A new fork includes the entire commit history of the parent repository, while a repository created from a template starts with a single commit.
* Commits to a fork don't appear in your contributions graph, while commits to a repository created from a template do appear in your contribution graph.
* A fork can be a temporary way to contribute code to an existing project while creating a repository from a template starts a new project quickly.

## This is how I use it
I started off with creating a boilerplate repository. My boilerplate repository, among other things, consists of:

* React.js
* Next.js
* TypeScript
* Jest
* Enzyme
* Storybook
* Husky
* ESLint
* StyleLint
* LintStaged
* Basic styles
* Basic utilities

You see why I want to have all of this quickly for a project.
![The Next Boilerplate repository](/img/articles/next-boilerplate-repository.webp)*The Next Boilerplate repository*

Next, I went over to the settings of this repository and enabled 'Template repository'.
![The Next Boilerplate settings](/img/articles/next-boilerplate-settings.webp)*The Next Boilerplate settings*
That was all the setup that is required. Whenever I want to start a new project with this repository I go to the Next Boilerplate and click the green button saying 'Use this template'.
I then have the option to:
* Create a new repository and name it
* Give a description
* Make it public or private
* Include all branches

![The Next Boilerplate template](/img/articles/next-boilerplate-template.webp)*The Next Boilerplate template*

After clicking 'Create repository from template' I have a new repository with all the files, non of the history or branches and start creating right away.
Please head over to [GitHub](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to learn more.
