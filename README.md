[![npm version](https://badge.fury.io/js/postcss-stylish-dark-theme-gene.svg)](https://badge.fury.io/js/postcss-stylish-dark-theme-gene)
[![Build Status](https://travis-ci.org/k--kato/postcss-stylish-dark-theme-gene.svg?branch=master)](https://travis-ci.org/k--kato/postcss-stylish-dark-theme-gene)
[![Coverage Status](https://coveralls.io/repos/github/k--kato/postcss-stylish-dark-theme-gene/badge.svg?branch=master)](https://coveralls.io/github/k--kato/postcss-stylish-dark-theme-gene?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE.md)

# Dark Theme Generator for Stylish

Extract only color from CSS files and invert it to generate Stylish dark theme.


## Usage

![postcss-stylish-dark-theme-gene](./img/postcss-stylish-dark-theme-gene.gif)


1: First, install the package dependencies:
```
npm install
```

2: Save css files to `stylish/domain/`.

3: Now you can compile the code:
```
npm run stylish
```

4: Stylish dark theme is generated in `stylish/dist/dark-theme.css`.


## Stylish
  * Get the Stylish addon for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/2108/), [Chrome](https://chrome.google.com/extensions/detail/fjnbnpbmkenffdnngjfgmeleoegfcffe), [Opera](https://addons.opera.com/en/extensions/details/stylish/), [Safari](http://sobolev.us/stylish/) and [Firefox Mobile](https://addons.mozilla.org/en-US/firefox/addon/2108/).


## References

1. PostCSS, API, http://api.postcss.org/
1. GitHub, GitHub-Dark, https://github.com/StylishThemes/GitHub-Dark
1. GitHub, postcss-colors-only, https://github.com/rsanchez/postcss-colors-only
