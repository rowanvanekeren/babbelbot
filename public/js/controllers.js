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
module.exports = __webpack_require__(7);


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

angular.module('botApp').controller("intentController", function ($scope, $http, $parse, shrinkLoading) {

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
            console.log(data);
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
            console.log(data);
            if (typeof data.data.entities.intent[0] != 'undefined') {
                shrinkLoading.do(currentElement, 'success');
                $scope.intentSearchValue = data.data.entities.intent[0].value;
                $scope.intentSearchConf = Math.round(data.data.entities.intent[0].confidence * 100);
                $scope.newIntent = false;
                $scope.intentSearchResult = true;
                console.log('succes');
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
    $scope.saveIntentLocal = function (inputObj, currentElement) {

        var req = {
            method: 'POST',
            url: '../../save-intent-local',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                user_input_intent: $scope.userInputIntent,
                intent: $scope.intentSearchValue,
                state_id: $scope.activeStateID,
                name: $scope.userInputIntent
            }
        };

        $http(req).then(function (data) {
            console.log(data);
            $scope.activeStateName = data.data.state_data.name;
            $scope.activeIntent = data.data.intent;
            $('#intent-title').trigger('changeOperatorTitle', [data.data.state_data.name, $scope.activeStateID]);
        }).catch(function (data) {});
    };

    $scope.popupOpen = function (state_id) {

        $scope.activeStateID = state_id;
        $scope.getIntentState(state_id);
    };

    $scope.popupClose = function () {
        console.log('close');
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
            console.log(data);

            $scope.updateFullPopUp(data, 'open');
        }).catch(function (data) {});
    };

    $scope.updateFullPopUp = function (data, openOrClose) {

        if (openOrClose == 'open') {
            console.log('open');
            console.log(data);

            $scope.userInputIntent = null;
            $scope.activeStateName = null;
            $scope.activeIntent = null;
            $scope.intentID = null;
            if (typeof data.data.state_intent_data != 'undefined') {
                $scope.userInputIntent = typeof data.data.state_intent_data.name != 'undefined' ? data.data.state_intent_data.name : '';
                $scope.activeStateName = typeof data.data.state_intent_data.name != 'undefined' ? data.data.state_intent_data.name : '';
            }
            if (typeof data.data.state_intent_answers[0] != 'undefined') {
                $scope.intentAnswers = data.data.state_intent_answers;
            }
            if (typeof data.data != 'undefined') {
                $scope.activeIntent = typeof data.data.intent != 'undefined' ? data.data.intent : '';
                $scope.intentID = typeof data.data.id != 'undefined' ? data.data.id : '';
                $scope.typeSetter(data.data.type);
            }
        } else {
            $scope.activeStateID = '';
        }
    };

    $scope.addQuickReply = function () {
        if (typeof $scope.intentAnswers == 'undefined' || $scope.intentAnswers == '') {
            $scope.intentAnswers = {};
        }
        $scope.intentAnswers.push({
            state_intents_id: $scope.intentID,
            answer: '',
            answer_type: 2
        });
    };

    $scope.saveAnswer = function (currentElement, currentScope, type) {
        shrinkLoading.do(currentElement, 'loading');
        console.log(currentElement.attr('data-state-intents-id'));
        console.log(currentScope);

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
            console.log(data);
            shrinkLoading.do(currentElement, 'success');
        }).catch(function (data) {
            shrinkLoading.do(currentElement, 'error');
        });
    };

    $scope.addAnswer = function () {
        var objToPush = {
            state_intents_id: $scope.intentID,
            answer: '',
            answer_type: 1
        };
        if (typeof $scope.intentAnswers == 'undefined') {
            $scope.intentAnswers = [objToPush];
        } else {
            $scope.intentAnswers.push(objToPush);
        }
    };

    $scope.updateType = function () {
        console.log($scope.typeChecker());
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
            console.log(data);
        }).catch(function (data) {});
    };
    $scope.typeChecker = function () {
        var type = 0;
        if ($scope.hasBackend) {
            type = 14;
        } else if ($scope.hasIntentAnswers && $scope.hasQuickReplies) {
            type = 13;
        } else if ($scope.hasIntentAnswers) {
            type = 11;
        } else if ($scope.hasQuickReplies) {
            type = 12;
        } else {
            type = 10;
        }

        return type;
    };

    $scope.typeSetter = function (type) {

        switch (type) {
            case 10:
                $scope.hasIntentAnswers = false;
                $scope.hasQuickReplies = false;
                $scope.hasBackend = false;
                break;
            case 11:
                $scope.hasIntentAnswers = true;
                $scope.hasQuickReplies = false;
                $scope.hasBackend = false;
                break;
            case 12:
                $scope.hasIntentAnswers = false;
                $scope.hasQuickReplies = true;
                $scope.hasBackend = false;
                break;

            case 13:
                $scope.hasIntentAnswers = true;
                $scope.hasQuickReplies = true;
                $scope.hasBackend = false;
                break;

            case 14:
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
    $scope.inputEnterSearchIntent = function (currentElement, currentScope) {
        $scope.newIntent = false;
        $scope.intentSearchResult = false;

        var inputObject = {};
        inputObject[currentElement.attr('name')] = currentElement.val();
        console.log(inputObject);
        shrinkLoading.do(currentElement, 'loading');

        $scope.getAvailableIntent(inputObject, currentElement);
    };
    $scope.inputEnter = function (currentElement, currentScope) {

        var inputObject = {};
        inputObject[currentElement.attr('name')] = currentElement.val();
        //inputObject['id'] = currentScope.dialogue.id;
        //console.log(currentElement.attr('name') + " " + currentElement.val() + ' ' + currentScope.app.id);
        console.log(inputObject);

        shrinkLoading.do(currentElement, 'loading');
        $scope.getIntent(inputObject, currentElement);
    };

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
});

/***/ })
/******/ ]);