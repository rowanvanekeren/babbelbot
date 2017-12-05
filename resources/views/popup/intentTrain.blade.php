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
                           my-enter="addExpressionToIntent($element, this)" ng-model="newExpression">

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