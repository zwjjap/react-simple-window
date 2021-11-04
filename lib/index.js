"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

require("./style.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//上下 多加载行数
var moreLoading = 10;

function FixedSizeList(props, ref) {
  var children = props.children,
      render = props.render,
      itemCount = props.itemCount,
      itemSize = props.itemSize,
      height = props.height,
      _props$gap = props.gap,
      gap = _props$gap === void 0 ? 0 : _props$gap;
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      scrollIng: scrollIng
    };
  });

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      startPos = _useState2[0],
      setStartPos = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      needRenderRows = _useState4[0],
      setNeedRenderRows = _useState4[1];

  var rapWindowWrap = (0, _react.useRef)(null);
  var cash_v = (0, _react.useRef)({}); //可以展示的 行数

  var showRowNum = (0, _react.useRef)(0);
  showRowNum.current = Math.ceil(height / (itemSize + gap));
  var interSetTime = (0, _react.useRef)(null);

  var renderRow = function renderRow(s_Pos) {
    var needRenderRows = []; //let s_index =  (s_Pos > itemCount - showRowNum.current) ? 0 : s_Pos;
    // let endPos = showRowNum.current + s_index + (gap ? 2 : 1);

    var s_index = s_Pos - moreLoading;

    if (s_index <= 0) {
      s_index = 0;
    }

    var endPos = showRowNum.current + s_Pos + (gap ? moreLoading + 1 : moreLoading);

    if (endPos >= itemCount) {
      endPos = itemCount;
    }

    for (var i = s_index; i < endPos; i++) {
      needRenderRows.push(render && render(i, {
        position: 'absolute',
        left: 0,
        top: i * (itemSize + gap) + 'px',
        height: itemSize + 'px'
      }, i) || '');
    }

    return needRenderRows;
  }; //获取表格滚动信息


  var scrollIng = function scrollIng(v) {
    cash_v.current = v; //起始位置

    var start = Math.floor(v.y / (itemSize + gap));

    if (interSetTime.current) {
      clearTimeout(interSetTime.current);
    }

    interSetTime.current = setTimeout(function () {
      setStartPos(start);
    }, 20);
  }; //处理仅编辑表格 出现的bug 


  (0, _react.useEffect)(function () {
    if (rapWindowWrap.current.parentNode.scrollLeft != cash_v.current.x) {
      rapWindowWrap.current.parentNode.scrollLeft = cash_v.current.x;
    }

    if (rapWindowWrap.current.parentNode.scrollTop != cash_v.current.y) {
      rapWindowWrap.current.parentNode.scrollTop = cash_v.current.y;
    }

    return function () {
      clearTimeout(interSetTime.current);
    };
  }, [startPos]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: rapWindowWrap,
    className: "rap-window-wrap",
    style: {
      height: "".concat(itemCount * (itemSize + gap), "px")
    }
  }, renderRow(startPos));
}

var _default = /*#__PURE__*/(0, _react.forwardRef)(FixedSizeList);

exports["default"] = _default;