/*
 * @file parse html
 * @author nighca <nighca@live.cn>
 */

var htmlparser = require('htmlparser2')

module.exports = function (source, callback) {

  var current
  var tags = []

  var parser = new htmlparser.Parser({

    onopentagname: function (tagName) {
      if (current) {
        tags.push(current)
      }

      current = {
        tagName: tagName,
        start: parser._tokenizer._index - tagName.length - 1
      }
    },

    onopentag: function (tagName, attrs) {
      if (current && current.tagName === tagName) {
        current.attrs = attrs
        current.end = parser._tokenizer._index + 1
      }
    },

    onclosetag: function (tagName) {
      if (current && current.tagName === tagName) {
        current.end = parser._tokenizer._index + 1
      }
    },

    onerror: function (err) {
      callback(err)
    },

    onend: function () {
      callback(null, tags)
    }
  }, {})

  parser.write(source)
  parser.end()

}