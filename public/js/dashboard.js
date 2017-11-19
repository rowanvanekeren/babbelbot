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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),

/***/ 11:
/***/ (function(module, exports) {

setTimeout(function () {

    $(document).ready(function () {

        passwordHint();

        testFunction();

        //end of document ready function
    });

    function passwordHint() {
        var passwordIcon = '.see-password-input>i';
        $(passwordIcon).click(function (e) {
            console.log('eye clicked');
            $(this).parent().children('input').focus();
            if ($(this).parent().children('input').attr('type') == 'text') {
                $(this).parent().children('input').attr('type', 'password');
            } else if ($(this).parent().children('input').attr('type') == 'password') {
                $(this).parent().children('input').attr('type', 'text');
            }
            $(this).toggleClass('fa-eye-slash');
        });
    }

    function toggleError(elem, errorArray, showOrHide) {

        var el = $('.no-error');el.addClass('has-error');el.removeClass('no-error');
    }

    function testFunction() {
        var inpWrapperClass = '.input-wrapper';
        var inpIconElemClass = '.input-saving-overlay';
        var inpElemClass = '.input-wrapper input';

        var shrinkClass = 'shrink-input-wapper';

        $(window).resize(function () {
            //  $(inpWrapperClass).css('width', '100%');

            $('.processing:not(.disable-shrink)').css('width', '100%').css('width', 'calc(100% - 25px)');
            $('.input-wrapper:not(.processing)').css('width', '100%');
        });
        $(inpElemClass).focus(function () {

            var currentParent = $(this).parent();
            var cuurentInput = $(this);

            if (currentParent.hasClass('processing') && !currentParent.hasClass('disable-shrink') && (cuurentInput.attr('disabled') == false || typeof cuurentInput.attr('disabled') == 'undefined')) {
                currentParent.animate({ 'width': currentParent.width() + 25 }, 100, 'linear', function () {
                    currentParent.removeClass('processing');
                    currentParent.children(inpIconElemClass).addClass('hidden');
                    currentParent.children(inpIconElemClass).addClass('fa-repeat').removeClass('fa-check');
                    console.log('i added space');
                });
            } else if (currentParent.hasClass('processing') && currentParent.hasClass('disable-shrink') && (cuurentInput.attr('disabled') == false || typeof cuurentInput.attr('disabled') == 'undefined')) {
                currentParent.removeClass('processing');
                currentParent.children(inpIconElemClass).addClass('hidden');
                currentParent.children(inpIconElemClass).addClass('fa-repeat').removeClass('fa-check');
            }
        });
        $(inpElemClass).keyup(function (e) {
            if (e.keyCode == 13) {
                var currentParent = $(this).parent();
                var cuurentInput = $(this);
                if (!currentParent.hasClass('disable-shrink') && !currentParent.hasClass('processing')) {
                    currentParent.addClass('processing');
                    cuurentInput.attr('disabled', true);
                    currentParent.animate({ 'width': currentParent.width() - 25 }, 100, 'linear', function () {
                        setTimeout(function () {
                            currentParent.children(inpIconElemClass).removeClass('hidden');

                            setTimeout(function () {
                                currentParent.children(inpIconElemClass).removeClass('fa-repeat').addClass('fa-check');
                                cuurentInput.attr('disabled', false);
                            }, 1000);
                        }, 150);
                    });
                } else if (!currentParent.hasClass('processing')) {

                    currentParent.addClass('processing');
                    cuurentInput.attr('disabled', true);

                    currentParent.children(inpIconElemClass).removeClass('hidden');

                    setTimeout(function () {
                        currentParent.children(inpIconElemClass).removeClass('fa-repeat').addClass('fa-check');
                        cuurentInput.attr('disabled', false);
                    }, 1000);
                }
            }
        });

        //function activateInputLoader(element)

        //function changeInputLoaderState(element , succes/error/loading/);

        //function closeInputLoader(element);

        //function watchloaderchange() <- not sure yet

        //focus and onchange fix
    }
}, 100);

/***/ })

/******/ });