import { styled, useInputContext, Components, createPlugin } from 'leva/plugin';
import React, { forwardRef, useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StyledInput = styled('input', {
  $reset: '',
  padding: '0 $sm',
  width: '100%',
  minWidth: 0,
  flex: 1,
  height: '100%'
});
const InputContainer = styled('div', {
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
const StyledWrapper = styled('div', {
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
} = Components;
const DateCalendarContainer = ({
  children
}) => {
  return React.createElement(CalendarContainer, null, React.createElement(StyledWrapper, null, children));
};
const DateInput = forwardRef(({
  value,
  onClick,
  onChange
}, ref) => {
  return React.createElement(StyledInput, {
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
  } = useInputContext();
  const [isOpen, setIsOpen] = useState(false);
  return React.createElement(Row, {
    input: true,
    style: {
      height: isOpen ? 300 : 'auto'
    }
  }, React.createElement(Label, null, label), React.createElement(InputContainer, null, React.createElement(DatePicker, {
    selected: value.date,
    onChange: onUpdate,
    dateFormat: settings.inputFormat,
    calendarContainer: DateCalendarContainer,
    customInput: React.createElement(DateInput, null),
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

const date = createPlugin({
  sanitize,
  format,
  normalize,
  component: Date$1
});

export { date };
