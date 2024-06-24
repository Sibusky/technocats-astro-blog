# Pet-project to learn Astro framework

This repo provides the result of team **TechnoCats** work. It shows that the team already knows what Astro is. For this moment we already familiar with:

- Astro basics
- Layouts
- CSS & styling
- Astro components
- Routing basics
- Markdown layouts
- Card component
- Filtering / sorting in Astro
- Dynamic routes
- Pagination
- Tag Cloud
- Related posts
- Build a sitemap

There were 6 of us who worked on this project:

<a href="https://github.com/Sibusky/technocats-astro-blog/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Sibusky/technocats-astro-blog" />
</a>

Deploy link: https://astro-technocats.netlify.app/

### Admin panel

Once user submits a comment, a POST request goes to Firestore database where all comments are stored. To control all comments the Admin Panel is created. Access to this Panel avalable via link https://sibusky.retool.com/embedded/public/10110a0b-91ae-4e59-a5ad-5a7607a9104a. If comment is correct, just uncheck the checkbox "Draft" on the Panel and save changes. After that comment will apear on the website.

### Server-side rendering

All pages with approved comments are rendered on server side. This means they are visible for searching robots from Google or Yandex.

<image src="./public/images/technoCats.jpg" alt="TehnoCats" width="304" height="374">
