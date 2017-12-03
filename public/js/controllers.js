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
module.exports = __webpack_require__(9);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * Created by Rowan on 11-11-2017.
 */
angular.module('botApp').controller("navController", function ($scope, $http, $parse) {

    /*  $scope.changeActiveApp = function(){
     console.log('broadcasted to navcontroller');
     }*/
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
            console.log('active session ');
            console.log(data);

            $scope.activeApp = data.data.title;
        }).catch(function (data) {});
    };

    $scope.changeActiveApp = function (data) {
        console.log(data);

        $scope.activeApp = data.title;
    };
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

angular.module('botApp').controller("appController", function ($rootScope, $scope, $http, $parse) {

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
    $scope.deleteAppTrigger = function (id) {

        $scope.deleteID = id;

        console.log($scope.deleteID);
        $scope.showDeleteApp = !$scope.showDeleteApp;
    };
    $scope.deleteApp = function (event, id) {

        setLoadingButton('.danger-btn', true, 'Verwijder');
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
            console.log(data);
            setLoadingButton('.danger-btn', false, 'Verwijder');
            $scope.getUserApps(1);
            $scope.showDeleteApp = !$scope.showDeleteApp;
        }).catch(function (data) {
            console.log(data);
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
            console.log(data);
            shrinkLoading(currentElement, 'success');
        }).catch(function (data) {
            console.log(data);
            shrinkLoading(currentElement, 'error');
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
    $scope.$on("repeatReady", function () {
        console.log('klaar jonguh');
    });

    $scope.inputEnter = function (currentElement, currentScope) {

        var inputObject = {};
        inputObject[currentElement.attr('name')] = currentElement.val();
        inputObject['id'] = currentScope.app.id;
        //console.log(currentElement.attr('name') + " " + currentElement.val() + ' ' + currentScope.app.id);
        console.log(inputObject);

        shrinkLoading(currentElement, 'loading');
        $scope.updateApp(inputObject, currentElement);
    };

    function shrinkLoading(element, state) {
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

    $scope.growBack = function (event) {

        console.log(event);
        var inpElemClass = '.input-wrapper input';
        var inpIconElemClass = '.input-saving-overlay';

        var currentParent = $(event.target.parentElement);
        var cuurentInput = $(event.currentTarget);

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
    };

    $scope.selectApp = function (app) {
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
            console.log(data);
            $rootScope.$emit("toggleApp", data.data);
        }).catch(function (data) {});
    };
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

angular.module('botApp').controller("dialogueController", function ($scope, $http, $parse, shrinkLoading) {

    $scope.newDialogueTrigger = function (formElem) {
        console.log(formElem);
        $scope.showCreateDialogue = !$scope.showCreateDialogue;
        $scope.resetForm(formElem);
    };
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

    $scope.storeNewDialogue = function (currModel) {
        console.log(currModel);
        //$scope.$apply();
        setLoadingButton('.async-save', true, 'Opslaan');
        //console.log( currModel.access_token.$modelValue);
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

            console.log('success');

            console.log(data);

            $scope.parseServerMessages(data.config.data, data.config.data, data.status, currModel);

            setLoadingButton('.async-save', false, 'Opslaan');

            $scope.newDialogueTrigger(currModel);

            $scope.getDialogues(1);
        }).catch(function (data) {

            console.log(data);
            console.log('error');

            $scope.parseServerMessages(data.data, data.config.data, data.status, currModel);

            setLoadingButton('.async-save', false, 'Opslaan');
        });
    };

    function setLoadingButton(element, trueOrFalse, defaultText) {
        var icon = ' <i class="fa fa-repeat"></i>';
        if (!trueOrFalse) {
            angular.element(document.querySelector(element)).html(defaultText);
        } else if (trueOrFalse) {
            angular.element(document.querySelector(element)).html(defaultText + icon);
        }
    }

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
            // console.log(data);
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
        //console.log(currentElement.attr('name') + " " + currentElement.val() + ' ' + currentScope.app.id);
        console.log(inputObject);

        shrinkLoading.do(currentElement, 'loading');
        $scope.updateDialogue(inputObject, currentElement);
    };

    $scope.deleteDialogue = function (event, id) {
        setLoadingButton('.danger-btn', true, 'Verwijder');
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
            console.log(data);
            setLoadingButton('.danger-btn', false, 'Verwijder');
            $scope.getDialogues(1);
            $scope.showDeleteDialogue = !$scope.showDeleteDialogue;
        }).catch(function (data) {
            console.log(data);
        });
    };
    $scope.deleteDialogueTrigger = function (id) {
        $scope.deleteID = id;

        console.log($scope.deleteID);
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
            console.log(data);
            shrinkLoading.do(currentElement, 'success');
        }).catch(function (data) {
            console.log(data);
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
            console.log(data);
            // $rootScope.$emit("toggleApp", data.data);

            window.location = './dialogue/diagram';
        }).catch(function (data) {});
    };
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

angular.module('botApp').controller("intentController", function ($rootScope, $scope, $http, $parse, shrinkLoading) {

    $scope.activeStateID = null;

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

    $scope.addNewIntent = function (intentValue, intentExpression) {

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
            console.log(data);

            $scope.intentData['state_intent_data']['name'] = intentExpression;
            $scope.intentData['intent'] = intentValue;
            $scope.intentSearchValue = intentValue;
            /* $('#intent-title').trigger('changeOperatorTitle', [intentExpression, $scope.activeStateID, true]);
             $scope.resetIntentSearch();*/
            if (!$scope.$$phase) {
                $scope.$apply();
            }

            $scope.saveIntentLocal();
        }).catch(function (data) {});
    };

    $scope.saveKeywordLocal = function (currentElement, currentScope) {
        var inputObject = {};
        inputObject[currentElement.attr('name')] = currentElement.val();

        shrinkLoading.do(currentElement, 'loading');
        console.log($scope.intentData['state_intent_data']['name']);
        var req = {
            method: 'POST',
            url: '../../save-keyword-local',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                keyword: $scope.intentData['state_intent_data']['name'],
                state_id: $scope.activeStateID,
                name: $scope.intentData['state_intent_data']['name']
            }
        };

        $http(req).then(function (data) {
            $scope.intentData['state_intent_data']['name'] = data.data.state_data.name;
            //$scope.intentData['intent'] = data.data.intent;
            $('#intent-title').trigger('changeOperatorTitle', [data.data.state_data.name, $scope.activeStateID, true]);
            shrinkLoading.do(currentElement, 'success');
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
        $scope.getIntentState(state_id);
    };

    $scope.popupClose = function () {
        $('#flowchart-popup').addClass('hidden');
        $rootScope.$emit("toggleIntentTraining", { intent: null, toggle: 'close' });
    };

    $scope.getIntentState = function (stateID) {
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
        }).catch(function (data) {});
    };
    $scope.resetIntentSearch = function () {
        $scope.intentSearchResult = false;
        $scope.newIntent = false;
        $scope.intentSearchValue = null;
        $scope.intentSearchConf = null;
    };
    $scope.updateFullPopUp = function (data, openOrClose) {
        console.log(data);

        $scope.resetIntentSearch();

        if (openOrClose == 'open') {
            console.log('open');
            //console.log(data);
            $scope.intentData = data.data;

            if (typeof data.data != 'undefined') {
                $scope.intentID = typeof data.data.id != 'undefined' ? data.data.id : '';
                $scope.typeSetter(data.data['response_type']);
                $scope.intentData.id;
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
            console.log(data);

            $scope.intentData.intent = null;
            // $scope.intentData.state_intent_data.name = data.data.default_state_name;
            $('#intent-title').trigger('changeOperatorTitle', [$scope.intentData.state_intent_data.name, $scope.activeStateID]);
        }).catch(function (data) {});
    };
    $scope.addQuickReply = function () {
        if (typeof $scope.intentData['state_intent_answers'] == 'undefined' || $scope.intentData['state_intent_answers'] == '') {
            $scope.intentData['state_intent_answers'] = [];
        }
        $scope.intentData['state_intent_answers'].push({
            state_intents_id: $scope.intentData.id,
            answer: '',
            answer_type: 2
        });
    };

    $scope.saveAnswer = function (currentElement, currentScope, type) {
        shrinkLoading.do(currentElement, 'loading');

        var req = {
            method: 'POST',
            url: '../../save-intent-answer',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                state_id: $scope.activeStateID,
                state_intents_id: currentElement.attr('data-state-intents-id'),
                id: currentElement.attr('data-answer-id'),
                answer: currentElement.val(),
                answer_type: type
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
        $scope.intentData.state_intent_answers.push({
            state_intents_id: $scope.intentData.id,
            answer: '',
            answer_type: 1
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

        $http(req).then(function (data) {
            //console.log(data);
        }).catch(function (data) {});
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

    $scope.deleteAnswer = function (event, currentScope, answerID) {
        console.log('delete answer');
        console.log(answerID);

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
            event.currentTarget.closest('.form-group').remove();
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
        //console.log(currentElement.attr('name') + " " + currentElement.val() + ' ' + currentScope.app.id);


        shrinkLoading.do(currentElement, 'loading');
        $scope.getIntent(inputObject, currentElement);
    };

    $scope.growBack = function (event) {
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
    };

    $scope.getIntentData = function () {
        $rootScope.$emit("toggleIntentTraining", { intent: $scope.intentData.intent, toggle: 'open' });
    };
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

angular.module('botApp').controller("intentTrainController", function ($rootScope, $scope, $http, $parse, shrinkLoading, $compile) {

    $scope.toggleTrainingPopup = function (data) {

        if (data.toggle == 'open') {
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

    $scope.getIntentDataWit = function (intent) {

        var req = {
            method: 'POST',
            url: '../../get-intent-data-wit',
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
        }).catch(function (data) {});
    };
    $scope.checkExpressionsForEntities = function (expressions) {

        for (var keyExpression in expressions) {
            if (!expressions.hasOwnProperty(keyExpression)) continue;
            setTimeout(function (currKey) {
                $scope.checkEntityInIntent(expressions[currKey], currKey);
            }.bind(this, keyExpression), 500);
        }
    };

    $scope.checkEntityInIntent = function (intentValue, index) {
        var req = {
            method: 'POST',
            url: '../../get-intent-entity-data-wit',
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
    $scope.trainExpression = function (event) {
        var trainElement = $(event.target.parentElement).find('.styled-input');
        var currentIntent = $scope.intentValueData.value;

        var trainObject = $scope.convertSentenceToTrainObj(trainElement, currentIntent);
        //setLoadingButton(event.currentTarget, true, 'Train');


        var req = {
            method: 'POST',
            url: '../../train-intent',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                train_object: trainObject
            }
        };

        $http(req).then(function (data) {

            console.log(data);
        }).catch(function (data) {});
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
function setLoadingButton(element, trueOrFalse, defaultText) {
    var icon = ' <i class="fa fa-repeat"></i>';
    if (!trueOrFalse) {
        angular.element(element).html(defaultText);
    } else if (trueOrFalse) {
        angular.element(element).html(defaultText + icon);
    }
}

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
        } else {
            console.log('error');
        }
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
            url: '../../get-all-entities',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            }
        };

        $http(req).then(function (data) {

            //console.log(data);

            $scope.allEntities = data.data;
        }).catch(function (data) {});
    };
});

$(document).ready(function () {
    $('.entity-select').select2();
});

/***/ })
/******/ ]);