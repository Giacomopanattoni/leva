'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vectorPlugin = require('../../dist/vector-plugin-20c926af.cjs.dev.js');
var colord = require('colord');
var lite = require('dequal/lite');
require('react');
var shallow = require('zustand/shallow');
require('react-dom');
require('@radix-ui/react-portal');
require('v8n');
require('@stitches/react');
require('@use-gesture/react');
require('@radix-ui/react-tooltip');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var shallow__default = /*#__PURE__*/_interopDefault(shallow);

const useValue = path => {
  return useValues([path])[path];
};
const useValues = paths => {
  const store = vectorPlugin.useStoreContext();
  const value = store.useStore(({
    data
  }) => paths.reduce((acc, path) => {
    if (data[path] && 'value' in data[path]) return Object.assign(acc, {
      [path]: data[path].value
    });
    return acc;
  }, {}), shallow__default["default"]);
  return value;
};

const Components = {
  Row: vectorPlugin.Row,
  Label: vectorPlugin.Label,
  Portal: vectorPlugin.Portal,
  Overlay: vectorPlugin.Overlay,
  String: vectorPlugin.String,
  Number: vectorPlugin.Number,
  Boolean: vectorPlugin.Boolean,
  Select: vectorPlugin.Select,
  Vector: vectorPlugin.Vector,
  InnerLabel: vectorPlugin.InnerLabel
};

Object.defineProperty(exports, 'LevaInputs', {
  enumerable: true,
  get: function () { return vectorPlugin.LevaInputs; }
});
Object.defineProperty(exports, 'SpecialInputs', {
  enumerable: true,
  get: function () { return vectorPlugin.SpecialInputs; }
});
exports.clamp = vectorPlugin.clamp;
exports.createPlugin = vectorPlugin.createPlugin;
exports.debounce = vectorPlugin.debounce;
exports.evaluate = vectorPlugin.evaluate;
exports.formatVector = vectorPlugin.formatVector;
exports.getVectorPlugin = vectorPlugin.getVectorPlugin;
exports.getVectorSchema = vectorPlugin.getVectorSchema;
exports.getVectorType = vectorPlugin.getVectorType;
exports.invertedRange = vectorPlugin.invertedRange;
exports.keyframes = vectorPlugin.keyframes;
exports.mergeRefs = vectorPlugin.mergeRefs;
exports.normalizeKeyedNumberSettings = vectorPlugin.normalizeKeyedNumberSettings;
exports.normalizeVector = vectorPlugin.normalizeVector;
exports.pad = vectorPlugin.pad;
exports.range = vectorPlugin.range;
exports.sanitizeVector = vectorPlugin.sanitizeVector;
exports.styled = vectorPlugin.styled;
exports.useCanvas2d = vectorPlugin.useCanvas2d;
exports.useDrag = vectorPlugin.useDrag;
exports.useInput = vectorPlugin.useInput;
exports.useInputContext = vectorPlugin.useInputContext;
exports.useInputSetters = vectorPlugin.useInputSetters;
exports.useStoreContext = vectorPlugin.useStoreContext;
exports.useTh = vectorPlugin.useTh;
exports.useTransform = vectorPlugin.useTransform;
Object.defineProperty(exports, 'colord', {
  enumerable: true,
  get: function () { return colord.colord; }
});
Object.defineProperty(exports, 'dequal', {
  enumerable: true,
  get: function () { return lite.dequal; }
});
exports.Components = Components;
exports.useValue = useValue;
exports.useValues = useValues;
