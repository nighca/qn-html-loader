qn-html-loader
======

Webpack loader which loads HTML files as string content & extract dependencies.

### Sample

```html
<p>
  <svg class="icon-ban" qn-href="utils/base/style/icons/ban.svg"></svg>
</p>
```

=>

```javascript
module.exports = '<p>\n  ' + '<svg class="icon-ban">' + '<use xlink:href="' + require("utils/base/style/icons/ban.svg") + ' /></svg>\n</p>';
```

### Install

```shell
npm i qn-html-loader --save-dev
```

### Usage

`webpack.config.js`:

```javascript
{
  // ...
  module: {
    loaders: [
      // ...
      {
        test: /\.html$/,
        loader: 'qn-html'
      },
      // ...
    ]
  }
  // ...
}
```

### Configure


