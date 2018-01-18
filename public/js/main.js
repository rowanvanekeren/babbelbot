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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Created by Rowan on 4-11-2017.
 */
var botApp = angular.module('botApp', ['720kb.tooltips', 'ngCookies', 'ngAnimate', 'ngTagsInput']);

botApp.config(function (tagsInputConfigProvider) {
    tagsInputConfigProvider.setDefaults('tagsInput', {
        placeholder: 'Voeg meer toe',
        minLength: 2

    });
});

// this is our directive
angular.module('botApp').directive('scrolly', function () {
    return {
        restrict: 'A',
        link: function link(scope, element, attrs) {
            var raw = element[0];

            element.bind('scroll', function () {

                if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight - 5) {

                    scope.$broadcast('atBottomOfElem');
                    scope.$apply(attrs.scrolly);
                }
            });
        }
    };
});

angular.module('botApp').directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter, { $element: element });
                });

                event.preventDefault();
            }
        });
    };
});

angular.module('botApp').directive('growBack', function () {
    return function (scope, element, attrs) {
        element.bind("focus", function (event) {
            var inpElemClass = '.input-wrapper input';
            var inpIconElemClass = '.input-saving-overlay';

            var currentParent = $(event.target.parentElement);
            var cuurentInput = $(event.currentTarget);

            if (currentParent.hasClass('processing') && !currentParent.hasClass('disable-shrink') && (cuurentInput.attr('disabled') == false || typeof cuurentInput.attr('disabled') == 'undefined')) {
                currentParent.animate({ 'width': currentParent.width() + 25 }, 100, 'linear', function () {
                    currentParent.removeClass('processing');
                    currentParent.children(inpIconElemClass).addClass('hidden');
                    currentParent.children(inpIconElemClass).addClass('fa-repeat').removeClass('fa-check');
                });
            } else if (currentParent.hasClass('processing') && currentParent.hasClass('disable-shrink') && (cuurentInput.attr('disabled') == false || typeof cuurentInput.attr('disabled') == 'undefined')) {
                currentParent.removeClass('processing');
                currentParent.children(inpIconElemClass).addClass('hidden');
                currentParent.children(inpIconElemClass).addClass('fa-repeat').removeClass('fa-check');
            }
        });
    };
});

angular.module('botApp').directive('passwordInput', function () {
    return function (scope, element, attrs) {
        element.bind("click", function (event) {

            var passwordIcon = '.see-password-input>i';
            $(event.currentTarget).parent().children('input').focus();
            if ($(event.currentTarget).parent().children('input').attr('type') == 'text') {
                $(event.currentTarget).parent().children('input').attr('type', 'password');
            } else if ($(event.currentTarget).parent().children('input').attr('type') == 'password') {
                $(event.currentTarget).parent().children('input').attr('type', 'text');
            }
            $(event.currentTarget).toggleClass('fa-eye-slash');
        });
    };
});

/*angular.module('botApp').directive('myRepeatDirective', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {

        }
    };
});*/

/*angular.module('botApp').directive('navActiveApp', function() {
 return {
 restrict: 'A',
 link: function(scope, element, attrs) {
 scope.$on('broadCastActiveApp', function(event, broadCastActiveApp) {
 console.log('broadcast nav');
 // element.find('input').prop('checked', broadCastActiveApp);
 });
 }
 };
 });*/

angular.module('botApp').directive('activeApp', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'A',
        link: function link($scope, element, attrs) {

            $rootScope.$on('toggleApp', function (event, data) {

                $scope.$eval(attrs.activeApp, { $element: element, data: data });
            });
        }
    };
}]);

angular.module('botApp').directive('activeTraining', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'A',
        link: function link($scope, element, attrs) {

            $rootScope.$on('toggleIntentTraining', function (event, data) {

                $scope.$eval(attrs.activeTraining, { $element: element, data: data });
            });
        }
    };
}]);

angular.module('botApp').directive('activeEntity', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'A',
        link: function link($scope, element, attrs) {

            $rootScope.$on('toggleIntentEntity', function (event, data) {

                $scope.$eval(attrs.activeEntity, { $element: element, data: data });
            });
        }
    };
}]);

angular.module('botApp').factory('shrinkLoading', function () {
    return {
        do: function _do(element, state) {
            var inpIconElemClass = '.input-saving-overlay';
            var inpElemClass = '.input-wrapper input';
            var currentParent = element.parent();
            var cuurentInput = element;
            if (!currentParent.hasClass('disable-shrink') && !currentParent.hasClass('processing') && state == 'loading') {
                currentParent.addClass('processing');
                currentParent.children(inpIconElemClass).removeClass('fa-times').addClass('fa-repeat');
                cuurentInput.attr('disabled', true);
                currentParent.animate({ 'width': currentParent.width() - 25 }, 100, 'linear', function () {
                    setTimeout(function () {
                        currentParent.children(inpIconElemClass).removeClass('hidden');
                    }, 150);
                });
            } else if (!currentParent.hasClass('processing')) {

                currentParent.addClass('processing');
                cuurentInput.attr('disabled', true);

                currentParent.children(inpIconElemClass).removeClass('hidden');
            } else if (state == 'success') {

                currentParent.children(inpIconElemClass).removeClass('fa-repeat fa-times').addClass('fa-check');
                /*  currentParent.removeClass('processing');*/
                cuurentInput.attr('disabled', false);
            } else if (state == 'error') {
                currentParent.children(inpIconElemClass).removeClass('fa-repeat fa-check').addClass('fa-times');
                /*  currentParent.removeClass('processing');*/
                cuurentInput.attr('disabled', false);
            }
        }
    };
});

angular.module('botApp').factory('buttonLoading', function () {
    return {
        do: function _do(element, state) {
            var currentInput = element;
            var currentText = element.text();

            currentInput.attr('disabled', true);
            if (state == 'loading') {
                currentInput.html(currentText + ' <i class="fa fa-repeat"></i>');
            } else if (state == 'success') {
                currentInput.html(currentText + ' <i class="fa fa-check"></i>');
                currentInput.attr('disabled', false);
                setTimeout(function () {
                    currentInput.html(currentText);
                }, 3000);
            } else if (state == 'error') {
                currentInput.html(currentText + ' <i class="fa fa-times"></i>');
                currentInput.attr('disabled', false);
                setTimeout(function () {
                    currentInput.html(currentText);
                }, 3000);
            } else if (state == 'reset') {
                currentInput.html(currentText);
                currentInput.attr('disabled', false);
            }
        }
    };
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);