angular.module('botApp').controller("intentTrainController", function ($scope, $http, $parse, shrinkLoading) {

    $scope.toggleTrainingPopup = function (data) {
        console.log(data);
        if (data.toggle == 'open') {
            $scope.showTrainingPopup = true;
            $scope.getIntentDataWit(data.intent);
        } else if (data.toggle == 'close') {
            $scope.showTrainingPopup = false;
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }
    }

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
            console.log(data);
            $scope.intentValueData = data.data;
            //  console.log($scope.intentValueData.expressions[0]);
            //$scope.checkExpressionsForEntities(data.data.expressions);

        }).catch(function (data) {

        });
    };
    $scope.checkExpressionsForEntities = function(expressions){
        for (var keyExpression in expressions) {
            if (!expressions.hasOwnProperty(keyExpression)) continue;
            setTimeout(function(currKey){
                $scope.checkEntityInIntent(expressions[currKey], currKey);
            }.bind(this, keyExpression),500);
        }
    }
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

            console.log(data);

            var intentSelector = '#intent_' + index;

            $scope.updateIntentEntityHtml(data.data.entities,intentSelector );


        }).catch(function (data) {

        });
    }

    $scope.updateIntentEntityHtml = function (witData, domSelector) {

        console.log(witData);
        if (typeof witData != 'undefined') {


            for (var key in witData) {
                // skip loop if the property is from prototype
                if (!witData.hasOwnProperty(key)) continue;

                if (key != 'intent') {

                    for (var entityKey in witData[key]) {

                        var entityObj = witData[key];
                        if (!entityObj.hasOwnProperty(entityKey)) continue;


                        if(typeof entityObj[entityKey]._body != 'undefined') {
                            var fullHtml = $(domSelector).html();
                            console.log(fullHtml);
                            var replaceHtml = fullHtml.replace(entityObj[entityKey]._body , "<span data-entity-object='" + key +  "'  class='entity-span'>" + entityObj[entityKey]._body  + "</span>");
                            $(domSelector).html(replaceHtml);
                        }
                    }
                }
            }

        }

        //var fullHtml = $(domSelector).html();
        // var replaceHtml = fullHtml.replace(selectedText, "<span style='background:red'>" + selectedText + "</span>");
    };
    $scope.selectedIntentText = function ($event) {
        /*        console.log('i selected somthing', $($event.currentTarget).text());
         var selectedText =  GetSelection();

         var fullHtml = $($event.currentTarget).html();

         var replaceHtml = fullHtml.replace(selectedText, "<span style='background:red'>" + selectedText + "</span>");

         $($event.currentTarget).html(replaceHtml);

         var firstIndexHtml = fullHtml.indexOf(selectedText);
         var lastIndexHtml = firstIndex + selectedText.length;





         var fullText = $($event.currentTarget).text();

         var firstIndexText = fullText.indexOf(selectedText);
         var lastIndexText = firstIndex + selectedText.length;



         console.log(firstIndexText);
         console.log(lastIndexText);*/


    };
    $scope.renderSelection = function (text, startIndex, endIndex) {
        var originalText = 'ik wil een vliegtuig naar londen';

        $('.test-input').val('ik wil een vliegtuig naar <span style="color:red">londen</span>');
        var firstPart = originalText.substring(26, 32);

        console.log(firstPart)
    }
    $scope.renderSelection();

    /*  $('.styled-input').mouseup(function(){
     console.log('i selected somthing');
     GetSelection();
     });*/


});


function GetSelection() {

    if (window.getSelection) {  // all browsers, except IE before version 9
        var selectionRange = window.getSelection();
        console.log(selectionRange.toString())
        return selectionRange.toString();
    }
    else {
        if (document.selection.type == 'None') {
            return "";
        }
        else {
            var textRange = document.selection.createRange();
            console.log(textRange.text);
            return textRange.text;
        }
    }

};