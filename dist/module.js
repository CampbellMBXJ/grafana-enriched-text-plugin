define(["app/plugins/sdk","lodash"], function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_1__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PanelCtrl = exports.TagCtrl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _sdk = __webpack_require__(2);

__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // will be resolved to app/plugins/sdk


var defaultContent = "\n<h4>Tittle</h4><p>Example Template</p>\n{{{{Metrics: $(metric)-$(max(metricNum))}}}}\n<p>use html tags in the template for styling\n";

var TagCtrl = exports.TagCtrl = function (_MetricsPanelCtrl) {
    _inherits(TagCtrl, _MetricsPanelCtrl);

    function TagCtrl($scope, $injector, templateSrv, $sce) {
        _classCallCheck(this, TagCtrl);

        var _this = _possibleConstructorReturn(this, (TagCtrl.__proto__ || Object.getPrototypeOf(TagCtrl)).call(this, $scope, $injector));

        _this.panelDefaults = {
            mode: 'html', // 'html', 'markdown', 'text'
            content: defaultContent,
            data: []
        };
        _this.defaults();

        _this.events.on('data-received', _this.onDataReceived.bind(_this));
        _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
        _this.events.on('refresh', _this.onRefresh.bind(_this));
        _this.events.on('render', _this.onRender.bind(_this));
        return _this;
    }

    _createClass(TagCtrl, [{
        key: 'onRefresh',
        value: function onRefresh() {
            this.render();
        }
    }, {
        key: 'onRender',
        value: function onRender() {
            this.parseContent(this.panel.content, this.data);
            this.renderingCompleted();
        }
    }, {
        key: 'onDataReceived',
        value: function onDataReceived(data) {
            this.data = data;
            this.parseContent(this.panel.content, this.data);
        }
    }, {
        key: 'getDataValue',
        value: function getDataValue(dataLine, mod) {
            if (mod === "first") {
                return dataLine.datapoints[0][0];
            } else if (mod === "max") {
                var max = [-Infinity];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = dataLine.datapoints[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var point = _step.value;

                        if (point[0] > max) {
                            max = point;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return max[0];
            }
        }
    }, {
        key: 'onInitEditMode',
        value: function onInitEditMode() {
            this.addEditorTab('Options', 'public/app/plugins/panel/text/editor.html');
        }
    }, {
        key: 'getLine',
        value: function getLine() {
            var start = this.panel.content.indexOf("{{");
            var end = this.panel.content.indexOf("}}");
            return [start + 2, end];
        }
    }, {
        key: 'getTag',
        value: function getTag(line, tag) {
            var start = 0;
            var end = 0;
            while (start != -1) {
                start = line.indexOf("$(", start + 3);
                if (start != -1) {
                    end = line.indexOf(")", start + 3);
                    if (end != -1) {
                        var mod = "first";
                        var start_offset = 2;
                        var end_offset = 0;
                        if (line.substring(start + start_offset, start + 6).toLowerCase() === "max(" && line[end + 1] === ")") {
                            start_offset = 6;
                            end_offset = 1;
                            mod = "max";
                        }
                        if (line.substring(start + start_offset, end) === tag) {
                            return [start, end, start_offset, end_offset, mod];
                        }
                    }
                }
            }
        }
    }, {
        key: 'parseContent',
        value: function parseContent(content, data) {
            var line = this.getLine();
            var newLine = content.substring(line[0], line[1]);
            var allLines = "";
            var tags = [];
            for (var i = 0; i < data.length; i++) {
                var tag = data[i].target.split(" ")[0].split(".");
                tag = tag[tag.length - 1];
                if (!tags.includes(tag)) {
                    tags.push(tag);
                } else {
                    tags = [tag];
                    allLines += newLine + '\n';
                    newLine = content.substring(line[0], line[1]);
                }
                var metric = this.getTag(newLine, tag);
                while (metric !== undefined) {
                    var value = this.getDataValue(data[i], metric[4]);
                    newLine = newLine.substring(0, metric[0]) + value + newLine.substring(metric[1] + metric[3] + 1, newLine.length);
                    metric = this.getTag(newLine, tag);
                }
            }
            this.content = content.substring(0, line[0] - 2) + allLines + newLine + content.substring(line[1] + 2, content.length);
        }
    }, {
        key: 'defaults',
        value: function defaults() {
            if (this.panel.content === undefined || this.panel.content === undefined) {
                this.panel.mode = this.panelDefaults.mode;
                this.panel.content = this.panelDefaults.content;
            }

            if (this.panel.data === undefined) {
                this.panel.data = this.panelDefaults.data;
            }
        }
    }, {
        key: 'link',
        value: function link(scope, element) {
            this.initStyles();
        }
    }, {
        key: 'initStyles',
        value: function initStyles() {
            window.System.import(this.panelPath + 'css/panel.base.css!');
            if (grafanaBootData.user.lightTheme) {
                window.System.import(this.panelPath + 'css/panel.light.css!');
            } else {
                window.System.import(this.panelPath + 'css/panel.dark.css!');
            }
        }
    }, {
        key: 'panelPath',
        get: function get() {
            if (this._panelPath === undefined) {
                this._panelPath = '/public/plugins/' + this.pluginId + '/';
            }
            return this._panelPath;
        }
    }]);

    return TagCtrl;
}(_sdk.MetricsPanelCtrl);

TagCtrl.scrollable = true;
TagCtrl.templateUrl = 'partials/module.html';

exports.PanelCtrl = TagCtrl;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ])});;