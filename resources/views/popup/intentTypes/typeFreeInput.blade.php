<div class="form-group" ng-if="intentData.intent_type == 3">
    <h3>Parameternaam</h3>
    <div class="input-wrapper ">

        <input id="" class="default-input inp-loading" type="text"
               name="user_input_intent"
               placeholder="geef parameter naam" ng-focus="growBack($event)"
               my-enter="saveParameterLocal($element, this)" ng-model="intentData.parameter">

        <i class="fa fa-repeat input-saving-overlay hidden"></i>


    </div>

    <div class="input-error">
        <div class="no-error" ng-repeat="error in dialogue.description.error"><i
                    class="fa fa-times " aria-hidden="true"></i> Dit is een input error verander
            my om een error weer te geven
        </div>

    </div>
</div>