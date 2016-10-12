var should = require("should");

var loader = require("../");

describe("loader", function () {
    it("should convert to svn href require", function () {
        loader.call({
            callback(_, output){
                output.should.be.eql(
                    'module.exports = "" + "<svg class=\\"icon-ban\\"><use xlink:href=\\"" +' +
                    ' require("utils/base/style/icons/ban.svg") + "\\" /></svg>" + "";'
                )
            }
        }, '<svg class="icon-ban" qn-href="utils/base/style/icons/ban.svg"></svg>');
    });
});
