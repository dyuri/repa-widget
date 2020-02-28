# `repa-widget`

Widget baseclass for hybird webcomponents.

The `<slot>` of the widgets could be rendered and refreshed both on backend and frontend side if using templates that can be used both in the browser (as simple JS or WASM functions) and in the backend.

Since I don't really like bloated, over-complicated stuff, I tried to use as simple things as possible, and remain close to the standards.

## Development

Install the dependencies and make them available for direct use:

```
$ npm install -D
$ npm run snowpack
```

Create the JS + CSS bundles:

```
$ npm run build
```

During development you don't need to rebundle the CSS / JS files you change, `gulp` can watch for file changes:

```
$ npm run watch
```

### `jsdoc`

The `npm run jsdoc` command generates HTML documentation into the `doc` folder (this is not commited into git).

Updating the attached `DOCS.md` file is created by the `npm run jsdoc2md` command.

## JS bundles

Ideally every page should have one (and only one) JS bundle included. These per-page bundles are generated during the build process.

Each bundle requires an entry point - which is a javascript file in the `js` directory. This JS module imports all the required widgets that are present on that particular page, and may contain page specific / widget-independent code.

Enlist the widgets / etc. in an `export` statement at the end of the main module to prevent the tree-shaking mechanism to remove those that are not explicitly used, but still needed.

The bundles are generated in the `bundle` folder.

Currently 4 types of bundles are generated:

- `[bundle].js` - concatenated, minified
- `[bundle].sm.js` - concatenated, minified, sourcemap included
- `[bundle].ie.js` - concatenated, minified, transpiled via babel
- `[bundle].ie.sm.js` - concatenated, minified, transpiled via babel, sourcemap included

The `.sm` versions should be only served in *developer mode*. The `.ie` versions are for *old* browsers (IE11, and above).

In *developer mode*, if the browsers support ES modules the *entry point* modules could be used directly in the browsers.

## CSS bundles

Ideally every page should include one (and only one) CSS bundle. These per-page bundles are generated during the build process.

Each bundle requires an entry point - which is a css file in the `css` directory. This CSS file `@imports` all the required CSS of widgets that are present on that particular page, and may contain page specific / widget-independent styles.

Currently 2 types of bundles are generated:

- `[bundle].css` - concatenated, minified
- `[bundle].sm.js` - concatenated, minified, sourcemap included

The `.sm` versions should be only served in *developer mode*.

## Developer mode

You can enable *developer mode* by setting the cookie called `developer` to something that isn't *falsy*. Setting it to `js`, `css` or `js|css` will directly import the modules from the `css` / `js` directory. This requires a quite recent browser to work, but you don't have to re-build the bundles when you change something.
