<div id="flowchart-popup-intent" ng-controller='intentTrainController' active-training="toggleTrainingPopup(data)" ng-show="showTrainingPopup">

    <div class="popup-wrapper " >


        <div class="popup-title">
            <h2 id="intent-title" >Intent: @{{ intentValueData.value }}</h2>
            <i class="fa fa-times " aria-hidden="true" ng-click="toggleTrainingPopup({intent: null, toggle: 'close'})"></i>
        </div>
        <hr>
        <div class="new-intent-expression">
            <div class="form-group" >
                <h3>Voeg zin toe:</h3>
                <div class="input-wrapper new-expression-wrapper">

                    <input id="" class="default-input inp-loading" type="text"
                           name="user_input_intent"
                           placeholder="Als gebruiker zegt..." ng-focus="growBack($event)"
                           my-enter="addExpressionToIntent($element, this)" ng-model="newExpression" grow-back>

                    <i class="fa fa-repeat input-saving-overlay hidden"></i>


                </div>

                <div class="input-error">
                    <div class="no-error" ng-repeat="error in dialogue.description.error"><i
                                class="fa fa-times " aria-hidden="true"></i> Dit is een input error verander
                        my om een error weer te geven
                    </div>

                </div>
            </div>
        </div>
        <div class="intent-train-options">
            <button ng-show="intentValueData.expressions" ng-click="checkExpressionsForEntities(intentValueData.expressions, $event)" class="main-btn">Zoek parameters</button>
            <button ng-click="refreshExpressions($event, intentValueData)" class="main-btn">Vernieuw lijst</button>
        </div>
        <div class="intent-content">
            <div class="form-group" ng-repeat="intent in intentValueData.expressions">

                <div class=" deletable-input">

                    <div class="styled-input" id="intent_@{{ $index }}"  {{--contenteditable="true"--}} ng-mouseup="selectedIntentText($event)" my-enter="saveIntentValue($element, this)">@{{intent }}</div>
                    <i class="fa fa-repeat input-saving-overlay hidden"></i>
                </div>

                <button class="main-btn" ng-click="trainExpression($event)">Train</button>
                <button class="danger-btn" ng-click="deleteExpression($event, $index, intentValueData)"> <i class="fa fa-trash-o input-trash-icon" aria-hidden="true"></i></button>

            </div>
            <div class="col-md-12 apps-loading" ng-show="!intentValueData.expressions">
                <i class="fa fa-spinner" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</div>