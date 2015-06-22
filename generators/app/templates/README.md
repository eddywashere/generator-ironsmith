# <%= name %>

This site is built with [metalsmith](http://www.metalsmith.io/) and [yo ironsmith](https://github.com/eddywashere/generator-lo).

Features include

- simple layouts
- swig templating - includes ability to have templates in markdown (posts)
- default posts collection
- page collection
- tags - list page & individual tag pages
- posts collection in json available at `/posts/index.json`

Install dependencies

```
npm install gulp -g
npm install
```

Run local server on http://localhost:8000

```
gulp preview
```

Build files

```
gulp build
```

Deploy to github pages with

```
gulp build:prod deploy
```
