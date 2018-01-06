angular.module('botApp').controller("dialogueController", function ($scope, $http, $parse, shrinkLoading, buttonLoading) {

    $scope.newDialogueTrigger = function (formElem) {

        $scope.showCreateDialogue = !$scope.showCreateDialogue;
        $scope.resetForm(formElem);
    };
    $scope.resetForm = function(formElem){

        for(var key in  formElem.$$controls){

            var fieldName = formElem.$$controls[key].$name;
            var serverMessage = $parse(formElem.$name + '.' + fieldName + '.$error.serverMessage');
            formElem.$setValidity(fieldName, true, formElem);
            serverMessage.assign($scope, undefined);
        }



        $('form[name=' + formElem.$name + '] :input').each(function(){
            var input = $(this); // This is the jquery object of the input, do what you will

            input.val('');
            input.trigger('input'); // Use for Chrome/Firefox/Edge
            input.trigger('change'); // Use for Chrome/Firefox/Edge + IE11
        });
    }


    $scope.storeNewDialogue = function(currModel){

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



            $scope.parseServerMessages(data.config.data, data.config.data , data.status, currModel);

            buttonLoading.do($('.async-save'), 'success');

            $scope.newDialogueTrigger(currModel);

            $scope.getDialogues(1);


        }).catch(function (data) {


            $scope.parseServerMessages(data.data, data.config.data ,data.status, currModel);

            buttonLoading.do($('.async-save'), 'error');

        });
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
                }
                else if (typeof serverResponseData[fieldName] != 'undefined' || typeof serverResponseData[fieldName] != '') {
                    currModel.$setValidity(fieldName, false, currModel);
                    serverMessage.assign($scope, serverResponseData[fieldName]);
                }
            }

        }
    };
    $scope.getDialogues = function(pagenumber){
        $scope.loadingDialogues = true;
        if(typeof  $scope.pageNumber == 'undefined' ||  $scope.pageNumber == ''){
            $scope.pageNumber = 1;
        }

        if(typeof pagenumber != 'undefined'){
            $scope.pageNumber = pagenumber;
            $scope.dialogues = undefined;
        }
        var apiURL = '../get-dialogues';

        $http.get(apiURL + '?page=' + $scope.pageNumber).then(function (data) {

            if(data.data.data.length == 0){
                $scope.latestPost = true;
            }else{
                $scope.latestPost = false;

                if(typeof $scope.dialogues == 'undefined'){
                    $scope.dialogues = data.data.data
                }else{

                    var concattedArray = $scope.dialogues.concat(data.data.data);
                    $scope.dialogues = concattedArray;
                }



            }
            $scope.loadingDialogues = false;
        }).catch(function(data){

        });
        $scope.pageNumber += 1;

    };


    $scope.$on("atBottomOfElem", function() {
        $scope.getDialogues();
    });

    $scope.inputEnter = function(currentElement, currentScope) {

        var inputObject = {};
        inputObject[currentElement.attr('name')] = currentElement.val();
        inputObject['id'] = currentScope.dialogue.id;

        shrinkLoading.do(currentElement, 'loading');
        $scope.updateDialogue(inputObject, currentElement);



    }

    $scope.deleteDialogue = function(event, id){
        buttonLoading.do($('.danger-btn'), 'loading');
        var req = {
            method: 'POST',
            url: '../delete-dialogue',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                id : id
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
    $scope.deleteDialogueTrigger = function(id){
        $scope.deleteID = id;


        $scope.showDeleteDialogue = !$scope.showDeleteDialogue;
    };
    $scope.updateDialogue = function(updateData, currentElement){
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

    $scope.selectDialogue = function(dialogue){
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

            window.location ='./dialogen/diagram';

        }).catch(function (data) {


        });
    }
});
