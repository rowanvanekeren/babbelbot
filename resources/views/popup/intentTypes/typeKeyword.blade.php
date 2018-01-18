<div class="form-group" ng-if="intentData.intent_type == 2">
    <h3>Sleutelwoord:</h3>
    <div class="input-wrapper ">

        <input id="" class="default-input inp-loading" type="text"
               name="user_input_intent"
               placeholder="sleutelwoord" grow-back
               my-enter="saveKeywordLocal($element, this)" ng-model="intentData.keyword">

        <i class="fa fa-repeat input-saving-overlay hidden"></i>


    </div>

    <div class="input-error">
        <div class="no-error" ng-repeat="error in dialogue.description.error"><i
                    class="fa fa-times " aria-hidden="true"></i> Dit is een input error verander
            my om een error weer te geven
        </div>

    </div>
</div>