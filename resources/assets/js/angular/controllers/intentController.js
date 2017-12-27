angular.module('botApp').controller("intentController", function ($rootScope, $scope, $http, $parse, shrinkLoading) {

    $scope.activeStateID = null;

    $scope.toggleNewIntent = function(){
    $scope.newIntent = true;
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

            if(!$scope.$$phase) {
                $scope.$apply();
            }

        }).catch(function (data) {
            $scope.searchingIntent = false;
            shrinkLoading.do(currentElement, 'error');
            $scope.newIntent = true;
            $scope.intentSearchResult = false;

        });
    };

    $scope.addNewIntent = function(intentValue, intentExpression ){



        var intentObj = {
            value: intentValue,
            expressions : [intentExpression]
        };

        var req = {
            method: 'POST',
            url: '../../add-intent-wit',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                new_intent : intentObj
            }
        };

        $http(req).then(function (data) {

            $scope.intentData['state_intent_data']['name'] = intentExpression;
            $scope.intentData['intent'] = intentValue;
            $scope.intentSearchValue = intentValue;
           /* $('#intent-title').trigger('changeOperatorTitle', [intentExpression, $scope.activeStateID, true]);
            $scope.resetIntentSearch();*/
            if(!$scope.$$phase) {
                $scope.$apply()
            }

            $scope.saveIntentLocal();


        }).catch(function (data) {

        });
    };

    $scope.saveKeywordLocal = function(currentElement, currentScope){
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
                keyword:  $scope.intentData['keyword'],
                state_id: $scope.activeStateID,
                name:  $scope.intentData['keyword']
            }
        };

        $http(req).then(function (data) {

            $('#intent-title').trigger('changeOperatorTitle', [data.data.keyword, $scope.activeStateID, true]);
            shrinkLoading.do(currentElement, 'success');
            $scope.resetIntentSearch();

        }).catch(function (data) {

            shrinkLoading.do(currentElement, 'error');
        });
    }

    $scope.saveIntentLocal = function (inputObj, currentElement) {

        var req = {
            method: 'POST',
            url: '../../save-intent-local',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                user_input_intent:  $scope.intentData['state_intent_data']['name'],
                intent: $scope.intentSearchValue,
                state_id: $scope.activeStateID,
                name:  $scope.intentData['state_intent_data']['name']
            }
        };

        $http(req).then(function (data) {
            $scope.intentData['state_intent_data']['name'] = data.data.state_data.name;
            $scope.intentData['intent'] = data.data.intent;
            $('#intent-title').trigger('changeOperatorTitle', [data.data.state_data.name, $scope.activeStateID, true]);
            $scope.resetIntentSearch();

            if(!$scope.$$phase) {
                $scope.$apply()
            }
        }).catch(function (data) {

        });
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
        $rootScope.$emit("toggleIntentTraining", {intent: null, toggle: 'close'});
    };

    /* TODO make better way of rendering options */
    $scope.renderIntentOptions = function(){
        $scope.intentTypeOptions = [
            {
                id: 1, value: 'Intentie'
            },
            {
                id: 2, value: 'Exact woord'
            },
            {
                id: 3, value: 'Vrije input'
            }
        ]
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
        }).catch(function (data) {

        });
    };
    $scope.resetIntentSearch = function(){
        $scope.intentSearchResult = false;
        $scope.newIntent = false;
        $scope.intentSearchValue = null;
        $scope.intentSearchConf = null;
    }

    $scope.saveParameterLocal = function(currentElement, currentScope){
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
                parameter:  $scope.intentData['parameter'],
                state_id: $scope.activeStateID,
                name:  $scope.intentData['parameter']
            }
        };

        $http(req).then(function (data) {


            $('#intent-title').trigger('changeOperatorTitle', [data.data.parameter, $scope.activeStateID, true]);
            shrinkLoading.do(currentElement, 'success');
            $scope.resetIntentSearch();

        }).catch(function (data) {

            shrinkLoading.do(currentElement, 'error');
        });
    }
    $scope.updateFullPopUp = function (data, openOrClose) {

        /* make sure deletebutton isnt present on load */
        $('.hide-load').removeClass('hidden');

        $scope.resetIntentSearch();


        if (openOrClose == 'open') {




            $scope.intentData = data.data;

            if (typeof data.data != 'undefined') {





                $scope.intentID = (typeof data.data.id != 'undefined') ? data.data.id : '';
                $scope.typeSetter(data.data['response_type']);
                $scope.intentData.id;
                $scope.selectedIntentType = $scope.intentData.intent_type;
            }else{
                $scope.intentData = {};
            }


        } else {
            $scope.intentData = {};
            $scope.activeStateID = '';

        }


    };
    $scope.removeActiveIntent = function(){


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
            $('#intent-title').trigger('changeOperatorTitle', [ $scope.intentData.state_intent_data.name, $scope.activeStateID]);
        }).catch(function (data) {

        });
    }
    $scope.addQuickReply = function(){
        if(typeof $scope.intentData['state_intent_answers'] == 'undefined' || $scope.intentData['state_intent_answers'] == ''){
            $scope.intentData['state_intent_answers'] = [];
        }
        $scope.intentData['state_intent_answers'].push({
            state_intents_id :  $scope.intentData.id,
            answer : '',
            answer_type : 2
        })
    }

    $scope.saveAnswer = function(currentElement, currentScope, type){
        shrinkLoading.do(currentElement, 'loading');

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
            shrinkLoading.do(currentElement, 'success');



        }).catch(function (data) {
            shrinkLoading.do(currentElement, 'error');
        });
    };
    $scope.addAction = function(currentElement, currentModel, value){

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
    }
    $scope.addAnswer = function(){
        if(typeof $scope.intentData.state_intent_answers == 'undefined' || $scope.intentData.state_intent_answers == ''){
            $scope.intentData['state_intent_answers'] = [];
        }
        $scope.intentData.state_intent_answers.push({
            state_intents_id :  $scope.intentData.id,
            answer : '',
            answer_type : 1
        })
    };
    $scope.updateIntentType = function(state_id, type){
        $scope.hideIntentFooter = true;
        $scope.intentData= null;
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

           if(data.status == 200){

               $(document).trigger('changeOperatorClass', [ type, $scope.activeStateID]);
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

        $http(req).then(function (data) {

        }).catch(function (data) {

        });

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
            type = 1 //no answers;
        }

        return type;
    };

    $scope.typeSetter = function (type) {

        switch (type) {
            case 1 : //no answers
                $scope.hasIntentAnswers = false;
                $scope.hasQuickReplies = false;
                $scope.hasBackend = false;
                break;
            case 2: //intent
                $scope.hasIntentAnswers = true;
                $scope.hasQuickReplies = false;
                $scope.hasBackend = false;
                break;
            case 3: //quickreplies
                $scope.hasIntentAnswers = false;
                $scope.hasQuickReplies = true;
                $scope.hasBackend = false;
                break;

            case 4: // answers and quickreplies
                $scope.hasIntentAnswers = true;
                $scope.hasQuickReplies = true;
                $scope.hasBackend = false;
                break;

            case 5: //backend
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

    $scope.deleteAnswer = function(event, currentScope, answerID){


        var req = {
            method: 'POST',
            url: '../../delete-intent-answer',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                answer_id : answerID
            }
        };

        $http(req).then(function (data) {
        event.currentTarget.closest('.form-group').remove();
        }).catch(function (data) {

        });
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

    $scope.growBack = function (event) {
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
            });
        } else if (currentParent.hasClass('processing') && currentParent.hasClass('disable-shrink') &&
            (cuurentInput.attr('disabled') == false || typeof cuurentInput.attr('disabled') == 'undefined')) {
            currentParent.removeClass('processing');
            currentParent.children(inpIconElemClass).addClass('hidden');
            currentParent.children(inpIconElemClass).addClass('fa-repeat').removeClass('fa-check');
        }

    }



    $scope.getIntentData = function(){
        $rootScope.$emit("toggleIntentTraining", {intent: $scope.intentData.intent, toggle: 'open'});


    }

    /* jQuery required because modal is not in controller; TODO: better option required */
    $scope.toggleDelete = function(toggleEvent){
        if(toggleEvent){
            $('.delete-state').removeClass('hidden');
            $('.modal-overlay').removeClass('hidden');
        }else{
            $('.delete-state').addClass('hidden');
            $('.modal-overlay').addClass('hidden');
        }
    };


    $('.delete-state-button').click(function(){
        $scope.deleteState($scope.activeStateID);
    });

    $('.exit-delete-state').click(function(){
        $scope.toggleDelete(false);
    });
    $scope.deleteState = function(state_id){
        $(document).trigger('deleteState',[state_id]);
        setTimeout(function(){
            $scope.toggleDelete(false);
        },500);

    };
});

