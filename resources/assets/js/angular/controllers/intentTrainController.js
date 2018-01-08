angular.module('botApp').controller("intentTrainController", function (buttonLoading, $rootScope, $scope, $http, $parse, shrinkLoading, $compile) {

    $scope.toggleTrainingPopup = function (data) {

        if (data.toggle == 'open') {
            $scope.intentValueData = null;
            $scope.showTrainingPopup = true;

            $scope.getIntentDataWit(data.intent);
        } else if (data.toggle == 'close') {
            $scope.showTrainingPopup = false;
            $rootScope.$emit("toggleIntentEntity", {toggle: 'close'});
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }
    }

    $scope.getEntity = function (event) {

        var relativeY = ($(event.currentTarget).offset().top - 235);
        var relativeX = ($(event.currentTarget).offset().left - 110);
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

            if(typeof callback != 'undefined'){
                callback('success');
            }

        }).catch(function (data) {
            if(typeof callback != 'undefined'){
                callback('error');
            }
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
        setTimeout(function(){
            buttonLoading.do($($event.currentTarget), 'success');
        },2000);

    }

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


        }).catch(function (data) {

        });
    }
    $scope.saveIntentValue = function (currentElement, currentScope) {
        shrinkLoading.do(currentElement, 'loading');
    }
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
                            var replaceHtml = fullHtml.replace(entityObj[entityKey]._body,
                                "<span data-entity-name='" + key + "' data-last-index='" + entityObj[entityKey]._end + "'  data-first-index='" + entityObj[entityKey]._start + "'  class='entity-span' ng-click='getEntity($event)'>" + entityObj[entityKey]._body + "</span>");

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

    $scope.deleteExpression = function($event, $index, valueData){
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
                value : valueData.value,
                expression : valueData.expressions[$index]
            }
        };

        $http(req).then(function (data) {
            if(data.status == 200){
                buttonLoading.do($($event.currentTarget), 'success');
                $scope.getIntentDataWit($scope.intentValueData.value);

            }
        }).catch(function (data) {
            buttonLoading.do($($event.currentTarget), 'error');

        });
    };

    $scope.refreshExpressions = function($event, valueData){
        $scope.intentValueData.expressions = null;
        buttonLoading.do($($event.currentTarget), 'loading');
        $scope.getIntentDataWit($scope.intentValueData.value, function(data){
            if(data == 'success'){
                buttonLoading.do($($event.currentTarget), 'success');
            }else if(data == 'error'){
                buttonLoading.do($($event.currentTarget), 'error');
            }

        });
    }
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

            var relativeY = ($(tempClassSelector).offset().top - 235);
            var relativeX = ($(tempClassSelector).offset().left - 110);

            $rootScope.$emit("toggleIntentEntity", {
                toggle: 'open',
                top: relativeY,
                left: relativeX,
                value: $(tempClassSelector).text(),
                element: tempClassSelector
            });


        }


    };

    $scope.addExpressionToIntent = function(currentElement, currentScope){
        shrinkLoading.do(currentElement, 'loading');

        var trainObj = {
            text: currentScope.newExpression,
            entities: [
                {
                    entity : 'intent',
                    value : $scope.intentValueData.value
                }
            ]
        };

        $scope.trainExpression(null, currentElement, trainObj);

    };

    $scope.trainExpression = function (event, currentElement, singleExpressionObj) {
        if(event != null && event.hasOwnProperty('currentTarget')){
            buttonLoading.do($(event.currentTarget), 'loading');
        }

        if(!currentElement && !singleExpressionObj){


            var trainElement = $(event.target.parentElement).find('.styled-input');
            var currentIntent = $scope.intentValueData.value;
            var trainObject = $scope.convertSentenceToTrainObj(trainElement, currentIntent);
        }else{
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
            if(event != null && event.hasOwnProperty('currentTarget')){
                buttonLoading.do($(event.currentTarget), 'success');
            }
            if(currentElement && data.data.sent == true){

                setTimeout(function(){

                $scope.getIntentDataWit($scope.intentValueData.value);
                shrinkLoading.do(currentElement, 'success');
                }, 1500);
            }else{
             /*   if(event.hasOwnProperty('currentTarget')){
                    buttonLoading.do($(event.currentTarget), 'error');
                }*/
                if(currentElement){
                    shrinkLoading.do(currentElement, 'error');
                }

            }




        }).catch(function (data) {
            if(event != null && event.hasOwnProperty('currentTarget')){
                buttonLoading.do($(event.currentTarget), 'error');
            }
            if(currentElement){
                shrinkLoading.do(currentElement, 'error');
            }
        });
    }

    $scope.convertSentenceToTrainObj = function (trainElement , currentIntent) {

        var allSpans = trainElement.find('span');

        var trainObj = {
            text: trainElement.text(),
            entities: [
                {
                  entity : 'intent',
                  value : currentIntent
                }
            ]
        };

        if (allSpans.length > 0) {
            for (var i = 0; i < allSpans.length; i++) {
                var currentSpan = $(allSpans[i]);
                trainObj.entities.push({
                    entity: currentSpan.attr('data-entity-name'),
                    start : parseInt(currentSpan.attr('data-first-index')),
                    end : parseInt(currentSpan.attr('data-last-index')),
                    value:  currentSpan.text()
                });
            }
            return trainObj
        }else{
            return null;
        }




    }


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
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

String.prototype.replaceBetween = function (start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};


function getSelectionContainerElement(selection) {
    var sel = selection, el = null;
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
    if (window.getSelection && (window.getSelection().toString().length > 0)) {
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


            var returnRelativeRange = {start: startOffset, end: endOffset};

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
