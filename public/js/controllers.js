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

__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);
__webpack_require__(9);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(12);
module.exports = __webpack_require__(13);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * Created by Rowan on 11-11-2017.
 */
angular.module('botApp').controller("navController", function ($scope, $http, $parse) {

    $scope.navInit = function () {
        $scope.checkActiveApp();
        $scope.createBreadCrumbs();
    };

    $scope.toggleDashboardNavigation = function () {

        if ($('.center-navigation').css('display') == 'none') {
            $('.center-navigation').css('display', 'block');
        } else {
            $('.center-navigation').css('display', 'none');
        };
    };
    $scope.checkActiveApp = function () {
        var req = {
            method: 'GET',
            url: ajaxAppSessionURL,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            }

        };

        $http(req).then(function (data) {

            $scope.activeApp = data.data.title;
            $scope.createBreadCrumbs();
        }).catch(function (data) {});
    };

    $scope.changeActiveApp = function (data) {

        $scope.activeApp = data.title;
    };

    $scope.createBreadCrumbs = function () {
        $scope.rawBreadCrumbs = currentPath.split('/');

        $scope.breadCrumbs = [];
        var rawRenderedCrumbs = [];
        for (var i = 0; i < $scope.rawBreadCrumbs.length; i++) {
            rawRenderedCrumbs.push($scope.rawBreadCrumbs[i]);
            var currentCrumb = rawRenderedCrumbs;

            $scope.breadCrumbs.push({
                href: defaultURL + '/' + currentCrumb.join('/'),
                text: $scope.rawBreadCrumbs[i]
            });

            if ($scope.rawBreadCrumbs[i].toLowerCase() == 'dashboard') {
                if (typeof $scope.activeApp != 'undefined') {
                    $scope.breadCrumbs.push({
                        href: defaultURL + '/' + currentCrumb.join('/'),
                        text: $scope.activeApp
                    });
                }
            }
        }
    };
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

angular.module('botApp').controller("appController", function ($rootScope, $scope, $http, $parse, shrinkLoading, buttonLoading) {

    $scope.newAppTrigger = function (formElem) {

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

    $scope.resetForm = function (formElem) {

        for (var key in formElem.$$controls) {

            var fieldName = formElem.$$controls[key].$name;
            var serverMessage = $parse(formElem.$name + '.' + fieldName + '.$error.serverMessage');
            //var model = $parse(formElem.$name + '.' + fieldName);
            formElem.$setValidity(fieldName, true, formElem);
            serverMessage.assign($scope, undefined);
            //model.assign($scope, undefined);
        }

        $('form[name=' + formElem.$name + '] :input').each(function () {
            var input = $(this); // This is the jquery object of the input, do what you will

            input.val('');
            input.trigger('input'); // Use for Chrome/Firefox/Edge
            input.trigger('change'); // Use for Chrome/Firefox/Edge + IE11
        });
    };
    $scope.deleteAppTrigger = function (id) {
        $scope.deleteID = id;

        $scope.showDeleteApp = !$scope.showDeleteApp;
    };

    $scope.checkWitConnection = function (succesCallback, errorCallback) {
        var req = {
            method: 'POST',
            url: './check-wit-connection',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            }
        };

        $http(req).then(function (data) {

            var response = data.data;

            if (typeof response.code != 'undefined') {
                if (response.code == 'no-auth') {
                    errorCallback(response.error);
                } else {
                    succesCallback();
                }
            } else {
                succesCallback();
            }
        }).catch(function (data) {

            var response = data.data;
            if (typeof response.code != 'undefined') {
                if (response.code == 'no-auth') {
                    errorCallback(response.error);
                } else {
                    succesCallback();
                }
            } else {
                succesCallback();
            }
        });
    };

    $scope.deleteApp = function (event, id) {
        buttonLoading.do($('.danger-btn'), 'loading');
        var req = {
            method: 'POST',
            url: './delete-app',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                id: id
            }
        };

        $http(req).then(function (data) {

            buttonLoading.do($('.danger-btn'), 'success');

            $scope.getUserApps(1);
            $scope.showDeleteApp = !$scope.showDeleteApp;
        }).catch(function (data) {

            buttonLoading.do($('.danger-btn'), 'error');
        });
    };
    $scope.updateApp = function (updateData, currentElement) {
        var req = {
            method: 'POST',
            url: './update-app',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: updateData
        };

        $http(req).then(function (data) {

            shrinkLoading.do(currentElement, 'success');
        }).catch(function (data) {

            shrinkLoading.do(currentElement, 'error');
        });
    };
    $scope.storeNewApp = function (currModel) {

        buttonLoading.do($('.async-save'), 'loading');

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

            $scope.parseServerMessages(data.config.data, data.config.data, data.status, currModel);

            buttonLoading.do($('.async-save'), 'success');

            $scope.newAppTrigger(currModel);

            $scope.getUserApps(1);
        }).catch(function (data) {

            $scope.parseServerMessages(data.data, data.config.data, data.status, currModel);

            buttonLoading.do($('.async-save'), 'error');
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
    $scope.$on("repeatReady", function () {});

    $scope.inputEnter = function (currentElement, currentScope) {

        var inputObject = {};
        inputObject[currentElement.attr('name')] = currentElement.val();
        inputObject['id'] = currentScope.app.id;

        shrinkLoading.do(currentElement, 'loading');
        $scope.updateApp(inputObject, currentElement);
    };

    $scope.selectApp = function (event, app, apps, index, force) {

        if (!force) {
            buttonLoading.do($(event.currentTarget), 'loading');
        }

        var req = {
            method: 'POST',
            url: './select-app',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: app
        };

        $http(req).then(function (data) {
            var appData = data.data;
            if (!force) {

                $scope.checkWitConnection(function () {
                    $rootScope.$emit("toggleApp", appData);
                    buttonLoading.do($(event.currentTarget), 'success');
                }, function (error) {
                    $scope.clearAppSession();
                    buttonLoading.do($(event.currentTarget), 'error');
                    $scope.apps[index]['errors'] = ['Wit.ai response: ' + error];
                });
            } else {
                $rootScope.$emit("toggleApp", appData);
                delete $scope.apps[index]['errors'];
            }
        }).catch(function (data) {
            if (!force) {
                buttonLoading.do($(event.currentTarget), 'error');
            }
        });
    };
    $scope.clearAppSession = function () {
        var req = {
            method: 'POST',
            url: './clear-session',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }

        };

        $http(req).then(function (data) {

            $rootScope.$emit("toggleApp", {
                unique_id: null,
                title: null
            });
        }).catch(function (data) {});
    };
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

angular.module('botApp').controller("dialogueController", function ($scope, $http, $parse, shrinkLoading, buttonLoading) {

    $scope.newDialogueTrigger = function (formElem) {

        $scope.showCreateDialogue = !$scope.showCreateDialogue;
        $scope.resetForm(formElem);
    };
    $scope.resetForm = function (formElem) {

        for (var key in formElem.$$controls) {

            var fieldName = formElem.$$controls[key].$name;
            var serverMessage = $parse(formElem.$name + '.' + fieldName + '.$error.serverMessage');
            formElem.$setValidity(fieldName, true, formElem);
            serverMessage.assign($scope, undefined);
        }

        $('form[name=' + formElem.$name + '] :input').each(function () {
            var input = $(this); // This is the jquery object of the input, do what you will

            input.val('');
            input.trigger('input'); // Use for Chrome/Firefox/Edge
            input.trigger('change'); // Use for Chrome/Firefox/Edge + IE11
        });
    };

    $scope.storeNewDialogue = function (currModel) {

        buttonLoading.do($('.async-save'), 'loading');

        var req = {
            method: 'POST',
            url: '../create-dialogue',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                'description': currModel.description.$modelValue,
                'title': currModel.title.$modelValue
            }
        };

        $http(req).then(function (data) {

            $scope.parseServerMessages(data.config.data, data.config.data, data.status, currModel);

            buttonLoading.do($('.async-save'), 'success');

            $scope.newDialogueTrigger(currModel);

            $scope.getDialogues(1);
        }).catch(function (data) {

            $scope.parseServerMessages(data.data, data.config.data, data.status, currModel);

            buttonLoading.do($('.async-save'), 'error');
        });
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
    $scope.getDialogues = function (pagenumber) {
        $scope.loadingDialogues = true;
        if (typeof $scope.pageNumber == 'undefined' || $scope.pageNumber == '') {
            $scope.pageNumber = 1;
        }

        if (typeof pagenumber != 'undefined') {
            $scope.pageNumber = pagenumber;
            $scope.dialogues = undefined;
        }
        var apiURL = '../get-dialogues';

        $http.get(apiURL + '?page=' + $scope.pageNumber).then(function (data) {

            if (data.data.data.length == 0) {
                $scope.latestPost = true;
            } else {
                $scope.latestPost = false;

                if (typeof $scope.dialogues == 'undefined') {
                    $scope.dialogues = data.data.data;
                } else {

                    var concattedArray = $scope.dialogues.concat(data.data.data);
                    $scope.dialogues = concattedArray;
                }
            }
            $scope.loadingDialogues = false;
        }).catch(function (data) {});
        $scope.pageNumber += 1;
    };

    $scope.$on("atBottomOfElem", function () {
        $scope.getDialogues();
    });

    $scope.inputEnter = function (currentElement, currentScope) {

        var inputObject = {};
        inputObject[currentElement.attr('name')] = currentElement.val();
        inputObject['id'] = currentScope.dialogue.id;

        shrinkLoading.do(currentElement, 'loading');
        $scope.updateDialogue(inputObject, currentElement);
    };

    $scope.deleteDialogue = function (event, id) {
        buttonLoading.do($('.danger-btn'), 'loading');
        var req = {
            method: 'POST',
            url: '../delete-dialogue',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                id: id
            }
        };

        $http(req).then(function (data) {

            buttonLoading.do($('.danger-btn'), 'success');
            $scope.getDialogues(1);
            $scope.showDeleteDialogue = !$scope.showDeleteDialogue;
        }).catch(function (data) {
            buttonLoading.do($('.danger-btn'), 'error');
        });
    };
    $scope.deleteDialogueTrigger = function (id) {
        $scope.deleteID = id;

        $scope.showDeleteDialogue = !$scope.showDeleteDialogue;
    };
    $scope.updateDialogue = function (updateData, currentElement) {
        var req = {
            method: 'POST',
            url: '../update-dialogue',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: updateData
        };

        $http(req).then(function (data) {

            shrinkLoading.do(currentElement, 'success');
        }).catch(function (data) {

            shrinkLoading.do(currentElement, 'error');
        });
    };

    $scope.selectDialogue = function (dialogue) {
        var req = {
            method: 'POST',
            url: '../select-dialogue',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: dialogue
        };

        $http(req).then(function (data) {

            // $rootScope.$emit("toggleApp", data.data);

            window.location = './dialogen/diagram';
        }).catch(function (data) {});
    };
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

angular.module('botApp').controller("intentController", function ($rootScope, $scope, $http, $parse, shrinkLoading, buttonLoading) {

    $scope.activeStateID = null;

    $scope.toggleNewIntent = function (show) {

        if (show) {
            $scope.newIntent = true;
        } else if (!show) {
            $scope.newIntent = false;
        }
    };

    $scope.getIntent = function (inputObj, currentElement) {
        var req = {
            method: 'POST',
            url: '../../get-intent',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: inputObj
        };

        $http(req).then(function (data) {
            // shrinkLoading.do(currentElement, 'success');
        }).catch(function (data) {

            //  shrinkLoading.do(currentElement, 'error');
        });
    };

    $scope.getAvailableIntent = function (inputObj, currentElement) {
        $scope.searchingIntent = true;
        var req = {
            method: 'POST',
            url: '../../get-intent-wit',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: inputObj
        };

        $http(req).then(function (data) {
            $scope.searchingIntent = false;
            if (typeof data.data.entities.intent[0] != 'undefined') {
                shrinkLoading.do(currentElement, 'success');
                $scope.intentSearchValue = data.data.entities.intent[0].value;
                $scope.intentSearchConf = Math.round(data.data.entities.intent[0].confidence * 100);
                $scope.newIntent = false;
                $scope.intentSearchResult = true;
            } else {
                $scope.newIntent = true;
                $scope.intentSearchResult = false;
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }).catch(function (data) {
            $scope.searchingIntent = false;
            shrinkLoading.do(currentElement, 'error');
            $scope.newIntent = true;
            $scope.intentSearchResult = false;
        });
    };

    $scope.addNewIntent = function (intentValue, intentExpression, event) {
        $scope.newIntentValue = '';

        if (typeof event != 'undefined') {
            buttonLoading.do($(event.currentTarget), 'loading');
        }

        var intentObj = {
            value: intentValue,
            expressions: [intentExpression]
        };

        var req = {
            method: 'POST',
            url: '../../add-intent-wit',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                new_intent: intentObj
            }
        };

        $http(req).then(function (data) {

            if (data.status == 200) {
                if (typeof data.data.code != 'undefined') {
                    if (data.data.code == 'bad-request') {
                        buttonLoading.do($(event.currentTarget), 'error');
                        $scope.intentData['error'] = [['Wit reponse: ' + data.data.error]];
                        return;
                    }
                }
                $scope.intentData['state_intent_data']['name'] = intentExpression;
                $scope.intentData['intent'] = intentValue;
                $scope.intentSearchValue = intentValue;
                /* $('#intent-title').trigger('changeOperatorTitle', [intentExpression, $scope.activeStateID, true]);
                 $scope.resetIntentSearch();*/

                if (typeof event != 'undefined') {
                    buttonLoading.do($(event.currentTarget), 'success');
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }

                $scope.saveIntentLocal();
            } else {
                buttonLoading.do($(event.currentTarget), 'error');
            }
        }).catch(function (data) {
            if (typeof event != 'undefined') {
                buttonLoading.do($(event.currentTarget), 'error');
            }
        });
    };

    $scope.saveKeywordLocal = function (currentElement, currentScope) {
        // var inputObject = {};
        //  inputObject[currentElement.attr('name')] = currentElement.val();

        shrinkLoading.do(currentElement, 'loading');

        var req = {
            method: 'POST',
            url: '../../save-keyword-local',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                keyword: $scope.intentData['keyword'],
                state_id: $scope.activeStateID,
                name: $scope.intentData['keyword']
            }
        };

        $http(req).then(function (data) {

            $('#intent-title').trigger('changeOperatorTitle', [data.data.keyword, $scope.activeStateID, true]);
            shrinkLoading.do(currentElement, 'success');

            if (typeof $scope.intentData['state_intent_data'] == 'undefined') {
                $scope.intentData['state_intent_data'] = {};
            }
            $scope.intentData['state_intent_data']['name'] = data.data.keyword;

            $scope.resetIntentSearch();
        }).catch(function (data) {

            shrinkLoading.do(currentElement, 'error');
        });
    };

    $scope.saveIntentLocal = function (inputObj, currentElement) {

        var req = {
            method: 'POST',
            url: '../../save-intent-local',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                user_input_intent: $scope.intentData['state_intent_data']['name'],
                intent: $scope.intentSearchValue,
                state_id: $scope.activeStateID,
                name: $scope.intentData['state_intent_data']['name']
            }
        };

        $http(req).then(function (data) {
            $scope.intentData['state_intent_data']['name'] = data.data.state_data.name;
            $scope.intentData['intent'] = data.data.intent;
            $('#intent-title').trigger('changeOperatorTitle', [data.data.state_data.name, $scope.activeStateID, true]);
            $scope.resetIntentSearch();

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }).catch(function (data) {});
    };

    $scope.popupOpen = function (state_id) {

        $scope.activeStateID = state_id;
        $scope.renderIntentOptions();
        $scope.getIntentState(state_id);
    };

    $scope.popupClose = function () {

        $('#flowchart-popup').addClass('hidden');

        /* make sure deletebutton isnt present on load */
        $('.hide-load').addClass('hidden');
        $rootScope.$emit("toggleIntentTraining", { intent: null, toggle: 'close' });
    };

    /* TODO make better way of rendering options */
    $scope.renderIntentOptions = function () {
        $scope.intentTypeOptions = [{
            id: 1, value: 'Intentie'
        }, {
            id: 2, value: 'Exact woord'
        }, {
            id: 3, value: 'Vrije input'
        }];
    };

    $scope.getIntentState = function (stateID) {
        $scope.hideIntentFooter = true;
        $scope.intentData = null;
        var req = {
            method: 'POST',
            url: '../../get-state-intent',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                state_id: stateID
            }
        };

        $http(req).then(function (data) {

            $scope.updateFullPopUp(data, 'open');
            $scope.hideIntentFooter = false;
        }).catch(function (data) {});
    };
    $scope.resetIntentSearch = function () {
        $scope.intentSearchResult = false;
        $scope.newIntent = false;
        $scope.intentSearchValue = null;
        $scope.intentSearchConf = null;
    };

    $scope.saveParameterLocal = function (currentElement, currentScope) {
        // var inputObject = {};
        //  inputObject[currentElement.attr('name')] = currentElement.val();

        shrinkLoading.do(currentElement, 'loading');

        var req = {
            method: 'POST',
            url: '../../save-parameter-local',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                parameter: $scope.intentData['parameter'],
                state_id: $scope.activeStateID,
                name: $scope.intentData['parameter']
            }
        };

        $http(req).then(function (data) {

            $('#intent-title').trigger('changeOperatorTitle', [data.data.parameter, $scope.activeStateID, true]);
            shrinkLoading.do(currentElement, 'success');

            if (typeof $scope.intentData['state_intent_data'] == 'undefined') {
                $scope.intentData['state_intent_data'] = {};
            }
            $scope.intentData['state_intent_data']['name'] = data.data.parameter;
            $scope.resetIntentSearch();
        }).catch(function (data) {

            shrinkLoading.do(currentElement, 'error');
        });
    };
    $scope.updateFullPopUp = function (data, openOrClose) {

        /* make sure deletebutton isnt present on load */
        $('.hide-load').removeClass('hidden');

        $scope.resetIntentSearch();

        if (openOrClose == 'open') {

            $scope.intentData = data.data;

            if (typeof data.data != 'undefined') {
                angular.forEach($scope.intentData.state_intent_answers, function (member, index) {
                    //Just add the index to your item
                    $scope.intentData.state_intent_answers[index].index = index;
                });
                $scope.intentID = typeof data.data.id != 'undefined' ? data.data.id : '';
                $scope.typeSetter(data.data['response_type']);
                $scope.intentData.id;
                $scope.selectedIntentType = $scope.intentData.intent_type;
            } else {
                $scope.intentData = {};
            }
        } else {
            $scope.intentData = {};
            $scope.activeStateID = '';
        }
    };
    $scope.removeActiveIntent = function () {

        var req = {
            method: 'POST',
            url: '../../delete-active-intent',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                intent_id: $scope.intentData.id,
                state_id: $scope.activeStateID
            }
        };

        $http(req).then(function (data) {

            $scope.intentData.intent = null;
            // $scope.intentData.state_intent_data.name = data.data.default_state_name;
            $('#intent-title').trigger('changeOperatorTitle', [$scope.intentData.state_intent_data.name, $scope.activeStateID]);
        }).catch(function (data) {});
    };
    $scope.addQuickReply = function () {
        if (typeof $scope.intentData['state_intent_answers'] == 'undefined' || $scope.intentData['state_intent_answers'] == '') {
            $scope.intentData['state_intent_answers'] = [];
        }
        var currentAnswerIndex = $scope.intentData['state_intent_answers'].push({
            state_intents_id: $scope.intentData.id,
            answer: '',
            answer_type: 2
        }) - 1;

        $scope.intentData.state_intent_answers[currentAnswerIndex]['index'] = currentAnswerIndex;
    };

    $scope.saveAnswer = function (currentElement, currentModel, type, currentIndex, test) {

        shrinkLoading.do(currentElement, 'loading');

        if (typeof currentModel.state_intent_answers[currentIndex] != 'undefined' && currentModel.state_intent_answers[currentIndex].hasOwnProperty('id')) {
            var currentAnswerID = currentModel.state_intent_answers[currentIndex].id;
        } else {
            var currentAnswerID = null;
        }

        var req = {
            method: 'POST',
            url: '../../save-intent-answer',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                state_id: $scope.activeStateID,
                state_intents_id: currentModel.id,
                id: currentAnswerID,
                answer: currentElement.val(),
                answer_type: type
            }
        };

        $http(req).then(function (data) {

            shrinkLoading.do(currentElement, 'success');

            setTimeout(function () {
                if (typeof currentModel.state_intent_answers[currentIndex] != 'undefined') {
                    currentModel.state_intent_answers[currentIndex]['id'] = data.data.id;
                    currentModel.state_intent_answers[currentIndex]['state_intents_id'] = data.data.state_intents_id;
                }

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }, 500);
        }).catch(function (data) {
            shrinkLoading.do(currentElement, 'error');
        });
    };

    $scope.addAction = function (currentElement, currentModel, value) {

        shrinkLoading.do(currentElement, 'loading');

        var req = {
            method: 'POST',
            url: '../../add-intent-action',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                state_id: $scope.activeStateID,
                intent_id: currentModel.intentID,
                action: currentModel.intentData.action

            }
        };

        $http(req).then(function (data) {
            shrinkLoading.do(currentElement, 'success');
        }).catch(function (data) {
            shrinkLoading.do(currentElement, 'error');
        });
    };
    $scope.addAnswer = function () {
        if (typeof $scope.intentData.state_intent_answers == 'undefined' || $scope.intentData.state_intent_answers == '') {
            $scope.intentData['state_intent_answers'] = [];
        }
        var currentAnswerIndex = $scope.intentData.state_intent_answers.push({
            state_intents_id: $scope.intentData.id,
            answer: '',
            answer_type: 1
        }) - 1;

        $scope.intentData.state_intent_answers[currentAnswerIndex]['index'] = currentAnswerIndex;
    };
    $scope.updateIntentType = function (state_id, type) {
        $scope.hideIntentFooter = true;
        $scope.intentData = null;
        var req = {
            method: 'POST',
            url: '../../update-state-intent-type',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                type: type,
                state_id: state_id
            }
        };

        $http(req).then(function (data) {

            if (data.status == 200) {

                $(document).trigger('changeOperatorClass', [type, $scope.activeStateID]);
                $('#intent-title').trigger('changeOperatorTitle', [data.data.name, $scope.activeStateID]);
                $scope.getIntentState(state_id);
            }
        }).catch(function (data) {
            $scope.hideIntentFooter = false;
        });
    };

    $scope.updateType = function () {

        //response type
        var req = {
            method: 'POST',
            url: '../../update-state-type',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                type: $scope.typeChecker(),
                state_id: $scope.activeStateID
            }
        };

        $http(req).then(function (data) {}).catch(function (data) {});
    };
    $scope.typeChecker = function () {
        var type = 0;
        if ($scope.hasBackend) {
            type = 5;
        } else if ($scope.hasIntentAnswers && $scope.hasQuickReplies) {
            type = 4;
        } else if ($scope.hasIntentAnswers) {
            type = 2;
        } else if ($scope.hasQuickReplies) {
            type = 3;
        } else {
            type = 1; //no answers;
        }

        return type;
    };

    $scope.typeSetter = function (type) {

        switch (type) {
            case 1:
                //no answers
                $scope.hasIntentAnswers = false;
                $scope.hasQuickReplies = false;
                $scope.hasBackend = false;
                break;
            case 2:
                //intent
                $scope.hasIntentAnswers = true;
                $scope.hasQuickReplies = false;
                $scope.hasBackend = false;
                break;
            case 3:
                //quickreplies
                $scope.hasIntentAnswers = false;
                $scope.hasQuickReplies = true;
                $scope.hasBackend = false;
                break;

            case 4:
                // answers and quickreplies
                $scope.hasIntentAnswers = true;
                $scope.hasQuickReplies = true;
                $scope.hasBackend = false;
                break;

            case 5:
                //backend
                $scope.hasIntentAnswers = false;
                $scope.hasQuickReplies = false;
                $scope.hasBackend = true;
                break;

            default:
                $scope.hasIntentAnswers = false;
                $scope.hasQuickReplies = false;
                $scope.hasBackend = false;
                break;
        }
    };

    $scope.deleteAnswer = function (event, currentModel, answerID, index) {

        var req = {
            method: 'POST',
            url: '../../delete-intent-answer',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                answer_id: answerID
            }
        };

        $http(req).then(function (data) {

            currentModel.state_intent_answers.splice(index, 1);

            angular.forEach($scope.intentData.state_intent_answers, function (member, index) {
                //Just add the index to your item
                $scope.intentData.state_intent_answers[index].index = index;
            });
            //event.currentTarget.closest('.form-group').remove();
        }).catch(function (data) {});
    };

    $scope.inputEnterSearchIntent = function (currentElement, currentScope) {
        $scope.newIntent = false;
        $scope.intentSearchResult = false;

        var inputObject = {};
        inputObject[currentElement.attr('name')] = currentElement.val();

        shrinkLoading.do(currentElement, 'loading');

        $scope.getAvailableIntent(inputObject, currentElement);
    };
    $scope.inputEnter = function (currentElement, currentScope) {

        var inputObject = {};
        inputObject[currentElement.attr('name')] = currentElement.val();
        //inputObject['id'] = currentScope.dialogue.id;


        shrinkLoading.do(currentElement, 'loading');
        $scope.getIntent(inputObject, currentElement);
    };

    $scope.getIntentData = function () {
        $rootScope.$emit("toggleIntentTraining", { intent: $scope.intentData.intent, toggle: 'open' });
    };

    /* jQuery required because modal is not in controller; TODO: better option required */
    $scope.toggleDelete = function (toggleEvent) {
        if (toggleEvent) {
            $('.delete-state').removeClass('hidden');
            $('.modal-overlay').removeClass('hidden');
        } else {
            $('.delete-state').addClass('hidden');
            $('.modal-overlay').addClass('hidden');
        }
    };

    $('.delete-state-button').click(function () {
        $scope.deleteState($scope.activeStateID);
    });

    $('.exit-delete-state').click(function () {
        $scope.toggleDelete(false);
    });
    $scope.deleteState = function (state_id) {
        $(document).trigger('deleteState', [state_id]);
        setTimeout(function () {
            $scope.toggleDelete(false);
        }, 500);
    };
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

angular.module('botApp').controller("intentTrainController", function (buttonLoading, $rootScope, $scope, $http, $parse, shrinkLoading, $compile) {

    $scope.toggleTrainingPopup = function (data) {
        $scope.newExpression = '';
        if (data.toggle == 'open') {
            $scope.intentValueData = null;
            $scope.showTrainingPopup = true;

            $scope.getIntentDataWit(data.intent);
        } else if (data.toggle == 'close') {

            $scope.showTrainingPopup = false;
            $rootScope.$emit("toggleIntentEntity", { toggle: 'close' });
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
    };

    $scope.getEntity = function (event) {

        var relativeY = $(event.currentTarget).offset().top - 235;
        var relativeX = $(event.currentTarget).offset().left - 110;
        var entity = $(event.currentTarget).attr('data-entity-name');
        var value = $(event.currentTarget).text();
        $rootScope.$emit("toggleIntentEntity", {
            toggle: 'open',
            top: relativeY,
            left: relativeX,
            entity: entity,
            value: value,
            element: event.currentTarget
        });
    };

    $scope.getIntentDataWit = function (intent, callback) {
        $scope.searchingIntents = true;
        var req = {
            method: 'POST',
            url: defaultURL + '/get-intent-data-wit',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                intent: intent
            }
        };

        $http(req).then(function (data) {

            $scope.intentValueData = data.data;

            if (typeof callback != 'undefined') {
                callback('success');
            }
            $scope.searchingIntents = false;
        }).catch(function (data) {
            if (typeof callback != 'undefined') {
                callback('error');
            }
            $scope.searchingIntents = false;
        });
    };
    $scope.checkExpressionsForEntities = function (expressions, $event) {
        buttonLoading.do($($event.currentTarget), 'loading');

        for (var keyExpression in expressions) {
            if (!expressions.hasOwnProperty(keyExpression)) continue;
            setTimeout(function (currKey) {
                $scope.checkEntityInIntent(expressions[currKey], currKey);
            }.bind(this, keyExpression), 500);
        }
        setTimeout(function () {
            buttonLoading.do($($event.currentTarget), 'success');
        }, 2000);
    };

    $scope.checkEntityInIntent = function (intentValue, index) {
        var req = {
            method: 'POST',
            url: defaultURL + '/get-intent-entity-data-wit',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                intent_value: intentValue
            }
        };

        $http(req).then(function (data) {

            var intentSelector = '#intent_' + index;

            $scope.updateIntentEntityHtml(data.data.entities, intentSelector);
        }).catch(function (data) {});
    };
    $scope.saveIntentValue = function (currentElement, currentScope) {
        shrinkLoading.do(currentElement, 'loading');
    };
    $scope.updateIntentEntityHtml = function (witData, domSelector) {

        if (typeof witData != 'undefined') {

            for (var key in witData) {
                // skip loop if the property is from prototype
                if (!witData.hasOwnProperty(key)) continue;

                if (key != 'intent') {

                    for (var entityKey in witData[key]) {

                        var entityObj = witData[key];
                        if (!entityObj.hasOwnProperty(entityKey)) continue;

                        if (typeof entityObj[entityKey]._body != 'undefined') {
                            var fullHtml = $(domSelector).html();
                            var replaceHtml = fullHtml.replace(entityObj[entityKey]._body, "<span data-entity-name='" + key + "' data-last-index='" + entityObj[entityKey]._end + "'  data-first-index='" + entityObj[entityKey]._start + "'  class='entity-span' ng-click='getEntity($event)'>" + entityObj[entityKey]._body + "</span>");

                            $(domSelector).html(replaceHtml);

                            $compile($(domSelector))($scope);
                        }
                    }
                }
            }
        }

        //var fullHtml = $(domSelector).html();
        // var replaceHtml = fullHtml.replace(selectedText, "<span style='background:red'>" + selectedText + "</span>");
    };

    $scope.deleteExpression = function ($event, $index, valueData) {
        buttonLoading.do($($event.currentTarget), 'loading');
        var req = {
            method: 'POST',
            url: defaultURL + '/delete-entity-expression',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: 'intent',
                value: valueData.value,
                expression: valueData.expressions[$index]
            }
        };

        $http(req).then(function (data) {
            if (data.status == 200) {
                buttonLoading.do($($event.currentTarget), 'success');
                $scope.getIntentDataWit($scope.intentValueData.value);
            }
        }).catch(function (data) {
            buttonLoading.do($($event.currentTarget), 'error');
        });
    };

    $scope.refreshExpressions = function ($event, valueData) {
        $scope.intentValueData.expressions = null;
        buttonLoading.do($($event.currentTarget), 'loading');
        $scope.getIntentDataWit($scope.intentValueData.value, function (data) {
            if (data == 'success') {
                buttonLoading.do($($event.currentTarget), 'success');
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            } else if (data == 'error') {
                buttonLoading.do($($event.currentTarget), 'error');
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        });
    };
    $scope.selectedIntentText = function ($event) {

        var tempClass = 'temp-' + guidGenerator();
        var tempClassSelector = '.' + tempClass;

        if (typeof tempClass != 'undefined') {
            var selectionRange = textSelection(tempClass, $event.currentTarget);
        }

        if (typeof selectionRange != 'undefined' && selectionRange != null) {

            if (!selectionRange.hasOwnProperty('start') && typeof selectionRange.start == null) {
                return;
            }

            var addedElement = $(tempClassSelector);

            addedElement.attr('data-first-index', selectionRange.start);
            addedElement.attr('data-last-index', selectionRange.end);
            addedElement.attr('ng-click', 'getEntity($event)');

            $compile($($event.currentTarget))($scope);

            var relativeY = $(tempClassSelector).offset().top - 235;
            var relativeX = $(tempClassSelector).offset().left - 110;

            $rootScope.$emit("toggleIntentEntity", {
                toggle: 'open',
                top: relativeY,
                left: relativeX,
                value: $(tempClassSelector).text(),
                element: tempClassSelector
            });
        }
    };

    $scope.addExpressionToIntent = function (currentElement, currentScope) {
        shrinkLoading.do(currentElement, 'loading');

        var trainObj = {
            text: currentScope.newExpression,
            entities: [{
                entity: 'intent',
                value: $scope.intentValueData.value
            }]
        };

        $scope.trainExpression(null, currentElement, trainObj);
    };

    $scope.trainExpression = function (event, currentElement, singleExpressionObj) {
        if (event != null && event.hasOwnProperty('currentTarget')) {
            buttonLoading.do($(event.currentTarget), 'loading');
        }

        if (!currentElement && !singleExpressionObj) {

            var trainElement = $(event.target.parentElement).find('.styled-input');
            var currentIntent = $scope.intentValueData.value;
            var trainObject = $scope.convertSentenceToTrainObj(trainElement, currentIntent);
        } else {
            var trainObject = singleExpressionObj;
        }

        //setLoadingButton(event.currentTarget, true, 'Train');


        var req = {
            method: 'POST',
            url: defaultURL + '/train-intent',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                train_object: trainObject
            }
        };

        $http(req).then(function (data) {
            if (event != null && event.hasOwnProperty('currentTarget')) {
                buttonLoading.do($(event.currentTarget), 'success');
            }
            if (currentElement && data.data.sent == true) {

                setTimeout(function () {

                    $scope.getIntentDataWit($scope.intentValueData.value);
                    shrinkLoading.do(currentElement, 'success');
                }, 1500);
            } else {
                /*   if(event.hasOwnProperty('currentTarget')){
                       buttonLoading.do($(event.currentTarget), 'error');
                   }*/
                if (currentElement) {
                    shrinkLoading.do(currentElement, 'error');
                }
            }
        }).catch(function (data) {
            if (event != null && event.hasOwnProperty('currentTarget')) {
                buttonLoading.do($(event.currentTarget), 'error');
            }
            if (currentElement) {
                shrinkLoading.do(currentElement, 'error');
            }
        });
    };

    $scope.convertSentenceToTrainObj = function (trainElement, currentIntent) {

        var allSpans = trainElement.find('span');

        var trainObj = {
            text: trainElement.text(),
            entities: [{
                entity: 'intent',
                value: currentIntent
            }]
        };

        if (allSpans.length > 0) {
            for (var i = 0; i < allSpans.length; i++) {
                var currentSpan = $(allSpans[i]);
                trainObj.entities.push({
                    entity: currentSpan.attr('data-entity-name'),
                    start: parseInt(currentSpan.attr('data-first-index')),
                    end: parseInt(currentSpan.attr('data-last-index')),
                    value: currentSpan.text()
                });
            }
            return trainObj;
        } else {
            return null;
        }
    };
});

function guidGenerator() {
    var S4 = function S4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    };
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

String.prototype.replaceBetween = function (start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};

function getSelectionContainerElement(selection) {
    var sel = selection,
        el = null;
    if (sel.rangeCount) {
        var range = sel.getRangeAt(0);
        el = range.commonAncestorContainer;
        if (el.nodeType != 1) {
            el = el.parentNode;
        }
    }
    return el;
}

function textSelection(tempClass, element) {
    if (window.getSelection && window.getSelection().toString().length > 0) {
        // not IE case
        var selObj = window.getSelection();
        var selRange = selObj.getRangeAt(0);

        var checkChilds = checkForDifferentNodes(selRange.cloneContents().childNodes);

        var selectedElement = getSelectionContainerElement(selObj);

        if (selectedElement.nodeName == 'DIV' && checkChilds) {
            var newElement = document.createElement("span");
            newElement.className = 'entity-span span-dark ' + tempClass;
            var documentFragment = selRange.extractContents();
            newElement.appendChild(documentFragment);
            selRange.insertNode(newElement);

            //offset within
            var range = selRange;
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.startContainer, range.startOffset);
            startOffset = preCaretRange.toString().length;
            endOffset = startOffset + range.toString().length;

            var returnRelativeRange = { start: startOffset, end: endOffset };

            selObj.removeAllRanges();

            return returnRelativeRange;
        } else {
            return null;
        }
    }
}

function checkForDifferentNodes(childnodes) {
    for (var i = 0; i < childnodes.length; i++) {
        if (childnodes[i].nodeName != '#text') {
            return false;
        }
    }

    return true;
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

angular.module('botApp').controller("intentEntityController", function ($rootScope, $scope, $http, $parse, shrinkLoading, $compile) {

    $scope.initEntity = function () {};

    $scope.showEnitityPopup = function (toggle) {

        if (toggle == 'open') {
            $('.fast-entity-popup').addClass('soft-show');

            $scope.popupIsOpen = true;
        } else if (toggle == 'close') {
            $('.fast-entity-popup').removeClass('soft-show');
            $scope.popupIsOpen = false;
            $scope.removeWhenNotAccepted();
        }
    };

    $scope.saveEntity = function () {

        $scope.selectedEntity = $(".entity-select option:selected").text();

        if ($scope.selectedEntity) {

            var element = $scope.currentSpan;
            $scope.entityName = $scope.selectedEntity;
            $(element).attr('data-entity-name', $scope.entityName);
            $scope.toggleEntityPopup({ toggle: 'close' });
        } else {}
    };
    $scope.toggleEntityPopup = function (data) {
        $scope.selectedEntity = null;

        if (data.toggle == 'open') {
            if (!$scope.popupIsOpen) {
                $scope.showEnitityPopup('open');
            } else {
                $scope.removeWhenNotAccepted();
            }
            $scope.getAllEntities();

            $scope.entityName = data.entity;
            $scope.entityValue = data.value;
            $scope.currentSpan = data.element;
            $($('.fast-entity-popup')).offset({
                top: data.top,
                left: data.left
            });
        } else if (data.toggle == 'close') {
            $scope.showEnitityPopup('close');
            /* $scope.showFastEntity = false;*/
            $scope.entityName = null;
            $scope.entityValue = null;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
    };

    $scope.removeWhenNotAccepted = function () {
        if (typeof $scope.entityName == 'undefined' || $scope.entityName == '') {
            var element = $scope.currentSpan;
            $(element).contents().unwrap();
        }
    };
    $scope.deleteEntity = function () {

        var element = $scope.currentSpan;
        $(element).contents().unwrap();
        $scope.showEnitityPopup('close');
    };

    $scope.getAllEntities = function () {
        var req = {
            method: 'GET',
            url: defaultURL + '/get-all-entities',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            }
        };

        $http(req).then(function (data) {

            $scope.allEntities = data.data;
        }).catch(function (data) {});
    };

    $(document).ready(function () {
        $('.entity-select').select2();
    });
});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

angular.module('botApp').controller("standardIntentController", function ($rootScope, $scope, $http, $parse, shrinkLoading, buttonLoading) {
    var $flowchartPopup = $('#flowchart-popup');
    var $flowchartPopupIntent = $('#flowchart-popup-intent');
    $flowchartPopupIntent.draggable({ cancel: '.styled-input, .fast-entity-popup, .new-expression-wrapper' });
    $flowchartPopup.draggable();

    $scope.toggleAnswers = function (id, event) {

        if ($scope.answersToggle != id) {
            $scope.answersToggle = id;

            setTimeout(function () {
                $(event.currentTarget).find('i').removeClass('fa-chevron-down');
                $(event.currentTarget).find('i').addClass('fa-chevron-up');
            }, 200);
        } else if ($scope.answersToggle == id) {
            $scope.answersToggle = false;

            setTimeout(function () {
                $(event.currentTarget).find('i').removeClass('fa-chevron-up');
                $(event.currentTarget).find('i').addClass('fa-chevron-down');
            }, 200);
        }
    };
    $scope.popupOpen = function (data, index) {

        $scope.initDataPopup(data, index);
        $scope.intentPopupToggle = true;
    };

    $scope.popupClose = function () {
        $scope.resetIntentSearch();
        $scope.intentPopupToggle = false;
        $rootScope.$emit("toggleIntentTraining", { intent: null, toggle: 'close' });
    };
    $scope.initDataPopup = function (data, index) {
        $scope.intentData = data;
    };
    $scope.deleteIntentTrigger = function (data, index) {
        $scope.showDeleteIntent = true;
        $scope.deleteIntentData = data;
        $scope.deleteIndex = index;
    };

    $scope.deleteIntent = function () {

        var req = {
            method: 'POST',
            url: '../delete-standard-intent',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                intent_id: $scope.deleteIntentData.id
            }

        };

        $http(req).then(function (data) {

            $scope.intents.splice($scope.deleteIndex, 1);
            $scope.deleteIndex = null;
            $scope.deleteIntentData = null;
            $scope.showDeleteIntent = false;

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }).catch(function (data) {
            $scope.showDeleteIntent = false;
        });
    };
    $scope.addNewStandard = function () {

        var req = {
            method: 'POST',
            url: '../add-new-standard',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            }

        };

        $http(req).then(function (data) {

            $scope.getAllIntents(1);
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }).catch(function (data) {});
    };

    $scope.getIntentData = function () {
        $rootScope.$emit("toggleIntentTraining", { intent: $scope.intentData.intent, toggle: 'open' });
    };

    $scope.getAllIntents = function (pagenumber) {
        $scope.loadingIntents = true;

        if (typeof $scope.pageNumber == 'undefined' || $scope.pageNumber == '') {
            $scope.pageNumber = 1;
        }

        if (typeof pagenumber != 'undefined') {
            $scope.pageNumber = pagenumber;
            $scope.intents = undefined;
        }

        var intentGetUrl = '../get-all-standard-intents';
        $http.get(intentGetUrl + '?page=' + $scope.pageNumber).then(function (data) {

            if (data.data.data.length == 0) {
                $scope.latestPost = true;
            } else {
                $scope.latestPost = false;

                if (typeof $scope.intents == 'undefined' || hardRefresh) {
                    $scope.intents = data.data.data;
                } else {

                    var concattedArray = $scope.intents.concat(data.data.data);
                    $scope.intents = concattedArray;
                }
            }
            $scope.loadingIntents = false;
        }).catch(function (data) {});
    };
    $scope.getAllIntents();
    $scope.inputEnterSearchIntent = function (currentElement, currentScope) {
        $scope.newIntent = false;
        $scope.intentSearchResult = false;

        var inputObject = {};
        inputObject[currentElement.attr('name')] = currentElement.val();

        shrinkLoading.do(currentElement, 'loading');

        $scope.getAvailableIntent(inputObject, currentElement);
    };

    $scope.getAvailableIntent = function (inputObj, currentElement) {

        var req = {
            method: 'POST',
            url: '../get-intent-wit',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: inputObj
        };

        $http(req).then(function (data) {

            if (typeof data.data.entities.intent[0] != 'undefined') {
                shrinkLoading.do(currentElement, 'success');
                $scope.intentSearchValue = data.data.entities.intent[0].value;
                $scope.intentSearchConf = Math.round(data.data.entities.intent[0].confidence * 100);
                $scope.newIntent = false;
                $scope.intentSearchResult = true;
            } else {
                $scope.newIntent = true;
                $scope.intentSearchResult = false;
            }
        }).catch(function (data) {

            shrinkLoading.do(currentElement, 'error');
            $scope.newIntent = true;
            $scope.intentSearchResult = false;
        });
    };
    $scope.resetIntentSearch = function () {
        $scope.intentSearchResult = false;
        $scope.newIntent = false;
        $scope.intentSearchValue = null;
        $scope.intentSearchConf = null;
        $scope.intentData.error = false;
    };

    $scope.saveIntent = function () {

        var req = {
            method: 'POST',
            url: '../save-standard-intent',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                intent: $scope.intentSearchValue,
                name: $scope.intentData.intent_data.name,
                intent_id: $scope.intentData.id
            }
        };

        $http(req).then(function (data) {

            $scope.intentData['intent'] = data.data.intent;
            $scope.resetIntentSearch();
        }).catch(function (data) {
            $scope.intentData.error = data.data;
        });
    };

    $scope.chooseIntent = function () {

        $scope.currentIntent = $scope.intentSearchValue;
    };

    $scope.removeActiveIntent = function (intentID) {
        var req = {
            method: 'POST',
            url: '../delete-active-standard-intent',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                intent_id: intentID

            }
        };

        $http(req).then(function (data) {

            $scope.intentData.intent = null;
            // $scope.intentData.state_intent_data.name = data.data.default_state_name;
            // $('#intent-title').trigger('changeOperatorTitle', [ $scope.intentData.state_intent_data.name, $scope.activeStateID]);
        }).catch(function (data) {});
    };

    $scope.deleteAnswer = function ($index, answer, intent) {

        if (answer.id) {
            var req = {
                method: 'POST',
                url: '../delete-standard-intent-answer',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    /* 'Content-Type': 'application/x-www-form-urlencoded'*/
                },
                data: {
                    answer_id: answer.id
                }
            };

            $http(req).then(function (data) {

                intent.intent_answers.splice($index, 1);
                //  event.currentTarget.closest('.form-group').remove();
            }).catch(function (data) {});
        } else {
            intent.intent_answers.splice($index, 1);
            // event.currentTarget.closest('.form-group').remove();
        }
    };

    $scope.addAnswer = function (intent) {
        if (typeof intent.intent_answers == 'undefined' || intent.intent_answers == '') {
            intent['intent_answers'] = [];
        };

        intent.intent_answers.push({
            intent_id: intent.id,
            answer: ''

        });
    };

    $scope.saveAnswer = function (currentElement, intent, answer, index) {
        shrinkLoading.do(currentElement, 'loading');

        var req = {
            method: 'POST',
            url: '../save-standard-intent-answer',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {

                intent_id: intent.id,
                id: answer.id,
                answer: answer.answer

            }
        };

        $http(req).then(function (data) {

            shrinkLoading.do(currentElement, 'success');

            if (typeof intent.intent_answers[index] != 'undefined') {
                intent.intent_answers[index]['id'] = data.data.id;
            }
        }).catch(function (data) {

            shrinkLoading.do(currentElement, 'error');
        });
    };

    $scope.addNewIntent = function (intentValue, intentExpression, event) {

        if (typeof event != 'undefined') {
            buttonLoading.do($(event.currentTarget), 'loading');
        }

        var intentObj = {
            value: intentValue,
            expressions: [intentExpression]
        };

        var req = {
            method: 'POST',
            url: '../add-intent-wit',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                new_intent: intentObj
            }
        };

        $http(req).then(function (data) {

            $scope.intentData['error'] = null;
            if (data.status == 200) {

                if (typeof data.data.code != 'undefined') {
                    if (data.data.code == 'bad-request') {
                        buttonLoading.do($(event.currentTarget), 'error');
                        $scope.intentData['error'] = [['Wit reponse: ' + data.data.error]];
                        return;
                    }
                }

                $scope.intentData['intent_data']['name'] = intentExpression;
                $scope.intentData['intent'] = intentValue;
                $scope.intentSearchValue = intentValue;
                /* $('#intent-title').trigger('changeOperatorTitle', [intentExpression, $scope.activeStateID, true]);
                 $scope.resetIntentSearch();*/

                if (typeof event != 'undefined') {
                    buttonLoading.do($(event.currentTarget), 'success');
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }

                $scope.saveIntent();
            } else {
                buttonLoading.do($(event.currentTarget), 'error');
                $scope.intentData['error'] = data.data;
            }
        }).catch(function (data) {
            if (typeof event != 'undefined') {
                buttonLoading.do($(event.currentTarget), 'error');
                $scope.intentData['error'] = data.data;
            }
        });
    };
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

angular.module('botApp').controller("entityController", function (buttonLoading, $rootScope, $scope, $http, $parse, shrinkLoading) {
    $scope.newEntityTrigger = function () {
        $scope.newEntityError = null;
        $scope.newEntity = null;
        $scope.showCreateEntity = !$scope.showCreateEntity;
    };

    $scope.toggleInit = function () {
        $scope.getAllEntities();
    };

    $scope.getAllEntities = function () {
        var req = {
            method: 'GET',
            url: defaultURL + '/get-all-entities',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            }
        };

        $http(req).then(function (data) {

            $scope.allEntities = data.data;
        }).catch(function (data) {});
    };
    $scope.entityChange = function () {
        $scope.getAllValuesEntity($scope.selectedEntity);
    };

    $scope.getAllValuesEntity = function (entity) {
        if (!entity) {
            return;
        }
        $scope.entityData = null;
        $scope.loadEntityValues = true;
        var req = {
            method: 'POST',
            url: defaultURL + '/get-all-values-entity',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: entity
            }
        };

        $http(req).then(function (data) {
            if (data.status == 200) {
                $scope.entityData = $scope.removeDoubleValuesInSynonims(data.data);
                $scope.loadEntityValues = false;
            }
        }).catch(function (data) {});
    };

    $scope.addSynonym = function (data, entityValue, entityData) {
        var lookups = entityData.lookups;

        /*  if (lookups.indexOf('keywords') > -1) {*/
        $scope.addKeywordSynonym(entityData.name, entityValue.value, data.text, entityValue);
        /*  }*/
    };

    $scope.deleteSynonym = function (tag, value, entityData) {

        var req = {
            method: 'POST',
            url: defaultURL + '/delete-entity-expression',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: entityData.name,
                value: value.value,
                expression: tag.text
            }
        };

        $http(req).then(function (data) {
            if (data.status == 200) {
                return true;
            } else {
                return false;
            }
        }).catch(function (data) {
            return false;
        });
    };

    $scope.toggleDeleteEntityValue = function (value, index) {
        $scope.showDeleteEntityValue = true;
        $scope.deleteValue = value;
        $scope.deleteValueIndex = index;
    };

    $scope.deleteEntityValue = function (event) {
        buttonLoading.do($(event.currentTarget), 'loading');
        if (!$scope.deleteValue.value) {
            buttonLoading.do($(event.currentTarget), 'error');
            return;
        }

        var req = {
            method: 'POST',
            url: defaultURL + '/delete-entity-value',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: $scope.entityData.name,
                value: $scope.deleteValue.value
            }
        };

        $http(req).then(function (data) {

            if (data.status == 200) {
                buttonLoading.do($(event.currentTarget), 'success');
                $scope.entityData.values.splice($scope.deleteValueIndex, 1);
                $scope.deleteValueIndex = null;
                $scope.deleteValue = null;
                $scope.showDeleteEntityValue = false;
            } else {
                buttonLoading.do($(event.currentTarget), 'error');
            }
        }).catch(function (data) {
            buttonLoading.do($(event.currentTarget), 'error');
        });
    };
    $scope.deleteEntity = function (event, entityID) {
        buttonLoading.do($(event.currentTarget), 'loading');

        if (!entityID) {
            return;
        }

        var req = {
            method: 'POST',
            url: defaultURL + '/delete-entity',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: entityID
            }
        };

        $http(req).then(function (data) {

            if (data.status == 200) {
                buttonLoading.do($(event.currentTarget), 'success');
                $scope.getAllEntities();
                $scope.entityData = null;
                $scope.showDeleteEntity = false;
            } else {
                buttonLoading.do($(event.currentTarget), 'error');
            }
        }).catch(function (data) {
            buttonLoading.do($(event.currentTarget), 'error');
        });
    };
    $scope.storeNewEntity = function (entity, type, event) {
        $scope.addEntity(entity, type, event);
    };

    $scope.storeNewEntityValue = function (entity, value, expressions, event) {
        buttonLoading.do($(event.currentTarget), 'loading');

        $scope.addEntityValue(entity, $scope.createAddEntityValueObject(value, expressions), event);
    };
    $scope.createAddEntityValueObject = function (value, expressions) {
        var addObj = {
            value: value,

            expressions: []
        };

        if (typeof expressions != 'undefined' && expressions.length > 0) {
            for (var i = 0; i < expressions.length; i++) {
                addObj.expressions.push(expressions[i].text);
            }
        }

        if (typeof value == 'undefined') {
            return null;
        } else {
            return addObj;
        }
    };
    $scope.addEntityValue = function (entity, valueObject, event) {
        $scope.entityValueError = null;
        var req = {
            method: 'POST',
            url: defaultURL + '/add-entity-value',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: entity,
                valueObject: valueObject
            }
        };

        $http(req).then(function (data) {

            if (data.status == 200) {
                buttonLoading.do($(event.currentTarget), 'success');
                $scope.showNewEntityValue = false;
                $scope.getAllValuesEntity(entity);
            } else {
                buttonLoading.do($(event.currentTarget), 'error');
            }
        }).catch(function (data) {
            $scope.entityValueError = data.data.valueObject;
            buttonLoading.do($(event.currentTarget), 'error');
        });
    };
    $scope.addEntity = function (entity, type, event) {
        buttonLoading.do($(event.currentTarget), 'loading');
        $scope.newEntityError = null;
        if (typeof entity != 'undefined') {
            if (typeof type == 'undefined' || type == '') {
                var currEntity = entity.replace(/ /g, "_");
                var addObj = {
                    id: entity.replace(/ /g, "_")
                };
            } else if (type == 'keywords') {
                var currEntity = entity.replace(/ /g, "_");
                var addObj = {
                    id: entity.replace(/ /g, "_"),
                    lookups: [type]
                };
            }
        } else {
            var currEntity = null;
            var addObj = null;
            buttonLoading.do($(event.currentTarget), 'error');
        }
        var req = {
            method: 'POST',
            url: defaultURL + '/add-entity',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: currEntity,
                entityObj: addObj
            }
        };

        $http(req).then(function (data) {

            if (data.status == 200) {
                buttonLoading.do($(event.currentTarget), 'success');
                $scope.showCreateEntity = false;
                $scope.allEntities = false;
                $scope.getAllEntities();
            } else {
                buttonLoading.do($(event.currentTarget), 'error');
            }
        }).catch(function (data) {
            buttonLoading.do($(event.currentTarget), 'error');

            $scope.newEntityError = data.data.entity;
        });
    };

    $scope.addKeywordSynonym = function (entity, value, expression, entityValue) {
        var req = {
            method: 'POST',
            url: defaultURL + '/add-keyword-expression',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: entity,
                value: value,
                expression: { expression: expression }
            }
        };

        $http(req).then(function (data) {

            if (data.status == 200) {}
        }).catch(function (data) {
            $scope.removeSynonym(entityValue, expression);
        });
    };

    $scope.removeSynonym = function (entityValue, deleteExpression) {
        if (entityValue.expressions.indexOf(deleteExpression) > -1) {
            entityValue.expressions = entityValue.expressions.splice(entityValue.expressions.indexOf(deleteExpression), 1);
        }
    };

    $scope.removeDoubleValuesInSynonims = function (entityData) {
        var newData = entityData;
        for (var i = 0; i < newData.values.length; i++) {
            if (newData.values[i]) {
                var doubleValue = newData.values[i].expressions.indexOf(newData.values[i].value);

                if (doubleValue > -1) {
                    newData.values[i].expressions.splice(doubleValue, 1);
                }
            }
        }

        return newData;
    };

    $(document).ready(function () {
        $('.entity-select').select2({
            width: '100%',
            placeholder: "Selecteer een entity"
        });
    });
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

angular.module('botApp').controller("chatbotPreviewController", function ($rootScope, $scope, $http, $parse, shrinkLoading) {
    $scope.activateChatbotPreview = function (data) {
        $scope.initChatbot(data);
    };
    $scope.initChatbot = function (data) {
        if (data.title != null) {
            $('#babbelbot-chatbot-preview').babbelbot({
                babbelbotUrl: defaultURL + '/api/chatbot/' + data.unique_id,
                accessToken: data.server_token,
                title: 'babbelbot(' + data.title + ')'
            });
        } else {
            $('#babbelbot-chatbot-preview').empty();
        }
    };
    $scope.initPreview = function () {
        $scope.checkActiveApp();
    };

    $scope.checkActiveApp = function () {
        var req = {
            method: 'GET',
            url: ajaxAppSessionURL,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            }

        };

        $http(req).then(function (data) {
            $scope.initChatbot(data.data);
        }).catch(function (data) {});
    };
});

/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * Created by Rowan on 11-11-2017.
 */
angular.module('botApp').controller("userController", function ($scope, $http, $parse, buttonLoading) {

    $scope.updateUser = function (event) {
        $scope.userError = null;
        buttonLoading.do($(event.currentTarget), 'loading');
        var req = {
            method: 'POST',
            url: './update-user',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                name: $("input[name=name]").val()
            }
        };

        $http(req).then(function (data) {

            buttonLoading.do($(event.currentTarget), 'success');
            location.reload();
        }).catch(function (data) {
            $scope.userError = data.data.name;

            buttonLoading.do($(event.currentTarget), 'error');
        });
    };

    $scope.deleteAccount = function (event) {

        buttonLoading.do($(event.currentTarget), 'loading');
        var req = {
            method: 'DELETE',
            url: './delete-account',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            }

        };

        $http(req).then(function (data) {
            buttonLoading.do($(event.currentTarget), 'success');
            location.reload();
        }).catch(function (data) {
            buttonLoading.do($(event.currentTarget), 'error');
        });
    };

    $scope.deleteLocalChatCache = function (event) {

        buttonLoading.do($(event.currentTarget), 'loading');

        function setcookie(name, value, day) {
            var expireDate = new Date();
            expireDate.setSeconds(expireDate.getSeconds() + day * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + value + ";path=/;expires=" + expireDate.toGMTString();
        }

        function delcookie(name) {
            setcookie(name, "", -1);
        }

        delcookie('bb_chatbot_user');

        setTimeout(function () {
            buttonLoading.do($(event.currentTarget), 'success');
            location.reload();
        }, 1000);
    };
});

/***/ })
/******/ ]);