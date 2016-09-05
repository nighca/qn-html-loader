/*
 * @file util methods
 * @author nighca <nighca@live.cn>
 */

var filter = function (obj, check) {
  var filtered = {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (check(obj[key], key)) {
        filtered[key] = obj[key]
      }
    }
  }
  return filtered
}

var formatAttrs = function (attrs) {
  return Object.keys(attrs).map(function (key) {
    return key + '="' + attrs[key] + '"'
  }).join(' ')
}

module.exports = {
  filter: filter,
  formatAttrs: formatAttrs
}
