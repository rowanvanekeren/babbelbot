angular.module('botApp').controller("intentTrainController", function ($rootScope, $scope, $http, $parse, shrinkLoading, $compile) {

    $scope.toggleTrainingPopup = function (data) {
        console.log(data);
        if (data.toggle == 'open') {
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
        console.log('get entity', event);
        /* console.log($(event.currentTarget).offset());*/

        //    $scope.showFastEntity = true;

        /*    jQuery(jQuery('.fast-entity-popup')).offset({
         top: ($(event.currentTarget).offset().top - 165),
         left: ($(event.currentTarget).offset().left - 110)
         });*/

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


        //jQuery(jQuery('.fast-entity-popup')).detach().appendTo($(event.currentTarget).parent());
        // $('.fast-entity-popup').css({'position' :  'element(#intent_3)'});
        //breakOverflow($('.fast-entity-popup'));

        //$(event.currentElement).offset().top - $(window).scrollTop();
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
            console.log(data);
            $scope.intentValueData = data.data;
            //  console.log($scope.intentValueData.expressions[0]);
            //$scope.checkExpressionsForEntities(data.data.expressions);

        }).catch(function (data) {

        });
    };
    $scope.checkExpressionsForEntities = function (expressions) {


        for (var keyExpression in expressions) {
            if (!expressions.hasOwnProperty(keyExpression)) continue;
            setTimeout(function (currKey) {
                $scope.checkEntityInIntent(expressions[currKey], currKey);
            }.bind(this, keyExpression), 500);
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

            $scope.updateIntentEntityHtml(data.data.entities, intentSelector);


        }).catch(function (data) {

        });
    }
    $scope.saveIntentValue = function (currentElement, currentScope) {
        shrinkLoading.do(currentElement, 'loading');
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


                        if (typeof entityObj[entityKey]._body != 'undefined') {
                            var fullHtml = $(domSelector).html();
                            console.log(fullHtml);
                            var replaceHtml = fullHtml.replace(entityObj[entityKey]._body, "<span data-entity-name='" + key + "'  class='entity-span' ng-click='getEntity($event)'>" + entityObj[entityKey]._body + "</span>");

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

        if(typeof tempClass != 'undefined'){
            var selectionRange = textSelection(tempClass,$event.currentTarget);
        }

        if ( typeof selectionRange != 'undefined' && selectionRange != null) {

            if (!selectionRange.hasOwnProperty('start') && typeof selectionRange.start == null){
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
    $scope.trainExpression = function (event) {
            console.log($(event.currentTarget).parent().find('.styled-input').text());

        //setLoadingButton(event.currentTarget, true, 'Train');
    }

    $scope.convertSentenceToTrainObj= function(){

    }
    /*  $('.styled-input').mouseup(function(){
     console.log('i selected somthing');
     GetSelection();
     });*/


});
function setLoadingButton(element, trueOrFalse , defaultText){
    var icon = ' <i class="fa fa-repeat"></i>';
    if(!trueOrFalse){
        angular.element(  element ).html(defaultText);
    }else if(trueOrFalse){
        angular.element(  element ).html(defaultText + icon);
    }

}

function GetSelection() {

    if (window.getSelection) {  // all browsers, except IE before version 9
        var selectionRange = window.getSelection();
       // console.log(selectionRange.toString())
      //  console.log('selectionRange', selectionRange);
        return selectionRange;
    }
    else {
        if (document.selection.type == 'None') {
            return "";
        }
        else {
            var textRange = document.selection.createRange();
           // console.log('textRange',textRange);
            return textRange;
        }
    }

};

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

String.prototype.replaceBetween = function(start, end, what) {
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



function textSelection(tempClass, element){
    if (window.getSelection && (window.getSelection().toString().length > 0)) {
        // not IE case
        var selObj = window.getSelection();
        var selRange = selObj.getRangeAt(0);

        var checkChilds = checkForDifferentNodes(selRange.cloneContents().childNodes);

        var selectedElement =  getSelectionContainerElement(selObj);
        console.log(checkChilds);
        if(selectedElement.nodeName == 'DIV' && checkChilds){
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
            console.log('check position', returnRelativeRange);
            selObj.removeAllRanges();

            return returnRelativeRange;
        }else{
            return null;
        }
    }
}

function checkForDifferentNodes(childnodes){
    for(var i = 0; i < childnodes.length ; i++){
        if(childnodes[i].nodeName != '#text'){
            return false;
        }
    }

    return true;
}
