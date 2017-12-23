angular.module('botApp').controller("standardIntentController", function ($rootScope, $scope, $http, $parse, shrinkLoading) {
    var $flowchartPopup = $('#flowchart-popup');
    var $flowchartPopupIntent = $('#flowchart-popup-intent');
    $flowchartPopupIntent.draggable({cancel : '.styled-input, .fast-entity-popup, .new-expression-wrapper'});
    $flowchartPopup.draggable();

    $scope.toggleAnswers = function (id, event) {

        if($scope.answersToggle != id){
            $scope.answersToggle = id;

            setTimeout(function(){
            $(event.currentTarget).find('i').removeClass('fa-chevron-down');
            $(event.currentTarget).find('i').addClass('fa-chevron-up');
            },200);
        }else if($scope.answersToggle == id){
            $scope.answersToggle = false;

            setTimeout(function(){
            $(event.currentTarget).find('i').removeClass('fa-chevron-up');
            $(event.currentTarget).find('i').addClass('fa-chevron-down');
            },200);
        }

    };
    $scope.popupOpen = function (data, index) {


        $scope.initDataPopup(data,index);
       $scope.intentPopupToggle = true;
    };

    $scope.popupClose = function () {
        $scope.resetIntentSearch();
        $scope.intentPopupToggle = false;
        $rootScope.$emit("toggleIntentTraining", {intent: null, toggle: 'close'});

    };
    $scope.initDataPopup = function(data, index){
        $scope.intentData = data;

    };
    $scope.deleteIntentTrigger = function(data,index){
        $scope.showDeleteIntent = true;
        $scope.deleteIntentData = data;
        $scope.deleteIndex = index;


    }

    $scope.deleteIntent = function(){


        var req = {
            method: 'POST',
            url: '../delete-standard-intent',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data:{
                intent_id : $scope.deleteIntentData.id
            }

        };

        $http(req).then(function (data) {


            $scope.intents.splice($scope.deleteIndex, 1);
            $scope.deleteIndex = null;
            $scope.deleteIntentData = null;
            $scope.showDeleteIntent = false;


            if(!$scope.$$phase) {
                $scope.$apply()
            }




        }).catch(function (data) {
            $scope.showDeleteIntent = false;
        });
    }
    $scope.addNewStandard = function(){

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
            if(!$scope.$$phase) {
                $scope.$apply()
            }




        }).catch(function (data) {

        });
    };

    $scope.getIntentData = function(){
        $rootScope.$emit("toggleIntentTraining", {intent: $scope.intentData.intent, toggle: 'open'});
    }

    $scope.getAllIntents = function(pagenumber){
        $scope.loadingIntents = true;

        if(typeof  $scope.pageNumber == 'undefined' ||  $scope.pageNumber == ''){
            $scope.pageNumber = 1;
        }

        if(typeof pagenumber != 'undefined'){
            $scope.pageNumber = pagenumber;
            $scope.intents = undefined;
        }

        var intentGetUrl = '../get-all-standard-intents'
        $http.get(intentGetUrl + '?page=' + $scope.pageNumber).then(function (data) {

            if(data.data.data.length == 0){
                $scope.latestPost = true;
            }else{
                $scope.latestPost = false;

                if(typeof $scope.intents == 'undefined' || hardRefresh){
                    $scope.intents = data.data.data
                }else{

                    var concattedArray = $scope.intents.concat(data.data.data);
                    $scope.intents = concattedArray;
                }



            }
            $scope.loadingIntents = false;
        }).catch(function(data){

        });
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
    $scope.resetIntentSearch = function(){
        $scope.intentSearchResult = false;
        $scope.newIntent = false;
        $scope.intentSearchValue = null;
        $scope.intentSearchConf = null;
        $scope.intentData.error = false;
    };

    $scope.saveIntent = function(){



        var req = {
            method: 'POST',
            url: '../save-standard-intent',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                intent : $scope.intentSearchValue,
                name : $scope.intentData.intent_data.name,
                intent_id : $scope.intentData.id
            }
        };

        $http(req).then(function (data) {



            $scope.intentData['intent'] = data.data.intent;
/*            console.log(data);

            $scope.intentData['state_intent_data']['name'] = intentExpression;
            $scope.intentData['intent'] = intentValue;
            $scope.intentSearchValue = intentValue;
            /!* $('#intent-title').trigger('changeOperatorTitle', [intentExpression, $scope.activeStateID, true]);
             $scope.resetIntentSearch();*!/
            if(!$scope.$$phase) {
                $scope.$apply()
            }

            $scope.saveIntentLocal();*/


        }).catch(function (data) {
            $scope.intentData.error = data.data;

        });
    }


    $scope.chooseIntent= function(){

        $scope.currentIntent =  $scope.intentSearchValue;
    };

    $scope.removeActiveIntent= function(intentID){
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
            }).catch(function (data) {

            });
    }




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


    $scope.deleteAnswer = function($index, answer, intent){

        if(answer.id){
        var req = {
            method: 'POST',
            url: '../delete-standard-intent-answer',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                answer_id : answer.id
            }
        };

        $http(req).then(function (data) {

            intent.intent_answers.splice($index,1);
          //  event.currentTarget.closest('.form-group').remove();
        }).catch(function (data) {

        });
        }else{
            intent.intent_answers.splice($index,1);
          // event.currentTarget.closest('.form-group').remove();
        }
    };

    $scope.addAnswer = function(intent){
        if(typeof intent.intent_answers == 'undefined' || intent.intent_answers == ''){
            intent['intent_answers'] = [];
        };

        intent.intent_answers.push({
            intent_id :  intent.id,
            answer : '',

        });
    };

    $scope.saveAnswer = function(currentElement, intent, answer){
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
                id : answer.id,
                answer:answer.answer

            }
        };

        $http(req).then(function (data) {
            shrinkLoading.do(currentElement, 'success');



        }).catch(function (data) {
            shrinkLoading.do(currentElement, 'error');
        });
    };


    $scope.addNewIntent = function(intentValue, intentExpression ){


        var intentObj = {
            value: intentValue,
            expressions : [intentExpression]
        };

        var req = {
            method: 'POST',
            url: '../add-intent-wit',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                new_intent : intentObj
            }
        };

        $http(req).then(function (data) {


            $scope.intentData['intent_data']['name'] = intentExpression;
            $scope.intentData['intent'] = intentValue;
            $scope.intentSearchValue = intentValue;
            /* $('#intent-title').trigger('changeOperatorTitle', [intentExpression, $scope.activeStateID, true]);
             $scope.resetIntentSearch();*/
            if(!$scope.$$phase) {
                $scope.$apply()
            }

            $scope.saveIntent();


        }).catch(function (data) {

        });
    };
});



