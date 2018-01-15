@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid" ng-controller="standardIntentController" {{--ng-init="getUserApps()"--}} ng-cloak>
        <div class="row modal-overlay" ng-show="showCreateIntent || showDeleteIntent" ng-cloak></div>

        <div class="app-wrapper warning-box" ng-show="showDeleteIntent" ng-cloak>
            <h2>Weet je zeker dat je deze intent wilt verwijderen?</h2>

            <button class="danger-btn" ng-click="deleteIntent()">Verwijder</button>
            <button class="main-btn" ng-click="showDeleteIntent = false">Annuleer</button>
        </div>
        @include('popup/intentEntity')
        @include('popup/intentTrain')
        @include('popup/intent')
        <div class="row top-row-navigation">
            <div class="col-md-6 col-md-offset-3 align-right">

                <button class="main-btn" ng-click="addNewStandard()"> Nieuw Antwoord</button>

            </div>
        </div>

        <div class="row" ng-cloak>

            <div class="col-md-6 col-md-offset-3">


                <div class="col-md-12 app-wrapper standard-intent standard-error-intent" ng-repeat="intent in intents | filter: { intent_type : 9 }">

                    <h3>Standaard error antwoord</h3>
                    <hr>
                    <div class="intent-answer-section">

                        <div class="answers " ng-class="{'answers-open' : answersToggle == intent.id}">
                            <div class="form-group" ng-repeat="answer in intent.intent_answers ">

                                <div class="input-wrapper deletable-input intent-answer-input">
                                    <i class="fa fa-trash-o input-trash-icon" aria-hidden="true"
                                       ng-click="deleteAnswer($index, answer, intent)"></i>
                                    <input  class="default-input inp-loading" type="text"
                                           my-enter="saveAnswer($element, intent, answer, $index)"
                                           placeholder="Geef antwoord in"
                                           ng-model="answer.answer" grow-back>
                                    <i class="fa fa-repeat input-saving-overlay hidden"></i>
                                </div>

                            </div>

                            <div class="form-group" ng-if="intent.intent_answers.length == 0">

                                <div class="input-wrapper deletable-input intent-answer-input">
                                    <i class="fa fa-trash-o input-trash-icon" aria-hidden="true"
                                       ng-click="deleteAnswer($index, answer, intent)"></i>
                                    <input  class="default-input inp-loading" type="text"
                                           my-enter="saveAnswer($element, intent, answer, $index)"
                                           placeholder="Geef antwoord in"
                                           ng-model="answer.answer" grow-back>
                                    <i class="fa fa-repeat input-saving-overlay hidden"></i>
                                </div>

                            </div>

                            <div class='span-option'>
                                <span ng-click="addAnswer(intent)">  voeg toe </span>
                            </div>
                        </div>

                        <div class="toggle-answers" ng-click="toggleAnswers(intent.id, $event)">
                            <span>Antwoorden</span>
                            <i class="fa fa-chevron-down" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>




            </div>
            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper standard-intent" ng-repeat="intent in intents | filter: { intent_type : 1 }">
                    <div class="delete-intent-wrapper">
                        <i class="fa fa-trash-o " aria-hidden="true" ng-click="deleteIntentTrigger(intent, $index)"></i>
                    </div>
                    <div class="intent-top-section " ng-click="popupOpen(intent, $index)">
                        <div class="standard-intent-info">
                    <span class="standard-intent-title">
                        @{{ intent.intent ? intent.intent : '(Klik om intent toe te voegen)' }}
                    </span>
                    <span class="standard-intent-example">
                        @{{ intent.intent_data.name }}
                    </span>
                        </div>

                    </div>
                    <hr>
                    <div class="intent-answer-section">

                        <div class="answers" ng-class="{'answers-open' : answersToggle == intent.id}">
                            <div class="form-group" ng-repeat="answer in intent.intent_answers ">
                                <div class="input-wrapper deletable-input intent-answer-input">
                                    <i class="fa fa-trash-o input-trash-icon" aria-hidden="true"
                                       ng-click="deleteAnswer($index, answer, intent)"></i>
                                    <input  class="default-input inp-loading" type="text"
                                           my-enter="saveAnswer($element, intent, answer , $index)"
                                           placeholder="Geef antwoord in"
                                           ng-model="answer.answer" grow-back>
                                    <i class="fa fa-repeat input-saving-overlay hidden"></i>
                                </div>

                            </div>

                                                        <div class="form-group" ng-if="intent.intent_answers.length == 0">

                                <div class="no-answer">
                                    <p>U heeft nog geen antwoorden, druk op 'voeg toe' om er een toe te voegen</p>
                                </div>

                            </div>

                            </div>--}}

                            <div class='span-option'>
                                <span ng-click="addAnswer(intent)">  voeg toe </span>
                            </div>
                        </div>

                        <div class="toggle-answers" ng-click="toggleAnswers(intent.id, $event)">
                            <span>Antwoorden</span>
                            <i class="fa fa-chevron-down" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>


                <div class="col-md-12 apps-loading" ng-show="loadingIntents && !latestPost">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </div>

            </div>
        </div>

    </div>

@endsection

@section('custom-scripts-before')
    <script src="{{asset('public/js/flowchart/jquery-ui.js')}}"></script>
    <script src="{{asset('public/js/addons/select2.min.js')}}"></script>
@endsection