<div id="flowchart-popup" ng-controller='intentController' class="flowchart-popup hidden" ng-cloak>
    <div class="popup-title">

        <h2 id="intent-title" data-operator-id="@{{ activeStateID }}">
            Titel: @{{ intentData.state_intent_data.name }}</h2>
        <i class="fa fa-times " aria-hidden="true" ng-click="popupClose()"></i>
    </div>
    <hr>
    <div class="popup-wrapper">


        <div class="form-group hide-load hidden" ng-if="intentData.start_state != 1">
            <h3>Intentie type</h3>

            <div class="input-wrapper ">

                <select class="default-select" ng-change="updateIntentType(activeStateID,intentData.intent_type)"
                        ng-model="intentData.intent_type"
                        ng-options="item.id as item.value for item in intentTypeOptions">
                    <option value="" disabled>Selecteer type</option>

                </select>


            </div>

            <div class="input-error">
                <div class="no-error" ng-repeat="error in dialogue.description.error"><i
                            class="fa fa-times " aria-hidden="true"></i> Dit is een input error verander
                    my om een error weer te geven
                </div>

            </div>
        </div>

        @include('popup/intentTypes/typeIntent')
        @include('popup/intentTypes/typeKeyword')
        @include('popup/intentTypes/typeFreeInput')


        <div ng-show="intentData">
            <h2>Babbelbot antwoord</h2>

            <div class="checkbox-header"><input type="checkbox" ng-model="hasBackend" ng-click="updateType()">

                <h3> naar backend
                    <i class="fa fa-info-circle" aria-hidden="true" tooltips tooltip-append-to-body="true"
                       tooltip-smart="false" tooltip-class="wide-tooltip large-text-tt-1" tooltip-size="small"
                       tooltip-side="bottom"
                       tooltip-template="Ga naar het tablad Apps en zorg er voor dat je een backend url voorziet, de backend functie zorgt er voor dat je eigen antwoorden kunt genereren in je eigen backend.
                       babbelbot zal een post request sturen naar de url die je voorzien hebt. Met de actie die je erbij hebt voorzien. Meer info kun je vinden bij -> Help"></i>
                </h3></div>
            <hr>
        </div>
        <div class="" ng-show="hasBackend && intentData">
            <h3>Actie:</h3>

            <div class="form-group">

                <div class="input-wrapper">

                    <input id="inp-access-token" class="default-input inp-loading" type="text"
                           my-enter="addAction($element, this,intentData.action)" placeholder="Voer actie in"
                           ng-model="intentData.action" grow-back>
                    <i class="fa fa-repeat input-saving-overlay hidden"></i>
                </div>

            </div>
        </div>
        <div class="" ng-show="!hasBackend && intentData">
            <div class="checkbox-header"><input type="checkbox" ng-model="hasIntentAnswers" ng-click="updateType()">

                <h3>Antwoorden:   <i class="fa fa-info-circle" aria-hidden="true" tooltips tooltip-append-to-body="true"
                                     tooltip-smart="false" tooltip-class="wide-tooltip large-text-tt-2" tooltip-size="small"
                                     tooltip-side="bottom"
                                     tooltip-template="Dit zijn de antwoorden die de bot zal geven op wat de gebruiker zegt a.d.h.v. je intentie type. Hierbij zal er automatisch een van de antwoorden worden gekozen "></i>
                </h3></div>

            <div class="form-group" ng-repeat="answer in intentData.state_intent_answers | filter: {answer_type: 1}">

                <div class="input-wrapper deletable-input">
                    <i class="fa fa-trash-o input-trash-icon" aria-hidden="true"
                       ng-click="deleteAnswer($event, intentData, answer.id , answer.index)"></i>
                    <input id="inp-access-token" class="default-input inp-loading" type="text"
                           my-enter="saveAnswer($element, intentData, 1, answer.index )" data-answer-id="@{{ answer.id }}"
                           data-state-intents-id="@{{ answer.state_intents_id }}" placeholder="Geef antwoord in"
                           name="answer.answer"
                           ng-model="answer.answer" grow-back>
                    <i class="fa fa-repeat input-saving-overlay hidden"></i>
                </div>

            </div>


            <div class='span-option'>
                <span ng-click="addAnswer()">  voeg toe </span>
            </div>

            <div class="checkbox-header"><input type="checkbox" ng-model="hasQuickReplies" ng-click="updateType()">

                <h3> Snelle Opties: <i class="fa fa-info-circle" aria-hidden="true" tooltips tooltip-append-to-body="true"
                                       tooltip-smart="false" tooltip-class="wide-tooltip large-text-tt-2" tooltip-size="small"
                                       tooltip-side="top"
                                       tooltip-template="Snelle opties zijn knoppen waaruit een gebruiker kan kiezen. LET OP: vergeet niet voor elke snelle optie een exact woord te voorzien en te linken met deze intentie type"></i></h3></div>
            <div>
                <div class="form-group"
                     ng-repeat="quickReply in intentData.state_intent_answers | filter: {answer_type: 2}">
                    <div class="input-wrapper deletable-input">
                        <i class="fa fa-trash-o input-trash-icon" aria-hidden="true"
                           ng-click="deleteAnswer($event, intentData, quickReply.id, quickReply.index)"></i>
                        <input id="inp-access-token" class="default-input inp-loading" type="text"
                               my-enter="saveAnswer($element, intentData, 2, quickReply.index)" data-answer-id="@{{ quickReply.id }}"
                               data-state-intents-id="@{{ quickReply.state_intents_id }}" name="quickReply"
                               ng-model="quickReply.answer" placeholder="Geef snelle optie in" grow-back>
                        <i class="fa fa-repeat input-saving-overlay hidden"></i>
                    </div>
                </div>

            </div>

            <div class='span-option'>
                <span ng-click="addQuickReply()">  voeg toe </span>
            </div>
        </div>
        <div class="footer-options" ng-if="intentData.start_state != 1" ng-hide="hideIntentFooter" ng-cloak>
            <button class="danger-btn" ng-click="toggleDelete(true)">Verwijderen
            </button>
        </div>
        <div class="col-md-12 apps-loading" ng-show="!intentData">
            <i class="fa fa-spinner" aria-hidden="true"></i>
        </div>

    </div>
</div>