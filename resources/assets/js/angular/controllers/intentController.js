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

        }).catch(function (data) {

        });
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
        }).catch(function (data) {

        });
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
                $scope.userInputIntent = (typeof data.data.state_intent_data.name != 'undefined') ? data.data.state_intent_data.name : '';
                $scope.activeStateName = (typeof data.data.state_intent_data.name != 'undefined') ? data.data.state_intent_data.name : '';
            }
            if(typeof data.data.state_intent_answers[0] !='undefined'){
                $scope.intentAnswers = data.data.state_intent_answers;
            }
            if (typeof data.data != 'undefined') {
                $scope.activeIntent = (typeof data.data.intent != 'undefined') ? data.data.intent : '';
                $scope.intentID = (typeof data.data.id != 'undefined') ? data.data.id : '';
                $scope.typeSetter(data.data.type);
            }


        } else {
            $scope.activeStateID = '';
        }


    };

    $scope.addQuickReply = function(){
        if(typeof $scope.intentAnswers == 'undefined' || $scope.intentAnswers == ''){
            $scope.intentAnswers={};
        }
        $scope.intentAnswers.push({
            state_intents_id : $scope.intentID,
            answer : '',
            answer_type : 2
        })
    }

    $scope.saveAnswer = function(currentElement, currentScope, type){
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
                state_id : $scope.activeStateID,
                state_intents_id: currentElement.attr('data-state-intents-id'),
                id : currentElement.attr('data-answer-id'),
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

    $scope.addAnswer = function(){
        var objToPush = {
            state_intents_id : $scope.intentID,
            answer : '',
            answer_type : 1
        };
        if(typeof $scope.intentAnswers == 'undefined'){
            $scope.intentAnswers= [objToPush];
        }else{
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
        }).catch(function (data) {

        });

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
            case 10 :
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

        if (currentParent.hasClass('processing') && !currentParent.hasClass('disable-shrink') &&
            (cuurentInput.attr('disabled') == false || typeof cuurentInput.attr('disabled') == 'undefined')) {
            currentParent.animate({'width': (currentParent.width() + 25)}, 100, 'linear', function () {
                currentParent.removeClass('processing');
                currentParent.children(inpIconElemClass).addClass('hidden');
                currentParent.children(inpIconElemClass).addClass('fa-repeat').removeClass('fa-check');
                console.log('i added space');
            });
        } else if (currentParent.hasClass('processing') && currentParent.hasClass('disable-shrink') &&
            (cuurentInput.attr('disabled') == false || typeof cuurentInput.attr('disabled') == 'undefined')) {
            currentParent.removeClass('processing');
            currentParent.children(inpIconElemClass).addClass('hidden');
            currentParent.children(inpIconElemClass).addClass('fa-repeat').removeClass('fa-check');
        }

    }
});

