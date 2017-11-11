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
var botApp = angular.module('botApp', ['ngCookies', 'ngAnimate']);

// this is our directive
angular.module('botApp').directive('scrolly', function () {
    return {
        restrict: 'A',
        link: function link(scope, element, attrs) {
            var raw = element[0];
            console.log('loading directive');

            element.bind('scroll', function () {
                //   console.log('in scroll');
                //   console.log(raw.scrollTop + raw.offsetHeight);
                //   console.log(raw.scrollHeight);
                if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight - 5) {
                    console.log("I am at the bottom");
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

angular.module('botApp').directive('myRepeatDirective', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {}
    };
});

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

            $rootScope.$on('toggleAnimation', function (event, data) {
                console.log('get a broadcast');
                $scope.$eval(attrs.activeApp, { $element: element, data: data });
            });
        }
    };
}]);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);