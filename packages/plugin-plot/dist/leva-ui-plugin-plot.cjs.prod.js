'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugin = require('leva/plugin');
var React = require('react');
var react = require('@use-gesture/react');
var math = require('mathjs');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefault(React);
var math__namespace = /*#__PURE__*/_interopNamespace(math);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

const Wrapper = plugin.styled('div', {
  position: 'relative',
  height: 80,
  width: '100%',
  marginBottom: '$sm'
});
const ToolTip = plugin.styled('div', {
  position: 'absolute',
  top: -4,
  pointerEvents: 'none',
  fontFamily: '$mono',
  fontSize: 'calc($fontSizes$root * 0.9)',
  padding: '$xs $sm',
  color: '$toolTipBackground',
  backgroundColor: '$toolTipText',
  borderRadius: '$xs',
  whiteSpace: 'nowrap',
  transform: 'translate(-50%, -100%)',
  boxShadow: '$level2'
});
const Canvas = plugin.styled('canvas', {
  height: '100%',
  width: '100%'
});
const Dot = plugin.styled('div', {
  position: 'absolute',
  height: 6,
  width: 6,
  borderRadius: 6,
  backgroundColor: '$highlight3',
  pointerEvents: 'none'
});
const SyledInnerLabel = plugin.styled('div', {
  userSelect: 'none',
  $flexCenter: '',
  height: 14,
  width: 14,
  borderRadius: 7,
  marginRight: '$sm',
  cursor: 'pointer',
  fontSize: '0.8em',
  variants: {
    graph: {
      true: {
        backgroundColor: '$elevation1'
      }
    }
  }
});
const Container = plugin.styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  alignItems: 'center'
});

const PlotCanvas = React__default["default"].memo(({
  value: expr,
  settings
}) => {
  const {
    boundsX,
    boundsY
  } = settings;
  const accentColor = plugin.useTh('colors', 'highlight3');
  const yPositions = React.useRef([]);
  const canvasBoundsY = React.useRef({
    minY: -Infinity,
    maxY: Infinity
  });
  const drawPlot = React.useCallback((_canvas, _ctx) => {
    if (!_canvas) return;
    const {
      width,
      height
    } = _canvas;
    const points = [];

    const [minX, maxX] = boundsX;
    canvasBoundsY.current.minY = Infinity;
    canvasBoundsY.current.maxY = -Infinity;
    for (let i = 0; i < width; i++) {
      const x = plugin.invertedRange(plugin.range(i, 0, width), minX, maxX);
      const v = expr(x);
      if (v < canvasBoundsY.current.minY && v !== -Infinity) canvasBoundsY.current.minY = v;
      if (v > canvasBoundsY.current.maxY && v !== Infinity) canvasBoundsY.current.maxY = v;
      points.push(v);
    }
    if (boundsY[0] !== -Infinity) canvasBoundsY.current.minY = boundsY[0];
    if (boundsY[1] !== Infinity) canvasBoundsY.current.maxY = boundsY[1];

    _ctx.clearRect(0, 0, width, height);
    yPositions.current = [];

    const path = new Path2D();
    for (let i = 0; i < width; i++) {
      const v = plugin.invertedRange(plugin.range(points[i], canvasBoundsY.current.minY, canvasBoundsY.current.maxY), height - 5, 5);
      yPositions.current.push(v);
      path.lineTo(i, v);
    }

    _ctx.strokeStyle = accentColor;
    _ctx.lineWidth = 2;
    _ctx.stroke(path);
  }, [expr, boundsX, boundsY, accentColor]);
  const [canvas, ctx] = plugin.useCanvas2d(drawPlot);

  const updatePlot = React.useMemo(() => plugin.debounce(() => drawPlot(canvas.current, ctx.current), 250), [canvas, ctx, drawPlot]);
  React.useEffect(() => updatePlot(), [updatePlot]);
  const [toolTipOpen, toggleToolTip] = React.useState(false);
  const [toolTipValues, setToolTipValues] = React.useState({
    x: '0',
    y: '0'
  });
  const [dotRef, set] = plugin.useTransform();
  const canvasBounds = React.useRef();
  const bind = react.useMove(({
    xy: [x],
    first
  }) => {
    if (first) {
      canvasBounds.current = canvas.current.getBoundingClientRect();
    }
    const {
      left,
      top,
      width,
      height
    } = canvasBounds.current;
    const [minX, maxX] = boundsX;
    const i = Math.ceil(x - left);
    const valueX = plugin.invertedRange(plugin.range(i, 0, width), minX, maxX);
    let valueY = expr(valueX);
    valueY = isFinite(valueY) ? valueY.toFixed(2) : 'NaN';
    const relY = plugin.clamp(yPositions.current[i * window.devicePixelRatio] / window.devicePixelRatio, 0, height);
    setToolTipValues({
      x: valueX.toFixed(2),
      y: valueY
    });
    set({
      x: left + i - 3,
      y: top + relY - 5 + 2
    });
  });
  return React__default["default"].createElement(Wrapper, {
    onMouseEnter: () => toggleToolTip(true),
    onMouseLeave: () => toggleToolTip(false)
  }, React__default["default"].createElement(Canvas, _extends({
    ref: canvas
  }, bind())), toolTipOpen && React__default["default"].createElement(plugin.Components.Portal, null, React__default["default"].createElement(Dot, {
    ref: dotRef
  }, React__default["default"].createElement(ToolTip, null, "x: ", toolTipValues.x, React__default["default"].createElement("br", null), "y: ", toolTipValues.y))));
});

const {
  Label,
  Row,
  String
} = plugin.Components;
function Plot() {
  const {
    label,
    value,
    displayValue,
    settings,
    onUpdate,
    onChange,
    setSettings
  } = plugin.useInputContext();
  const {
    graph
  } = settings;
  const scope = plugin.useValues(value.__symbols);
  const displayRef = React.useRef(displayValue);
  displayRef.current = displayValue;
  React.useEffect(() => {
    onUpdate(displayRef.current);
  }, [scope, onUpdate]);
  return React__default["default"].createElement(React__default["default"].Fragment, null, graph && React__default["default"].createElement(Row, null, React__default["default"].createElement(PlotCanvas, {
    value: value,
    settings: settings
  })), React__default["default"].createElement(Row, {
    input: true
  }, React__default["default"].createElement(Label, null, label), React__default["default"].createElement(Container, null, React__default["default"].createElement(SyledInnerLabel, {
    graph: graph,
    onClick: () => setSettings({
      graph: !graph
    })
  }, "\uD835\uDC53"), React__default["default"].createElement(String, {
    displayValue: displayValue,
    onUpdate: onUpdate,
    onChange: onChange
  }))));
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function getSymbols(expr) {
  return expr.filter(node => {
    if (node instanceof math__namespace.SymbolNode && node.isSymbolNode) {
      try {
        const e = node.evaluate();
        return !!e.units;
      } catch (_unused) {
        return node.name !== 'x';
      }
    }
    return false;
  }).map(node => node.name);
}
function parseExpression(expression, get) {
  const parsed = math__namespace.parse(expression);
  const symbols = getSymbols(parsed);
  const scope = symbols.reduce((acc, path) => {
    const symbol = get(path);
    if (!symbol) throw Error(`Invalid symbol at path \`${path}\``);
    return Object.assign(acc, {
      [path]: symbol
    });
  }, {});
  let _formattedString = parsed.toString();
  for (let key in scope) {
    const re = new RegExp(`\\b${key}\\b`, 'g');
    const s = typeof scope[key] === 'function' ? scope[key].__parsedScoped.toString() : scope[key];
    _formattedString = _formattedString.replace(re, s);
  }
  const parsedScoped = math__namespace.parse(_formattedString);
  const compiled = parsedScoped.compile();
  function expr(v) {
    return compiled.evaluate({
      x: v
    });
  }
  Object.assign(expr, {
    __parsedScoped: parsedScoped,
    __parsed: parsed,
    __symbols: symbols
  });
  return expr;
}

const _excluded = ["expression"];
const sanitize = (expression, _settings, _prevValue, _path, store) => {
  if (expression === '') throw Error('Empty mathjs expression');
  try {
    return parseExpression(expression, store.get);
  } catch (e) {
    throw Error('Invalid mathjs expression string');
  }
};
const format = value => {
  return value.__parsed.toString();
};
const defaultSettings = {
  boundsX: [-1, 1],
  boundsY: [-Infinity, Infinity],
  graph: true
};
const normalize = (_ref, _path, data) => {
  let {
      expression
    } = _ref,
    _settings = _objectWithoutProperties(_ref, _excluded);
  const get = path => {
    if ('value' in data[path]) return data[path].value;
    return undefined;
  };

  const value = parseExpression(expression, get);
  const settings = _objectSpread2(_objectSpread2({}, defaultSettings), _settings);
  return {
    value,
    settings: settings
  };
};

const plot = plugin.createPlugin({
  normalize,
  sanitize,
  format,
  component: Plot
});

exports.plot = plot;
