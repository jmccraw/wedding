# Wedding
It's a wedding!

Project boilerplate for creating standalone articles and other templates.

It uses ES5+ features, with Typescript support and Babel transpiling, along with Sass for CSS and Handlebars for HTML templating.

Folder are broken into `/components`, `/styles`, and `/utilities`. Components contain a capitalized JS file, along with an accompanying HBS file. Utilities are helpers that can be used within Handlebars templates or the application logic itself. Styles should be named the same as their respective component, or else broken into further atoms and folders.

## Get started

Install the dependencies …

```bash
git TK
cd wedding
npm install
```

… then start WebPack:

```bash
npm run start
```

This will start a dev server on (http://localhost:8080/)[http://localhost:8080/] with hot reloading.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build:prod
```

Copy-paste the static HTML generated in the `/dist` folder into the CMS you’re using, and then add the JS accordingly. This code makes use of (Polyfill.io)[https://polyfill.io/v3/] for IE compatibility.
