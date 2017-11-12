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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

$(document).ready(function () {
    elementParallax('.home-title', 0.2, 0.2, 4, 'text', 'margin-left');
    elementParallax('.home-cta', 0.3, 0.3, 4, 'box', 'margin-left');
    //elementParallax('.chat-section', 0.1, 0.1, 4 , 'box' , 'margin-right');
    elementParallax('.chat-user', 0.075, 0.075, 8, 'box', 'margin-right');
    elementParallax('.chat-bot', 0.075, 0.075, 8, 'box', 'margin-left');
    elementParallax('.chat-input-field', 0.075, 0.05, 4, 'box', 'margin-left');
});
function elementParallax(elem, elemOffset, elemShadowOffset, maxMargin, typeShadow, marginXDirection) {

    var checkDirectionX = 0;
    var checkDirectionY = 0;

    var shadowLeft = parseFloat(8);
    var shadowBottom = parseFloat(8);
    var shadowBlur = parseFloat(20);
    var shadowColor = '#393939';

    var shadowOffset = parseFloat(elemShadowOffset);
    if (typeShadow == 'text') {
        var shadowType = 'text-shadow';
    } else if (typeShadow == 'box') {
        var shadowType = 'box-shadow';
    }

    $(elem).css(shadowType, shadowLeft + 'px ' + shadowBottom + 'px ' + shadowBlur + 'px ' + shadowColor);

    var offset = parseFloat(elemOffset);
    var currentMarginX = parseFloat($(elem).css(marginXDirection).replace(/[^-\d\.]/g, ''));
    var currentMarginY = parseFloat($(elem).css('margin-top').replace(/[^-\d\.]/g, ''));

    var beginMarginX = 0;
    beginMarginX = currentMarginX;
    var beginMarginY = 0;
    beginMarginY = currentMarginY;
    var maxMargin = parseFloat(maxMargin);
    $(document).mousemove(function (event) {
        if (event.pageX > checkDirectionX && currentMarginX >= beginMarginX - maxMargin) {
            console.log('going right ' + currentMarginX + ' en ' + (beginMarginX + maxMargin));
            $(elem).css(marginXDirection, currentMarginX -= offset);
            $(elem).css(shadowType, (shadowLeft += shadowOffset) + 'px ' + shadowBottom + 'px ' + shadowBlur + 'px ' + shadowColor);
        } else if (event.pageX < checkDirectionX && currentMarginX <= beginMarginX + maxMargin) {
            console.log('going left');
            $(elem).css(shadowType, (shadowLeft -= shadowOffset) + 'px ' + shadowBottom + 'px ' + shadowBlur + 'px ' + shadowColor);
            $(elem).css(marginXDirection, currentMarginX += offset);
        }
        if (event.pageY > checkDirectionY && currentMarginY >= beginMarginY - maxMargin) {
            $(elem).css('margin-top', currentMarginY -= offset);
            $(elem).css(shadowType, shadowLeft + 'px ' + (shadowBottom += shadowOffset) + 'px ' + shadowBlur + 'px ' + shadowColor);
        } else if (event.pageY < checkDirectionY && currentMarginY <= beginMarginY + maxMargin) {
            $(elem).css('margin-top', currentMarginY += offset);
            $(elem).css(shadowType, shadowLeft + 'px ' + (shadowBottom -= shadowOffset) + 'px ' + shadowBlur + 'px ' + shadowColor);
        }
        checkDirectionX = event.pageX;
        checkDirectionY = event.pageY;
    });
}

function parallaxBAckup() {
    console.log('js is loaded');

    var checkDirectionX = 0;
    var checkDirectionY = 0;

    //$('.home-title').css('margin-left',  parseFloat(currentMarginX)  + offset);
    var shadowLeft = parseFloat(0);
    var shadowBottom = parseFloat(0);
    var shadowBlur = parseFloat(30);
    var shadowColor = '#393939';
    var shadowOffset = parseFloat(0.2);
    $('.home-title').css('text-shadow', shadowLeft + 'px ' + shadowBottom + 'px ' + shadowBlur + 'px ' + shadowColor);

    var offset = parseFloat(0.2);

    var currentMarginX = parseFloat($('.home-title').css('margin-left').replace(/[^-\d\.]/g, ''));
    var currentMarginY = parseFloat($('.home-title').css('margin-top').replace(/[^-\d\.]/g, ''));
    $(document).mousemove(function (event) {
        var msg = "Handler for .mousemove() called at ";
        msg += event.pageX + ", " + event.pageY;

        if (event.pageX > checkDirectionX) {

            console.log('going right');

            $('.home-title').css('margin-left', currentMarginX -= offset);
            $('.home-title').css('text-shadow', (shadowLeft += shadowOffset) + 'px ' + shadowBottom + 'px ' + shadowBlur + 'px ' + shadowColor);
        } else if (event.pageX < checkDirectionX) {
            //var currentMarginX = $('.home-title').css('margin-left').replace(/[^-\d\.]/g, '');
            console.log('going left');
            $('.home-title').css('text-shadow', (shadowLeft -= shadowOffset) + 'px ' + shadowBottom + 'px ' + shadowBlur + 'px ' + shadowColor);
            $('.home-title').css('margin-left', currentMarginX += offset);
        }
        console.log(currentMarginX);

        if (event.pageY > checkDirectionY) {
            console.log('going right');

            //console.log(currentMargin);
            $('.home-title').css('margin-top', currentMarginY -= offset);
            $('.home-title').css('text-shadow', shadowLeft + 'px ' + (shadowBottom += shadowOffset) + 'px ' + shadowBlur + 'px ' + shadowColor);
        } else if (event.pageY < checkDirectionY) {
            //var currentMarginY = $('.home-title').css('margin-top').replace(/[^-\d\.]/g, '');
            console.log('going left');
            // $('.home-title').css('margin-left',  -(event.pageX / 100) + 'px')

            $('.home-title').css('margin-top', currentMarginY += offset);
            $('.home-title').css('text-shadow', shadowLeft + 'px ' + (shadowBottom -= shadowOffset) + 'px ' + shadowBlur + 'px ' + shadowColor);
        }
        checkDirectionX = event.pageX;
        checkDirectionY = event.pageY;
        console.log(msg);
    });
}

/***/ })

/******/ });