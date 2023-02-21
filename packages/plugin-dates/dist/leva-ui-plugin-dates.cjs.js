'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./leva-ui-plugin-dates.cjs.prod.js");
} else {
  module.exports = require("./leva-ui-plugin-dates.cjs.dev.js");
}
