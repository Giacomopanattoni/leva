'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugin = require('leva/plugin');
var React = require('react');
var DatePicker = require('react-datepicker');
require('react-datepicker/dist/react-datepicker.css');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var DatePicker__default = /*#__PURE__*/_interopDefault(DatePicker);

const StyledInput = plugin.styled('input', {
  $reset: '',
  padding: '0 $sm',
  width: '100%',
  minWidth: 0,
  flex: 1,
  height: '100%'
});
const InputContainer = plugin.styled('div', {
  $flex: '',
  position: 'relative',
  borderRadius: '$sm',
  color: 'inherit',
  height: '$rowHeight',
  backgroundColor: '$elevation3',
  $inputStyle: '$elevation1',
  $hover: '',
  $focusWithin: '',
  variants: {
    textArea: {
      true: {
        height: 'auto'
      }
    }
  }
});
const StyledWrapper = plugin.styled('div', {
  position: 'relative',
  '& .react-datepicker__header': {
    backgroundColor: '$elevation3',
    border: 'none'
  },
  '& .react-datepicker__current-month, .react-datepicker__day, .react-datepicker__day-name': {
    color: 'inherit'
  },
  '& .react-datepicker__day': {
    transition: 'all 0.2s ease'
  },
  '& .react-datepicker__day--selected': {
    backgroundColor: '$accent1',
    color: '$highlight3'
  },
  '& .react-datepicker__day--keyboard-selected': {
    backgroundColor: 'transparent',
    color: 'inherit'
  },
  '& .react-datepicker__day--today': {
    backgroundColor: '$accent3',
    color: '$highlight3'
  },
  '& .react-datepicker__month-container': {
    backgroundColor: '$elevation2',
    borderRadius: '$lg'
  },
  '& .react-datepicker__day:hover': {
    backgroundColor: '$highlight1'
  }
});

const {
  Label,
  Row
} = plugin.Components;
const DateCalendarContainer = ({
  children
}) => {
  return React__default["default"].createElement(DatePicker.CalendarContainer, null, React__default["default"].createElement(StyledWrapper, null, children));
};
const DateInput = React.forwardRef(({
  value,
  onClick,
  onChange
}, ref) => {
  return React__default["default"].createElement(StyledInput, {
    ref: ref,
    value: value,
    onClick: onClick,
    onChange: onChange
  });
});
function Date$1() {
  const {
    label,
    value,
    onUpdate,
    settings
  } = plugin.useInputContext();
  const [isOpen, setIsOpen] = React.useState(false);
  return React__default["default"].createElement(Row, {
    input: true,
    style: {
      height: isOpen ? 300 : 'auto'
    }
  }, React__default["default"].createElement(Label, null, label), React__default["default"].createElement(InputContainer, null, React__default["default"].createElement(DatePicker__default["default"], {
    selected: value.date,
    onChange: onUpdate,
    dateFormat: settings.inputFormat,
    calendarContainer: DateCalendarContainer,
    customInput: React__default["default"].createElement(DateInput, null),
    onCalendarOpen: () => setIsOpen(true),
    onCalendarClose: () => setIsOpen(false)
  })));
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

function formatDate(date, locale) {
  return date.toLocaleDateString(locale);
}

const _excluded = ["date"];
const defaultSettings = {
  inputFormat: 'MM/dd/yyyy'
};
const sanitize = (value, settings) => {
  return {
    date: value,
    formattedDate: formatDate(value, settings.locale)
  };
};
const format = (value, settings) => {
  return {
    date: value.date,
    formattedDate: formatDate(value.date, settings.locale)
  };
};
const normalize = _ref => {
  let {
      date
    } = _ref,
    _settings = _objectWithoutProperties(_ref, _excluded);
  const settings = _objectSpread2(_objectSpread2({}, defaultSettings), _settings);
  const defaultDate = date !== null && date !== void 0 ? date : new Date();
  return {
    value: {
      date: defaultDate,
      formattedDate: formatDate(defaultDate, settings.locale)
    },
    settings: settings
  };
};

const date = plugin.createPlugin({
  sanitize,
  format,
  normalize,
  component: Date$1
});

exports.date = date;
