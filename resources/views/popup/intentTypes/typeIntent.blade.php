<h3 ng-if="intentData.intent_type == 1">Actieve intent:</h3>
<div class="current-active-intent" ng-if="intentData.intent_type == 1">

    <span>@{{ intentData.intent ? intentData.intent : 'geen actieve intent'  }}</span>
    <div ng-show="intentData.intent">
        <button class="main-btn" ng-click="getIntentData()">Trainen</button>
        <i class="fa fa-times " aria-hidden="true" ng-click="removeActiveIntent()"></i>
    </div>
</div>

<div class="form-group" ng-if="intentData.intent_type == 1">
    <h3>Gebruiker zegt:</h3>
    <div class="input-wrapper ">

        <input id="" class="default-input inp-loading" type="text"
               name="user_input_intent"
               placeholder="Als gebruiker zegt..." ng-focus="growBack($event)"
               my-enter="inputEnterSearchIntent($element, this)" ng-model="intentData.state_intent_data.name">

        <i class="fa fa-repeat input-saving-overlay hidden"></i>


    </div>

    <div class="input-error">
        <div class="no-error" ng-repeat="error in dialogue.description.error"><i
                    class="fa fa-times " aria-hidden="true"></i> Dit is een input error verander
            my om een error weer te geven
        </div>

    </div>
</div>

<div class="form-group" ng-if="intentData.intent_type == 1">
    <div class="found-intent" ng-show="!newIntent && intentSearchResult">
        <span>@{{intentSearchValue}}</span>
        <div>
            <div class="confidence-intent" >@{{intentSearchConf}} %</div>
            <button class="main-btn">Details</button>
            <button class="main-btn" ng-click="saveIntentLocal()">Gebruiken</button>
        </div>
    </div>
    <div class='span-option' ng-show="!newIntent && intentSearchResult">
        <span ng-click="newIntent = true" >  of maak een nieuw </span>
    </div>
    <div class=" new-intent" ng-show="newIntent">
        <input class="default-input" type="text" placeholder="voer nieuwe intent naam in" ng-model="newIntentValue">

        <button class="main-btn" ng-click="addNewIntent(newIntentValue, intentData.state_intent_data.name)">Nieuw</button>
        <i class="fa fa-times " aria-hidden="true" ng-show="intentSearchResult" ng-click="newIntent = false"></i>
    </div>
</div>