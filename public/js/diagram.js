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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),

/***/ 13:
/***/ (function(module, exports) {

$(document).ready(function () {
    var flowchartReady = false;
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
        operators: {
            operator_89: {
                top: '4640',
                left: '4460',
                properties: {
                    title: '1 input & 1 output',
                    inputs: {
                        ins: {
                            label: 'Input (:i)',
                            multiple: true
                        }
                    },
                    outputs: {
                        outs: {
                            label: 'Output (:i)',
                            multiple: true
                        }
                    }
                }
            },
            operator_90: {
                top: '4640',
                left: '5380',
                properties: {
                    title: '1 input & 1 output',
                    inputs: {
                        ins: {
                            label: 'Input (:i)',
                            multiple: true
                        }
                    },
                    outputs: {
                        outs: {
                            label: 'Output (:i)',
                            multiple: true
                        }
                    }
                }
            },
            operator_91: {
                top: '4901.5',
                left: '5387.5',
                properties: {
                    title: '1 input & 1 output',
                    inputs: {
                        ins: {
                            label: 'Input (:i)',
                            multiple: true
                        }
                    },
                    outputs: {
                        outs: {
                            label: 'Output (:i)',
                            multiple: true
                        }
                    }
                }
            },
            operator_92: {
                top: '5060',
                left: '5020',
                properties: {
                    title: '1 input & 1 output',
                    inputs: {
                        ins: {
                            label: 'Input (:i)',
                            multiple: true
                        }
                    },
                    outputs: {
                        outs: {
                            label: 'Output (:i)',
                            multiple: true
                        }
                    }
                }
            }
        },
        links: {
            link_0: {
                fromOperator: 'operator_89',
                fromConnector: 'outs',
                fromSubConnector: '0',
                toOperator: 'operator_90',
                toConnector: 'ins',
                toSubConnector: '0',
                custom_link_id: '0'
            },
            link_1: {
                fromOperator: 'operator_89',
                fromConnector: 'outs',
                fromSubConnector: '1',
                toOperator: 'operator_91',
                toConnector: 'ins',
                toSubConnector: '0',
                custom_link_id: '1'
            },
            link_2: {
                fromOperator: 'operator_89',
                fromConnector: 'outs',
                fromSubConnector: '2',
                toOperator: 'operator_92',
                toConnector: 'ins',
                toSubConnector: '0',
                custom_link_id: '2'
            },
            link_3: {
                fromOperator: 'operator_92',
                fromConnector: 'outs',
                fromSubConnector: '0',
                toOperator: 'operator_91',
                toConnector: 'ins',
                toSubConnector: '1',
                custom_link_id: '3'
            }

        },
        operatorTypes: {}
    };

    // Apply the plugin on a standard, empty div...

    $flowchart.flowchart({
        defaultLinkColor: '#4ca78c',
        /* data: data,*/
        onOperatorCreate: function onOperatorCreate(operatorID, operatorData) {
            // console.log( $flowchart.flowchart('getOperatorElement', data) );


            return true;
        },
        onOperatorSelect: function onOperatorSelect(operatorId) {

            angular.element(document.getElementById('flowchart-popup')).scope().popupOpen(operatorId);
            $flowchartPopup.removeClass('hidden');
            return true;
        },
        onLinkCreate: function onLinkCreate(linkID, linkData) {

            if (flowchartReady) {
                //  $flowchart.flowchart('redrawLinksLayer');
                //  console.log( $flowchart.flowchart('getOperatorCompleteData', $flowchart.flowchart('getOperatorData', linkData.fromOperator)));
                createLinkOperator(linkID, linkData);
            }

            return true;
        },

        onOperatorMoved: function onOperatorMoved(operatorID, position) {

            updateOperatorPosition(operatorID, position);
        },

        onAfterChange: function onAfterChange(data1, data2) {},
        onOperatorUnselect: function onOperatorUnselect(operatorId) {
            angular.element(document.getElementById('flowchart-popup')).scope().popupClose();
            $flowchartPopup.addClass('hidden');

            return true;
        },
        onLinkSelect: function onLinkSelect(data1, data2) {}
    });

    $flowchart.parent().siblings('.delete_selected_button').click(function () {
        $flowchart.flowchart('deleteSelected');
    });

    var $draggableOperators = $('.draggable_operator');

    var operatorId = 0;

    $draggableOperators.draggable({
        cursor: "move",
        opacity: 0.7,

        helper: 'clone',
        appendTo: 'body',
        zIndex: 1000,

        /*        helper: function(e) {
                    var $this = $(this);
                    var data = createDraggableOperator($this);
                    return $flowchart.flowchart('getOperatorElement', data);
                },*/
        stop: function stop(e, ui) {
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

                var data = createDraggableOperator($this, relativeLeft, relativeTop);
                // data.left = relativeLeft;
                //  data.top = relativeTop;
            }
        }
    });

    $('.toggle-menu').click(function () {
        $('.toggle-content-wrapper').toggleClass('toggle-animation');
    });

    $('#intent-title').on('changeOperatorTitle', function (event, name, operatorID) {
        console.log('test trigger ' + name + ' ' + operatorID);

        $flowchart.flowchart('setOperatorTitle', operatorID, name);
    });

    $.ajax({
        url: '../../getAllStates',
        type: 'post',
        data: {
            test: 'test'
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },

        success: function success(data) {
            // console.log(JSON.parse(data));
            //  console.log(data);

            // $flowchart.flowchart('setData', JSON.parse(data));
            console.log('test init');

            //  flowchartReady = !flowchartReady;
            processData(data);
        }
    });
    function processData(data) {

        var chartJson = {
            operators: {},
            links: {}
        };

        for (var i = 0; i < data.length; i++) {

            if (typeof data[i].state_data.link_data != 'undefined' && data[i].state_data.link_data != '' && data[i].state_data.link_data != null) {
                var links = JSON.parse(data[i].state_data.link_data);
            }

            //console.log(JSON.parse(data[i].next_states));
            chartJson.operators[data[i].id] = {
                top: data[i].state_data.top,
                left: data[i].state_data.left,
                properties: {
                    title: data[i].state_data.name,
                    inputs: {
                        ins: {
                            label: 'Input (:i)',
                            multiple: true
                        }
                    },
                    outputs: {

                        outs: {
                            label: 'Output (:i)',
                            multiple: true
                        }
                    }
                }
            };
            if (typeof links != 'undefined' && links != '' && links != null) {
                for (var a = 0; a < links.length; a++) {
                    chartJson.links[links[a].custom_link_id] = {
                        fromOperator: links[a].fromOperator,
                        fromConnector: links[a].fromConnector,
                        fromSubConnector: parseInt(links[a].fromSubConnector),
                        toOperator: links[a].toOperator,
                        toConnector: links[a].toConnector,
                        toSubConnector: parseInt(links[a].toSubConnector),
                        custom_link_id: links[a].custom_link_id
                    };
                }
            }
        }

        console.log(chartJson);

        $flowchart.flowchart('setData', chartJson);

        flowchartReady = !flowchartReady;
    }

    function getAllLinksFromOperator(operatorID) {
        var completeData = $flowchart.flowchart('getData');
        var completeLinks = completeData.links;
        var links = [];

        for (var key in completeLinks) {
            if (completeLinks[key].fromOperator == operatorID) {
                completeLinks[key]['custom_link_id'] = key;
                links.push(completeLinks[key]);
            }
        }

        return links;
    }

    function createLinkOperator(linkID, linkData) {

        var allLinks = getAllLinksFromOperator(linkData.fromOperator);
        var currentLink = linkData;
        currentLink['custom_link_id'] = linkID;
        allLinks.push(currentLink);

        $.ajax({
            url: '../../createStateLink',
            type: 'post',
            data: {
                link_data: allLinks,
                parent_id: linkData.fromOperator
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            success: function success(data) {},
            error: function error(_error) {

                $flowchart.flowchart('deleteLink', linkID);
            }
        });
    }

    function createDraggableOperator($element, $left, $top) {
        console.log('createDraggableoperator called');

        $.ajax({
            url: '../../createState',
            type: 'post',
            data: {
                top: $top,
                left: $left,
                title: $element.attr('data-default-text'),
                type: $element.attr('data-intent-type')
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            success: function success(data) {

                var resultData = data;

                var Newoperator = {
                    top: resultData.top,
                    left: resultData.left,

                    properties: {
                        title: $element.attr('data-default-text'),
                        inputs: {
                            ins: {
                                label: 'Input (:i)',
                                multiple: true
                            }
                        },
                        outputs: {

                            outs: {
                                label: 'Output (:i)',
                                multiple: true
                            }
                        }
                    }
                };
                $flowchart.flowchart('createOperator', data.state_id, Newoperator);
            }
        });
    }

    function updateOperatorPosition(operatorID, position) {
        $.ajax({
            url: '../../updateOperatorPosition',
            type: 'post',
            data: {
                operator_id: operatorID,
                top: position.top,
                left: position.left
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            success: function success(data) {
                //  console.log(data);

            },
            error: function error(_error2) {
                //  console.log(error);

            }
        });
    }
});

/***/ })

/******/ });