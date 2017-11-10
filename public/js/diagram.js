/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(document).ready(function () {
    var _$draggableOperators$;

    var $flowchartPopup = $('#flowchart-popup');
    var $flowchart = $('#flowchart-base');
    var $container = $flowchart.parent();

    var cx = $flowchart.width() / 2;
    var cy = $flowchart.height() / 2;

    $flowchartPopup.draggable();

    // Panzoom initialization...
    $flowchart.panzoom();

    // Centering panzoom
    $flowchart.panzoom('pan', -cx + $container.width() / 2, -cy + $container.height() / 2);

    // Panzoom zoom handling...
    var possibleZooms = [0.5, 0.75, 1, 2, 3];
    var currentZoom = 1;
    $container.on('mousewheel.focal', function (e) {
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta || e.originalEvent.detail;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        currentZoom = Math.max(0, Math.min(possibleZooms.length - 1, currentZoom + (zoomOut * 2 - 1)));
        $flowchart.flowchart('setPositionRatio', possibleZooms[currentZoom]);
        $flowchart.panzoom('zoom', possibleZooms[currentZoom], {
            animate: false,
            focal: e
        });
    });

    var data = {
        defaultLinkColor: '4ca78c',
        operators: {
            operator1: {
                top: cy - 100,
                left: cx - 200,
                properties: {
                    title: 'Operator 1',
                    inputs: {},
                    outputs: {
                        output_1: {
                            label: 'Output 1', multiple: true
                        }
                    }
                }
            },
            operator2: {
                top: cy,
                left: cx + 140,
                properties: {
                    title: 'Operator 2',
                    inputs: {
                        input_1: {
                            label: 'Input 1'
                        },
                        input_2: {
                            label: 'Input 2'
                        }
                    },
                    outputs: {}
                }
            }
        },
        links: {
            link_1: {
                fromOperator: 'operator1',
                fromConnector: 'output_1',
                toOperator: 'operator2',
                toConnector: 'input_2'
            }
        }
    };

    // Apply the plugin on a standard, empty div...
    $flowchart.flowchart({
        defaultLinkColor: '#4ca78c',
        data: data,
        onOperatorSelect: function onOperatorSelect(operatorId) {
            console.log(operatorId);

            $flowchartPopup.removeClass('hidden');
            return true;
        },
        onLinkCreate: function onLinkCreate(linkdata, data) {
            console.log(data);
            return true;
        },
        onOperatorUnselect: function onOperatorUnselect() {
            console.log('deselect');
            $flowchartPopup.addClass('hidden');

            return true;
        }
    });

    $flowchart.parent().siblings('.delete_selected_button').click(function () {
        $flowchart.flowchart('deleteSelected');
    });

    var $draggableOperators = $('.draggable_operator');

    function getOperatorData($element) {
        var nbInputs = parseInt($element.data('nb-inputs'));
        var nbOutputs = parseInt($element.data('nb-outputs'));
        var data = {
            properties: {
                title: $element.text(),
                inputs: {},
                outputs: {}

            }
        };

        var i = 0;
        for (i = 0; i < nbInputs; i++) {
            data.properties.inputs['input_' + i] = {
                label: 'Input ' + (i + 1)
            };
        }
        for (i = 0; i < nbOutputs; i++) {
            data.properties.outputs['output_' + i] = {
                label: 'Output ' + (i + 1),
                multiple: true
            };
        }

        return data;
    }

    var operatorId = 0;

    $draggableOperators.draggable((_$draggableOperators$ = {
        cursor: "move",
        opacity: 0.7,

        helper: 'clone',
        appendTo: 'body',
        zIndex: 1000

    }, _defineProperty(_$draggableOperators$, 'helper', function helper(e) {
        var $this = $(this);
        var data = getOperatorData($this);
        return $flowchart.flowchart('getOperatorElement', data);
    }), _defineProperty(_$draggableOperators$, 'stop', function stop(e, ui) {
        var $this = $(this);
        var elOffset = ui.offset;
        var containerOffset = $container.offset();
        if (elOffset.left > containerOffset.left && elOffset.top > containerOffset.top && elOffset.left < containerOffset.left + $container.width() && elOffset.top < containerOffset.top + $container.height()) {

            var flowchartOffset = $flowchart.offset();

            var relativeLeft = elOffset.left - flowchartOffset.left;
            var relativeTop = elOffset.top - flowchartOffset.top;

            var positionRatio = $flowchart.flowchart('getPositionRatio');
            relativeLeft /= positionRatio;
            relativeTop /= positionRatio;

            var data = getOperatorData($this);
            data.left = relativeLeft;
            data.top = relativeTop;

            $flowchart.flowchart('addOperator', data);
        }
    }), _$draggableOperators$));

    $('.toggle-menu').click(function () {
        $('.toggle-content-wrapper').toggleClass('toggle-animation');
    });
});

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })

/******/ });