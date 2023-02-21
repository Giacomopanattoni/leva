'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./leva-ui-plugin-plot.cjs.prod.js");
} else {
  module.exports = require("./leva-ui-plugin-plot.cjs.dev.js");
}
