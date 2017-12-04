<div id="flowchart-popup-intent" ng-controller='intentTrainController' active-training="toggleTrainingPopup(data)" ng-show="showTrainingPopup">

    <div class="popup-wrapper " >


        <div class="popup-title">
            <h2 id="intent-title" >Intent: @{{ intentValueData.value }}</h2>
            <i class="fa fa-times " aria-hidden="true" ng-click="toggleTrainingPopup({intent: null, toggle: 'close'})"></i>
        </div>
        <hr>
        <span ng-show="intentValueData.expressions" ng-click="checkExpressionsForEntities(intentValueData.expressions)">Kijk voor data parameters</span>
        <div class="intent-content">
            <div class="form-group" ng-repeat="intent in intentValueData.expressions">

                <div class=" deletable-input">

                    <div class="styled-input" id="intent_@{{ $index }}"  {{--contenteditable="true"--}} ng-mouseup="selectedIntentText($event)" my-enter="saveIntentValue($element, this)">@{{intent }}</div>
                    <i class="fa fa-repeat input-saving-overlay hidden"></i>
                </div>

                <button class="main-btn" ng-click="trainExpression($event)">Train</button>
                <button class="danger-btn"> <i class="fa fa-trash-o input-trash-icon" aria-hidden="true"></i></button>

            </div>
        </div>
    </div>
</div>