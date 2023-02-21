import { styled, useTh, invertedRange, range, useCanvas2d, debounce, useTransform, clamp, Components, useInputContext, useValues, createPlugin } from 'leva/plugin';
import React, { useRef, useCallback, useMemo, useEffect, useState } from 'react';
import { useMove } from '@use-gesture/react';
import * as math from 'mathjs';

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

const Wrapper = styled('div', {
  position: 'relative',
  height: 80,
  width: '100%',
  marginBottom: '$sm'
});
const ToolTip = styled('div', {
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
const Canvas = styled('canvas', {
  height: '100%',
  width: '100%'
});
const Dot = styled('div', {
  position: 'absolute',
  height: 6,
  width: 6,
  borderRadius: 6,
  backgroundColor: '$highlight3',
  pointerEvents: 'none'
});
const SyledInnerLabel = styled('div', {
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
const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  alignItems: 'center'
});

const PlotCanvas = React.memo(({
  value: expr,
  settings
}) => {
  const {
    boundsX,
    boundsY
  } = settings;
  const accentColor = useTh('colors', 'highlight3');
  const yPositions = useRef([]);
  const canvasBoundsY = useRef({
    minY: -Infinity,
    maxY: Infinity
  });
  const drawPlot = useCallback((_canvas, _ctx) => {
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
      const x = invertedRange(range(i, 0, width), minX, maxX);
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
      const v = invertedRange(range(points[i], canvasBoundsY.current.minY, canvasBoundsY.current.maxY), height - 5, 5);
      yPositions.current.push(v);
      path.lineTo(i, v);
    }

    _ctx.strokeStyle = accentColor;
    _ctx.lineWidth = 2;
    _ctx.stroke(path);
  }, [expr, boundsX, boundsY, accentColor]);
  const [canvas, ctx] = useCanvas2d(drawPlot);

  const updatePlot = useMemo(() => debounce(() => drawPlot(canvas.current, ctx.current), 250), [canvas, ctx, drawPlot]);
  useEffect(() => updatePlot(), [updatePlot]);
  const [toolTipOpen, toggleToolTip] = useState(false);
  const [toolTipValues, setToolTipValues] = useState({
    x: '0',
    y: '0'
  });
  const [dotRef, set] = useTransform();
  const canvasBounds = useRef();
  const bind = useMove(({
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
    const valueX = invertedRange(range(i, 0, width), minX, maxX);
    let valueY = expr(valueX);
    valueY = isFinite(valueY) ? valueY.toFixed(2) : 'NaN';
    const relY = clamp(yPositions.current[i * window.devicePixelRatio] / window.devicePixelRatio, 0, height);
    setToolTipValues({
      x: valueX.toFixed(2),
      y: valueY
    });
    set({
      x: left + i - 3,
      y: top + relY - 5 + 2
    });
  });
  return React.createElement(Wrapper, {
    onMouseEnter: () => toggleToolTip(true),
    onMouseLeave: () => toggleToolTip(false)
  }, React.createElement(Canvas, _extends({
    ref: canvas
  }, bind())), toolTipOpen && React.createElement(Components.Portal, null, React.createElement(Dot, {
    ref: dotRef
  }, React.createElement(ToolTip, null, "x: ", toolTipValues.x, React.createElement("br", null), "y: ", toolTipValues.y))));
});

const {
  Label,
  Row,
  String
} = Components;
function Plot() {
  const {
    label,
    value,
    displayValue,
    settings,
    onUpdate,
    onChange,
    setSettings
  } = useInputContext();
  const {
    graph
  } = settings;
  const scope = useValues(value.__symbols);
  const displayRef = useRef(displayValue);
  displayRef.current = displayValue;
  useEffect(() => {
    onUpdate(displayRef.current);
  }, [scope, onUpdate]);
  return React.createElement(React.Fragment, null, graph && React.createElement(Row, null, React.createElement(PlotCanvas, {
    value: value,
    settings: settings
  })), React.createElement(Row, {
    input: true
  }, React.createElement(Label, null, label), React.createElement(Container, null, React.createElement(SyledInnerLabel, {
    graph: graph,
    onClick: () => setSettings({
      graph: !graph
    })
  }, "\uD835\uDC53"), React.createElement(String, {
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
    if (node instanceof math.SymbolNode && node.isSymbolNode) {
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
  const parsed = math.parse(expression);
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
  const parsedScoped = math.parse(_formattedString);
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

const plot = createPlugin({
  normalize,
  sanitize,
  format,
  component: Plot
});

export { plot };
