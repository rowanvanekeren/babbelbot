



<div id="flowchart-popup" class="flowchart-popup small-popup" ng-show="intentPopupToggle">

    <div class="popup-wrapper">
        <div class="popup-title">
            <h2 id="intent-title" {{--data-operator-id="@{{ activeStateID }}"--}}>Titel: @{{ intentData.intent_data.name }}</h2>
            <i class="fa fa-times " aria-hidden="true" ng-click="popupClose()"></i>
        </div >
        <hr>

        <h3 >Actieve intentie:<i class="fa fa-info-circle" aria-hidden="true" tooltips tooltip-append-to-body="true"
                               tooltip-smart="false" tooltip-class="wide-tooltip large-text-tt-1"  tooltip-size="small" tooltip-side="bottom"
                               tooltip-template="Wanneer je op een intentie zoekt in het veld hieronder
                                                          en op gebruik klikt of wanneer je een nieuwe intentie aanmaakt, zal de gekozen intentie actief worden en hier tevoorschijn komen.
                                                          vanaf dan is deze actief en kan hij opgepikt worden tijdens een chat"></i></h3>
        <div class="current-active-intent" >

            <span>@{{ intentData.intent ? intentData.intent : 'geen actieve intentie'  }}</span>
            <div ng-show="intentData.intent">
                <button class="main-btn" ng-click="getIntentData()">Trainen</button>
                <i class="fa fa-times " aria-hidden="true" ng-click="removeActiveIntent(intentData.id)"></i>
            </div>
        </div>

        <div class="form-group" >
            <h3>Gebruiker zegt: <i class="fa fa-info-circle" aria-hidden="true" tooltips tooltip-append-to-body="true"
                                   tooltip-smart="false" tooltip-class="wide-tooltip large-text-tt-1"  tooltip-size="small" tooltip-side="bottom"
                                   tooltip-template="Met dit veld kun je zoeken naar bestaande intenties of nieuwe aanmaken.
                          Inteties zijn de betekenis van een zin. Met intenties kun je de chatbot slimmer maken.
                          En kan hij automatisch zinnen interpreteren. Train je intenties voor een beter resultaat"></i></h3>
            <div class="input-wrapper ">

                <input id="" class="default-input inp-loading" type="text"
                       name="user_input_intent"
                       placeholder="Als gebruiker zegt..." grow-back
                       my-enter="inputEnterSearchIntent($element, this)" ng-model="intentData.intent_data.name">

                <i class="fa fa-repeat input-saving-overlay hidden"></i>


            </div>

            <div class="input-error">
                <div class="no-error" ng-repeat="error in dialogue.description.error"><i
                            class="fa fa-times " aria-hidden="true"></i> Dit is een input error verander
                    my om een error weer te geven
                </div>

            </div>
        </div>

        <div class="form-group" >
            <div class="found-intent" ng-show="!newIntent && intentSearchResult">
                <span>@{{intentSearchValue}}</span>
                <div>
                    <div class="confidence-intent" >@{{intentSearchConf}} %</div>
               {{--     <button class="main-btn">Details</button>--}}
                    <button class="main-btn" ng-click="saveIntent()">Gebruiken</button>
                </div>
            </div>
            <div class='span-option' ng-show="!newIntent && intentSearchResult">
                <span ng-click="newIntent = true" >  of maak een nieuw </span>
            </div>
            <form>
            <div class=" new-intent" ng-show="newIntent">
                <input class="default-input" type="text" placeholder="voer nieuwe intent naam in" ng-model="newIntentValue">

                <button class="main-btn" ng-click="addNewIntent(newIntentValue, intentData.intent_data.name, $event)">Nieuw</button>
                <i class="fa fa-times " aria-hidden="true" ng-show="intentSearchResult" ng-click="newIntent = false"></i>
            </div>
            </form>
        </div>
        <div class="input-error">
            <div class="no-error" ng-class="{'has-error' : intentData.error}" ng-repeat="error in intentData.error"><i
                        class="fa fa-times " aria-hidden="true"></i> @{{ error[0] }}
            </div>

        </div>




    </div>
</div>