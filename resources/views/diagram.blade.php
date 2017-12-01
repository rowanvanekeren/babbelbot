@extends('layouts.dashboard')



@section('content')

    <div class="flowchart-wrapper">
        <div id="flowchart-base" class="flowchart-base"> <div class="row modal-overlay hidden" ></div></div>

        <div class="app-wrapper warning-box delete-link hidden">
            <h2>Weet je zeker dat je deze link wilt verwijderen?</h2>

            <button class="danger-btn delete-link-button">Verwijder</button>
            <button class="main-btn exit-warning-box" >Annuleer</button>
        </div>
        <div class="app-wrapper fast-entity-popup"  ng-controller='intentEntityController'  active-entity="toggleEntityPopup(data)" ng-init="initEntity()">
            <div class="fast-entity-top">
                <h3>@{{ (entityName)? entityName : 'Nieuwe entity' }}</h3>
                <i class="fa fa-times " aria-hidden="true" ng-click="showEnitityPopup('close')"></i>

            </div>
            <div class="entity-select-wrapper" ng-show="!entityName">


            <select class="default-select entity-select"  {{--ng-model="selectedEntity"--}}>
                <option ng-repeat="entity in allEntities">@{{entity}}</option>

            </select>
            </div>
            <div class="form-group">

                <div class="input-wrapper ">

                    <input id="" class="default-input inp-loading" type="text"
                           name="entity-value"
                           placeholder="Er is iets fout gegaan"  ng-model="entityValue"
                           disabled>

                    <i class="fa fa-repeat input-saving-overlay hidden"></i>
                </div>

            </div>
            <div class="form-group delete-entity">

                <div class="input-wrapper ">

             <button class="danger-btn" ng-click="deleteEntity()" ng-show="entityName">Verwijder entity </button>
             <button class="main-btn " ng-click="saveEntity()" ng-show="!entityName">Voeg entity toe</button>
                </div>
                <span> *vereist training</span>
            </div>

        </div>

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
        <div id="flowchart-popup" ng-controller='intentController' class="flowchart-popup hidden">

            <div class="popup-wrapper">
                <div class="popup-title">
                <h2 id="intent-title" data-operator-id="@{{ activeStateID }}">Titel: @{{ intentData.state_intent_data.name }}</h2>
                <i class="fa fa-times " aria-hidden="true" ng-click="popupClose()"></i>
                </div >
                    <hr>

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
                        <input class="default-input" type="text" placeholder="voer nieuwe intent naam in">

                        <button class="main-btn">Nieuw</button>
                        <i class="fa fa-times " aria-hidden="true" ng-show="intentSearchResult" ng-click="newIntent = false"></i>
                    </div>
                </div>


                <div class="form-group" ng-if="intentData.intent_type == 2">
                    <h3>Sleutelwoord:</h3>
                    <div class="input-wrapper ">

                        <input id="" class="default-input inp-loading" type="text"
                               name="user_input_intent"
                               placeholder="sleutelwoord" ng-focus="growBack($event)"
                               my-enter="saveKeywordLocal($element, this)" ng-model="intentData.state_intent_data.name">

                        <i class="fa fa-repeat input-saving-overlay hidden"></i>


                    </div>

                    <div class="input-error">
                        <div class="no-error" ng-repeat="error in dialogue.description.error"><i
                                    class="fa fa-times " aria-hidden="true"></i> Dit is een input error verander
                            my om een error weer te geven
                        </div>

                    </div>
                </div>
                <div>
                    <h2>Babbelbot antwoord</h2>
                    <div class="checkbox-header"><input type="checkbox"  ng-model="hasBackend" ng-click="updateType()"> <h3> naar backend</h3></div>
                    <hr>
                </div>
                <div class="" ng-show="hasBackend">
                    <h3>Actie:</h3>
                    <div class="form-group">

                        <div class="input-wrapper">

                            <input id="inp-access-token" class="default-input inp-loading" type="text"
                                   my-enter="inputEnter($element, this)" placeholder="Voer actie in">
                            <i class="fa fa-repeat input-saving-overlay hidden"></i>
                        </div>

                    </div>
                </div>
                <div class="" ng-show="!hasBackend">
                <div class="checkbox-header"><input type="checkbox" ng-model="hasIntentAnswers" ng-click="updateType()"> <h3>Antwoorden:</h3></div>

                <div class="form-group" ng-repeat="answer in intentData.state_intent_answers | filter: {answer_type: 1}">

                    <div class="input-wrapper deletable-input">
                        <i class="fa fa-trash-o input-trash-icon" aria-hidden="true" ng-click="deleteAnswer($event, this, answer.id)"></i>
                        <input id="inp-access-token" class="default-input inp-loading" type="text"
                               my-enter="saveAnswer($element, this, 1)" data-answer-id="@{{ answer.id }}" data-state-intents-id="@{{ answer.state_intents_id }}"  placeholder="Geef antwoord in" name="answer.answer"
                                ng-model="answer.answer">
                        <i class="fa fa-repeat input-saving-overlay hidden"></i>
                    </div>

                </div>


                <div class='span-option' >
                    <span ng-click="addAnswer()">  voeg toe </span>
                </div>

               <div class="checkbox-header"><input type="checkbox" ng-model="hasQuickReplies" ng-click="updateType()"> <h3> Snelle Opties:</h3></div>
                <div>
                    <div class="form-group" ng-repeat="quickReply in intentData.state_intent_answers | filter: {answer_type: 2}">
                        <div class="input-wrapper deletable-input">
                            <i class="fa fa-trash-o input-trash-icon" aria-hidden="true" ng-click="deleteAnswer($event, this, quickReply.id)"></i>
                            <input id="inp-access-token" class="default-input inp-loading" type="text"
                                   my-enter="saveAnswer($element, this, 2)" data-answer-id="@{{ quickReply.id }}" data-state-intents-id="@{{ quickReply.state_intents_id }}" name="quickReply" ng-model="quickReply.answer" placeholder="Geef snelle optie in">
                            <i class="fa fa-repeat input-saving-overlay hidden"></i>
                        </div>
                    </div>

                </div>

                <div class='span-option'>
                    <span ng-click="addQuickReply()">  voeg toe </span>
                </div>
                </div>


            </div>
        </div>
        <div id="flowchart-menu" class="flowchart-menu">

            <div class="toggle-menu"><i class="fa fa-wrench" aria-hidden="true"></i></div>
            <div class="toggle-menu-collapse">
                <div class="toggle-content-wrapper">
                <div class="toggle-menu-close"><div><i class="fa fa-chevron-right" aria-hidden="true"></i></div></div>
                <div class="toggle-menu-content">
                <div class="draggable_operator ui-draggable ui-draggable-handle" data-default-text="(nog geen titel)" data-intent-type="1" data-nb-inputs="1" data-nb-outputs="1">Intent</div>
                <div class="draggable_operator ui-draggable ui-draggable-handle" data-default-text="(nog geen titel)" data-intent-type="2" data-nb-inputs="1" data-nb-outputs="1">Sleutelwoord</div>
                </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('custom-scripts-before')
    <script src="{{asset('public/js/flowchart/jquery-1.10.2.js')}}"></script>
    <script src="{{asset('public/js/flowchart/jquery-ui.js')}}"></script>
    <script src="{{asset('public/js/flowchart/jquery.panzoom.min.js')}}"></script>
    <script src="{{asset('public/js/flowchart/jquery.mousewheel.min.js')}}"></script>
    <script src="{{asset('public/js/flowchart/jquery.flowchart.js')}}"></script>
    <script src="{{asset('public/js/addons/select2.min.js')}}"></script>

@endsection

@section('custom-scripts-after')

    <script src="{{asset('public/js/diagram.js')}}"></script>
@endsection

