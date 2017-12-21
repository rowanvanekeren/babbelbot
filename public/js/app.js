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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

$(document).ready(function () {
    var runExamplesOnceCalled = false;

    $(window).on('resize scroll', function () {

        if ($('.chat-examples').isInViewport()) {
            $('.chat-examples').removeClass('hide-examples');
            runExamplesOnce();
        }

        if ($('.information-witai.first').isInViewport()) {
            $('.information-witai.first').removeClass('fade-in');
        }

        if ($('.information-witai.second').isInViewport()) {
            $('.information-witai.second').removeClass('fade-in');
        }
    });

    function runExamplesOnce() {
        if (!runExamplesOnceCalled) {
            runChatbots();
            runExamplesOnceCalled = true;
        }
    }

    $.fn.isInViewport = function () {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).resize();
});

var pizzaBot = [{
    user: 'Ik wil graag een pizza bestellen',
    bot: 'Dat kan! Welke pizza zou je willen'
}, {
    user: 'Doe maar een pizza calzone',
    bot: 'Een pizza calzone, natuurlijk!, lust je er nog iets te drinken bij?'
}, {
    user: 'Ik lust er wel water bij',
    bot: 'Oke! naar waar mag ik de pizza bezorgen?'
}, {
    user: 'Naar waar jij gemaakt bent, haha',
    bot: 'Haha! oke baas! ik verwacht dat hij binnen 30 minuten klaar is'
}, {
    user: 'Dankje!',
    bot: 'Graag gedaan :)'
}];

var flightBot = [{
    user: 'Ik wil graag een vliegtuig van Brussel naar New York',
    bot: 'je wilt een vlucht van Burssel naar New York?'
}, {
    user: 'ja graag',
    bot: 'Welke datum wenst u te vliegen?'
}, {
    user: 'op vrijdag 22 december',
    bot: 'Oke! er vliegt een vliegtuig om 14:45 vanuit Brussel-zaventem Airport wilt u deze boeken?'
}, {
    user: 'ja graag',
    bot: 'Dank u wel de vliegtickets worden binnen vijf minuten naar u verzonden'
}, {
    user: 'Dankje!',
    bot: 'Graag gedaan :)'
}];

var helpDeskBot = [{
    user: 'Wanneer begint het volgend schooljaar?',
    bot: 'Het schooljaar van 2018/2019 begint op 12 september'
}, {
    user: 'Oke dankuwel',
    bot: 'Graag gedaan'
}, {
    user: 'Weet u toevallig ook voor wanneer het schoolgeld betaald moet zijn?',
    bot: 'Heeft u nog herexamens?'
}, {
    user: 'Ja',
    bot: 'Binnen twee weken nadat u uw herexamens gemaakt heeft krijgt u een email met daarin alle informatie betreft het schoolgeld'
}, {
    user: 'Oke hartelijk bedankt',
    bot: 'Graag gedaan :)'
}];

function parseMessages(counter, array, element, callback) {
    var element = element;
    var responseObj = array;
    var typed = new Typed(element + ' .chat-bottom p', {
        strings: [responseObj[counter].user],
        typeSpeed: 30,
        onComplete: typedComplete
    });

    function typedComplete() {
        user();
    }

    function user() {

        /* setInterval(function(){*/
        setTimeout(function () {
            typed.destroy();
            $(element + ' .chat-box-inner').append('<div class="chat-row">' + '<div class="' + 'chat-user' + '">' + '<p>' + responseObj[counter].user + '</p>' + '</div>' + '<div style="clear:both"></div>' + '</div>');
            bot();
        }, 500);
    }
    function bot() {

        setTimeout(function () {
            $(element + ' .chat-box-inner').append('<div class="chat-row">' + '<div class="' + 'chat-bot' + '">' + '<p>' + responseObj[counter].bot + '</p>' + '</div>' + '<div style="clear:both"></div>' + '</div>');

            callback();
        }, 2000);
    }
}

function runChatbots() {

    var counterPizza = 0;
    var canAppendPizza = true;
    setInterval(function () {
        if (canAppendPizza) {
            parseMessages(counterPizza, pizzaBot, '.pizza-chat', function () {
                setTimeout(function () {
                    canAppendPizza = true;
                    counterPizza++;
                    if (counterPizza == pizzaBot.length) {
                        $('.pizza-chat .chat-box-inner').empty();
                        counterPizza = 0;
                    }
                }, 2000);
            });
            canAppendPizza = false;
        }
    }, 2000);

    var counterFlight = 0;
    var canAppendFlight = true;
    setInterval(function () {
        if (canAppendFlight) {
            parseMessages(counterFlight, flightBot, '.flight-chat', function () {
                setTimeout(function () {
                    canAppendFlight = true;
                    counterFlight++;
                    if (counterFlight == flightBot.length) {
                        $('.flight-chat .chat-box-inner').empty();
                        counterFlight = 0;
                    }
                }, 2000);
            });
            canAppendFlight = false;
        }
    }, 2000);

    var counterHelpDesk = 0;
    var canHelpDesk = true;
    setInterval(function () {
        if (canHelpDesk) {
            parseMessages(counterHelpDesk, helpDeskBot, '.helpdesk-chat', function () {
                setTimeout(function () {
                    canHelpDesk = true;
                    counterHelpDesk++;
                    if (counterHelpDesk == helpDeskBot.length) {
                        $('.helpdesk-chat .chat-box-inner').empty();
                        counterHelpDesk = 0;
                    }
                }, 2000);
            });
            canHelpDesk = false;
        }
    }, 2000);
}

/***/ })

/******/ });