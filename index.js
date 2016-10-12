/*
 * @file qn-html-loader
 * @author nighca <nighca@live.cn>
 */

var parse = require('./parse')
var util = require('./util')

var resourceAttrName = 'qn-href'

var templates = {
  svg: function (path, attrs) {
    return [
      JSON.stringify('<svg ' + util.formatAttrs(attrs) + '><use xlink:href="'),
      'require("' + path + '")',
      JSON.stringify('" /></svg>')
    ].join(' + ')
  }
}

module.exports = function (source, map) {
  var loader = this

  loader.cacheable && loader.cacheable()

  parse(source, function (err, tags) {
    if (err) {
      loader.callback(
          new Error(
              'parse HTML failed in "' + loader.resourcePath + '": ' + (
                  err.message || err
              )
          )
      )
      return
    }

    var pos = 0
    var parts = []

    tags.forEach(function (tag) {
      var resourcePath = tag.attrs[resourceAttrName]
      var template = templates[tag.tagName]

      if (!resourcePath || !template) return

      var attrs = util.filter(tag.attrs, function (_, key) {
        return key !== resourceAttrName
      })

      parts = parts.concat(
          JSON.stringify(source.slice(pos, tag.start)),
          template(resourcePath, attrs)
      )

      pos = tag.end
    })

    parts.push(JSON.stringify(source.slice(pos)))

    loader.callback(
        null,
        'module.exports = ' + parts.join(' + ') + ';',
        map
    )
  })
}
