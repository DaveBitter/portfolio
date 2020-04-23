---
items:
  - body: >-
      Back in 2018, we have updated our main website
      \[mirabeau.nl](https://mirabeau.nl). However, the old blogging platform
      became the sibling that was left behind. The branding and visual style got
      severely updated and as you might know, the world of (front-end)
      development moves at a rapid pace. Projects that are about five years old
      become outdated both in tooling and functionality. I want to rethink the
      way we build web platforms and construct a stack that stays up-to-date and
      is resilient for the coming years. 




      !\[The old
      blog](//images.ctfassets.net/w4dg3cjf42ew/5vXCgxn6BTCy8jqrjMiLXf/2db1ca51a38df55e69951346ab28abbc/49D97C22-25AD-4F85-862D-E6C93A006EE6-min.png)


      \*Our aged blog platform\*




      \## The new blog platform 


      The biggest difference between the new blog platform – compared to the old
      – is the unified visual language. I took, in close collaboration with our
      visual designers, elements of the main Mirabeau website to use in our
      platform. Examples are the page scroll effect and the blog cards.
      Combining that with our corporate identity ensures a unified look & feel.




      The second major improvement is the overall ease of use. For example, you
      are now able to scan more quickly over the page to find an article of your
      interest. I implemented this by proving a teaser image and a summary of
      the blog. This gives authors more room to make a scannable summary of
      their post.




      !\[The new Mirabeau visual
      branding](//images.ctfassets.net/w4dg3cjf42ew/36VJWDKG568fiDIAdv9Gpg/39118b835a3f11b5d59c8bcde0ee8d66/B323160D-6A46-4AD2-A48C-1FEF85BBF506-min.png)\*Our
      updated branding and visual language\*




      \### Solving issues with Single Page Applications (SPA)


      Every once in awhile I see techniques or frameworks that truly excite me.
      The foundation of this platform is built on one of those. The platform is
      built in \[React.js](https://reactjs.org/) with the full power of
      \[Next.js](https://nextjs.org/).




      At Mirabeau, there are two main ways of building the front-end for a
      website. We either use our \[front-end
      boilerplate](https://github.com/mirabeau-nl/frontend-boilerplate) for
      setting up a component library/design system and static websites or we use
      React.js to build more interactive heavy web applications. React.js comes
      with a few big downsides that you need to take into account. The reason
      Next.js excites me so much is that it solves many of the issues.




      The biggest drawback is the lack of server-side rendering (SSR)
      capabilities when using React.js or any other SPA. In short, you load a
      blank page and a JavaScript bundle. After loading the bundle, the page is
      built in the browser and the user can use the application. 




      This has multiple implications like:




      1.    \_\_Performance\_\_: The page needs to load a - in most cases large
      -  JavaScript bundle to be able to render the first view. Often, you then
      need to get some data - like a blog post - from a server. This then gets
      retrieved and rendered on the page. By utilising SSR, we can do all of
      this just on the server. 




      2.    \_\_Providing SEO\_\_: SEO is an important factor for many types of
      websites like our blog platform. Firstly, I wanted to provide
      robots/crawlers from Google to properly index our pages. Secondly, I
      wanted social media platforms to be able to create links with images,
      titles and summaries.




      3.    \_\_Building through progressive enhancement\_\_: At Mirabeau, we
      build websites through progressive enhancement. Unfortunately, you need
      JavaScript for a React.js website. We can use SSR to provide the platform
      without having JavaScript in the browser.




      !\[React.js and
      Next.js](//images.ctfassets.net/w4dg3cjf42ew/5JdNrYGW2SBKmIoT38kqz0/80b019ca3d6e00871b3603f842814b0c/CDFEF415-123A-4D0E-85AD-BB3B32A0B3A1-min.png)\*React.js
      and Next.js working together\*




      \### Serverless architecture


      Next.js provides a couple of ways to run your platform. You can run your
      platform with a \[Node.js
      server](https://blog.logrocket.com/how-to-build-a-server-rendered-react-app-with-next-express-d5a389e7ab2f/),
      generated as a  \[static site
      (SSG)](https://nextjs.org/learn/excel/static-html-export)or \[
      serverless](https://serverless.com/blog/serverless-nextjs/). I decided to
      go with the latter for a few reasons. As the content might update
      frequently, a statically generated website requires rebuilds of pages when
      their content changes. This leaves me with Node.js and serverless.
      Serverless is the right choice with regards to costs, scalability and
      speed. More details later on in this story.




      \### Increasing engagement with custom SEO


      SEO is an important aspect of any website, but even more for a blog
      platform. I dove into how we could leverage this for this platform.




      1.    \_\_Creating dynamic tags\_\_. Fortunately, Next.js provides a Head
      component to let you dynamically add nodes, like tags for SEO, to the head
      of the page. I use this to load page-specific tags dynamically per page.




      2.    \_\_Using standards with \[Open Graph](https://ogp.me/)\_\_. It’s a
      protocol that is widely supported by all major social media websites and
      crawlers. I use Open Graph to create semantical tags for SEO. For example,
      I was able to provide a title, image and summary for an article page.




      3.    \_\_Custom tags for social sites\_\_. By default robots or crawlers
      of websites like Facebook, LinkedIn and Twitter will try to get this
      information out of your website. I want to allow authors to have full
      control over this. In the CMS the author can give a specific image and
      summary for their article. This then dictates how it looks like when
      shared on social media sites. This gives more fine-grained control over
      this. 




      4.    \_\_Extending tags in a smart way\_\_. Even though I want to give
      this fine-grained control to the others, I don't want them to worry about
      it. I wrote a small algorithm that takes a set of base tags for the entire
      blog platform and extends them based on the type of page. This ensures
      good SEO while taking away the work for authors.




      \### Utilising a serverless architecture


      I want to dive a bit deeper in the serverless architecture that is used
      for this blog platform. This is the biggest difference, technology-wise
      next to React.js, compared to the old platform.




      !\[The Serverless Framework with
      Next.js](//images.ctfassets.net/w4dg3cjf42ew/6m51INzwmzmJr4Z25pfInu/52550162034fa24e94687be53e931e2c/serverless_nextjs_blog_header-min.png)\*The
      Serverless Framework with Next.js\*




      1.     \_\_‘Zero’ configuration\_\_. Configuring and deploying a fully
      serverless architecture can become quite difficult. For this reason, I
      decide to make use of the \[Serverless
      Framework](https://serverless.com/). This allows me to get up and running
      relatively quickly. It simplified the configuration and deployment aspect.




      2.    \_\_Next.js\_\_. I use the \[Serverless Next.js
      plugin](https://serverless.com/blog/serverless-nextjs/). This plugin takes
      the rest of the heavy lifting. It is exactly tailored to deploying a
      Next.js project with serverless and lambdas. 




      3.    \_\_Cloud services\_\_. I decided to use AWS, where we host many
      services, to deploy the serverless platform on. Below you can see the
      architecture that I use.




      !\[New Mirabeau blog platform architecture on
      AWS](//images.ctfassets.net/w4dg3cjf42ew/1C35P7AAsdhPyE87h90fEi/269e6dc99c0c03cc79adbed078f7e240/serverless_nextjs_lambda_edge_aws_architecture-min.png)\*The
      new Mirabeau blog platform architecture running on AWS\*




      \### Cloud Services


      A comprehensive overview of AWS services used for the new platform:




      1.    \_\_CloudFront\_\_. Amazon CloudFront speeds up the distribution of
      static and dynamic web content to users. Making use of S3 buckets for
      static files and Lambda at edge to render the requested page server-side.






      2.    \_\_S3\_\_. Amazon Simple Storage Service (S3) is storage designed
      to make web-scale computing easier for developers. It is utilised to serve
      the images, CSS and JavaScript.




      3.    \_\_Lambda@Edge\_\_ lets you run Node.js and Python Lambda functions
      to customize content that CloudFront delivers by executing the functions
      in AWS locations near the user. This results in a faster page load, in
      general, for every user all over the world.




      !\[Lamda](//images.ctfassets.net/w4dg3cjf42ew/7uRaMDjuA7iS9kjLEau6Bm/48ef2eb84b38b9fc1314b427a523713d/cloudfront-events-that-trigger-lambda-functions-min.png)\*A
      typical request going through AWS CloudFront\*




      \### CI/CD with pipelines


      Finally, I added CI/CD through pipelines. I do this for a few reasons. I
      want to ensure that all front-end developers can collaborate on this
      platform by quickly cloning the repository, make changes and roll out an
      update through the pipelines. Next to that, I want to ensure that
      everybody that we allow through the repository rights and access
      configuration, can deploy without creating their own AWS accounts and
      keys. This all ensures a nice developer experience.


      \    


      !\[CI/CD](//images.ctfassets.net/w4dg3cjf42ew/KZlhxIeJqB8y7l954ixcm/04acb40e87638f9dbfed747370ba32aa/diagram-cicd-horizontal-85f50f218b3ff47fd993ab5529b85f0147901b20f18b972fdc48504e4bc3110e-min.png)\*Two
      ways of CI/CD\*




      \## The new front-end toolbox


      So, that was a lot of work. I’ve set the foundation for the blog platform.
      The project is still at an early stage though. I’ll keep you posted about
      further developments! If you have any questions please feel free to <a
      href="mailto:dbitter@mirabeau.nl">get in touch</a>.




      Let’s take a step back and look at what a front-end developer in 2020 can
      do. It is a great time for front-end developers to experiment with
      different areas of the process of building a platform. With Next.js I was
      able to, relatively easy, add SSR through Lamdas. With the Serverless
      framework and the Serverless Next.js plugin, I was able to configure and
      deploy the full architecture to AWS. Finally, with pipelines I was able to
      implement CI/CD.




      \*\*Naturally, there are more tools out there, but this platform attests
      to the fact that we become increasingly more powerful as front-end
      developers nowadays. We can build great things with the assistance of the
      mentioned tools. We can, once again, focus on creating!\*\*
    date: 2020-02-03T23:00:00.000Z
    teaserCopy: >-
      Our blog was suffering from technical debt. I decided to rebuild it using
      the latest web technologies to make it 2020 ready, which includes boosting
      the overall performance and user-friendliness.
    teaserImage: >-
      Our blog was suffering from technical debt. I decided to rebuild it using
      the latest web technologies to make it 2020 ready, which includes boosting
      the overall performance and user-friendliness. This blog post is about the
      journey I went and what the possibilities might be for your next platform.
    title: Implementing the latest web technologies to boost our blog
---

