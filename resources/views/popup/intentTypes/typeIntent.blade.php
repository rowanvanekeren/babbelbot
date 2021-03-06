
<h3 ng-if="intentData.intent_type == 1">Actieve intentie:<i class="fa fa-info-circle" aria-hidden="true" tooltips tooltip-append-to-body="true"
                                                          tooltip-smart="false" tooltip-class="wide-tooltip large-text-tt-3"  tooltip-size="small" tooltip-side="bottom"
                                                          tooltip-template="Wanneer je op een intentie zoekt in het veld hieronder
                                                          en op gebruik klikt of wanneer je een nieuwe intentie aanmaakt, zal de gekozen intentie actief worden en hier tevoorschijn komen.
                                                          vanaf dan is deze actief en kan hij opgepikt worden tijdens een chat <br> <br> <strong>Let op:</strong> training werkt a-sync, soms duurt het even voordat je waarde er bij staat. Wanneer er een <i
                        class='fa fa-check' aria-hidden='true'></i> na het trainen tevoorschijn komt kun je er vanuit
        gaan dat het in goede orde is ontvangen."></i></h3>
<div class="current-active-intent" ng-if="intentData.intent_type == 1">

    <span>@{{ intentData.intent ? intentData.intent : 'geen actieve intentie'  }}</span>
    <div ng-show="intentData.intent">
        <button class="main-btn" ng-click="getIntentData()">Trainen</button>
        <i class="fa fa-times " aria-hidden="true" ng-click="removeActiveIntent()"></i>
    </div>
</div>

<div class="form-group" ng-if="intentData.intent_type == 1">
    <h3>Gebruiker zegt:<i class="fa fa-info-circle" aria-hidden="true" tooltips tooltip-append-to-body="true"
                          tooltip-smart="false" tooltip-class="wide-tooltip large-text-tt-3"  tooltip-size="small" tooltip-side="bottom"
                          tooltip-template="Met dit veld kun je zoeken naar bestaande intenties of nieuwe aanmaken.
                          Inteties zijn de betekenis van een zin. Met intenties kun je de chatbot slimmer maken.
                          En kan hij automatisch zinnen interpreteren. Train je intenties voor een beter resultaat. <br> <br> <strong>Let op:</strong> training werkt a-sync, soms duurt het even voordat je waarde er bij staat. Wanneer er een <i
                        class='fa fa-check' aria-hidden='true'></i> na het trainen tevoorschijn komt kun je er vanuit
        gaan dat het in goede orde is ontvangen."></i></h3>
    <div class="input-wrapper ">

        <input id="" class="default-input inp-loading" type="text"
               name="user_input_intent"
               placeholder="Als gebruiker zegt... (druk enter om te zoeken)"
               my-enter="inputEnterSearchIntent($element, this)" ng-model="intentData.state_intent_data.name" grow-back>

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
    <div class="found-intent" ng-show="!newIntent && intentSearchResult && !searchingIntent">
        <span>@{{intentSearchValue}}</span>
        <div>
            <div class="confidence-intent" >@{{intentSearchConf}} %</div>
           {{-- <button class="main-btn">Details</button>--}}
            <button class="main-btn" ng-click="saveIntentLocal()">Gebruiken</button>
        </div>
    </div>
    <div class='span-option' ng-show="!newIntent && intentSearchResult && !searchingIntent">
        <span ng-click="toggleNewIntent(true)" >  of maak een nieuw </span>
    </div>

    <form>
    <div class="new-intent" ng-show="newIntent && !searchingIntent">

        <input class="default-input" type="text" placeholder="voer nieuwe intent naam in" ng-model="newIntentValue" >

        <button class="main-btn new-intent-button" ng-click="addNewIntent(newIntentValue, intentData.state_intent_data.name, $event)">Nieuw</button>

        <i class="fa fa-times " aria-hidden="true" ng-show="intentSearchResult" ng-click="toggleNewIntent(false)"></i>
    </div>
    </form>
</div>