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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

angular.module('botApp').controller("appController", function ($scope, $http, $parse) {

    $scope.newAppTrigger = function (formElem) {
        console.log(formElem);
        $scope.showCreateApp = !$scope.showCreateApp;
        $scope.resetForm(formElem);
    };

    $scope.parseServerMessages = function (serverResponseData, fullArrayInputs, status, currModel) {
        //currModel = the name of the form element
        //fullArrayInputs = an array of all the input available in the form
        for (var fieldName in fullArrayInputs) {
            var message = serverResponseData[fieldName];
            var serverMessage = $parse(currModel.$name + '.' + fieldName + '.$error.serverMessage');
            if (status == 200) {
                currModel.$setValidity(fieldName, true, currModel);
                serverMessage.assign($scope, undefined);
            } else {
                if (typeof serverResponseData[fieldName] == 'undefined' || typeof serverResponseData[fieldName] == '') {
                    currModel.$setValidity(fieldName, true, currModel);
                    serverMessage.assign($scope, undefined);
                } else if (typeof serverResponseData[fieldName] != 'undefined' || typeof serverResponseData[fieldName] != '') {
                    currModel.$setValidity(fieldName, false, currModel);
                    serverMessage.assign($scope, serverResponseData[fieldName]);
                }
            }
        }
    };

    function setLoadingButton(element, trueOrFalse, defaultText) {
        var icon = ' <i class="fa fa-repeat"></i>';
        if (!trueOrFalse) {
            angular.element(document.querySelector(element)).html(defaultText);
        } else if (trueOrFalse) {
            angular.element(document.querySelector(element)).html(defaultText + icon);
        }
    }

    $scope.resetForm = function (formElem) {

        for (var key in formElem.$$controls) {
            //console.log(formElem.$$controls[key].$name);
            var fieldName = formElem.$$controls[key].$name;
            var serverMessage = $parse(formElem.$name + '.' + fieldName + '.$error.serverMessage');
            //var model = $parse(formElem.$name + '.' + fieldName);
            formElem.$setValidity(fieldName, true, formElem);
            serverMessage.assign($scope, undefined);
            //model.assign($scope, undefined);
        }

        console.log('formname = ' + formElem.$name);

        $('form[name=' + formElem.$name + '] :input').each(function () {
            var input = $(this); // This is the jquery object of the input, do what you will

            input.val('');
            input.trigger('input'); // Use for Chrome/Firefox/Edge
            input.trigger('change'); // Use for Chrome/Firefox/Edge + IE11
        });
    };

    $scope.storeNewApp = function (currModel) {

        console.log(currModel);
        //$scope.$apply();
        setLoadingButton('.async-save', true, 'Opslaan');
        //console.log( currModel.access_token.$modelValue);
        var req = {
            method: 'POST',
            url: './create-app',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                'access_token': currModel.access_token.$modelValue,
                'server_token': currModel.server_token.$modelValue,
                'title': currModel.title.$modelValue
            }
        };

        $http(req).then(function (data) {

            console.log('success');

            console.log(data);

            $scope.parseServerMessages(data.config.data, data.config.data, data.status, currModel);

            setLoadingButton('.async-save', false, 'Opslaan');

            $scope.newAppTrigger(currModel);

            $scope.getUserApps(1);
        }).catch(function (data) {
            console.log('error');

            $scope.parseServerMessages(data.data, data.config.data, data.status, currModel);

            setLoadingButton('.async-save', false, 'Opslaan');
        });
    };

    $scope.getUserApps = function (pagenumber) {
        $scope.loadingApps = true;
        if (typeof $scope.pageNumber == 'undefined' || $scope.pageNumber == '') {
            $scope.pageNumber = 1;
        }

        if (typeof pagenumber != 'undefined') {
            $scope.pageNumber = pagenumber;
            $scope.apps = undefined;
        }
        var apiURL = './get-user-apps';

        $http.get(apiURL + '?page=' + $scope.pageNumber).then(function (data) {
            // console.log(data);
            if (data.data.data.length == 0) {
                $scope.latestPost = true;
            } else {
                $scope.latestPost = false;

                if (typeof $scope.apps == 'undefined') {
                    $scope.apps = data.data.data;
                } else {
                    var currentAppsOnScreen = $scope.apps;
                    var concattedArray = $scope.apps.concat(data.data.data);
                    $scope.apps = concattedArray;
                }
            }
            $scope.loadingApps = false;
        }).catch(function (data) {});
        $scope.pageNumber += 1;
    };

    $scope.$on("atBottomOfElem", function () {
        $scope.getUserApps();
    });
});

/***/ })
/******/ ]);