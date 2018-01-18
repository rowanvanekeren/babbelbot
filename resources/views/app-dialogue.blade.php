@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid" ng-controller="dialogueController" ng-init="getDialogues()">
        <div class="row modal-overlay" ng-show="showCreateDialogue || showDeleteDialogue" ng-cloak></div>

        <div class="app-wrapper warning-box" ng-show="showDeleteDialogue" ng-cloak>
            <h2>Weet je zeker dat je dit dialoog wilt verwijderen?</h2>

            <button class="danger-btn" ng-click="deleteDialogue($event, deleteID)">Verwijder</button>
            <button class="main-btn" ng-click="showDeleteDialogue = false">Annuleer</button>
        </div>

        <div class="row top-row-navigation">
            <div class="col-md-6 col-md-offset-3 align-right">

                <button class="main-btn" ng-click="newDialogueTrigger(newDialogue)"> Nieuw dialoog</button>

            </div>
        </div>

        <div class="row" ng-cloak>
            <div class="col-md-6 col-md-offset-3">


                {{--  oude versie nieuwe app--}}
                <div class="col-md-12 app-wrapper new-app" ng-show="showCreateDialogue"
                     ng-class="{'ng-enter ng-enter-active': showCreateDialogue}">
                    <form id="newDialogue" name="newDialogue">
                        <div class="app-top-section">
                            <div class="input-wrapper disable-shrink">
                                <input type="text" class='inp-head-name' placeholder="Dialoog Naam" name="title"
                                       ng-model="title">
                            </div>
                            <span ng-click="newDialogueTrigger(newDialogue)"><i class="fa fa-times "
                                                                                aria-hidden="true"></i></span>


                        </div>
                        <div class="input-error">
                            <div ng-repeat="errorMessage in newDialogue.title.$error.serverMessage"
                                 ng-show="newDialogue.title.$error.serverMessage"
                                 ng-class="{'has-error': newDialogue.title.$error.serverMessage }">
                                <i class="fa fa-times " aria-hidden="true"></i> @{{errorMessage}}
                            </div>
                        </div>
                        <div class="app-center-section">

                            <div class="form-group">

                                <div class="input-wrapper disable-shrink">

                                    <input id="" class="inp-description" type="text"
                                           value="Een kleine descriptie over de app"
                                           placeholder="Plaats een kleine descriptie" name="description" ng-model="description">

                                    <i class="fa fa-repeat input-saving-overlay hidden"></i>

                                </div>
                                <div class="input-error">

                                    <div ng-repeat="errorMessage in newDialogue.description.$error.serverMessage"
                                         ng-show="newDialogue.description.$error.serverMessage"
                                         ng-class="{'has-error': newDialogue.description.$error.serverMessage }">
                                        <i class="fa fa-times " aria-hidden="true"></i> @{{errorMessage}}
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div class="app-footer-section">

                            <button class="main-btn async-save" ng-click="storeNewDialogue(newDialogue)">Opslaan
                            </button>
                        </div>
                    </form>
                </div>

            </div>

            <div class="col-md-6 col-md-offset-3">


                <div class="col-md-12 app-wrapper" ng-repeat="dialogue in dialogues" my-repeat-directive>
                    <div class="app-top-section">
                        <div class="input-wrapper disable-shrink">
                            <input type="text" class='inp-head-name' name="title" placeholder="Dialoog naam" grow-back
                                   my-enter="inputEnter($element, this)" ng-model="dialogue.title">
                            <i class="fa fa-repeat input-saving-overlay hidden"></i>
                        </div>

                        <span ng-click="deleteDialogueTrigger(dialogue.id)"><i class="fa fa-trash-o" aria-hidden="true"></i></span>


                    </div>
                    <div class="app-center-section">
                        <div class="form-group">
                            <div class="input-wrapper " >

                                <input id="" class="inp-description inp-loading" type="text"
                                       name="description"
                                       placeholder="Plaats een kleine descriptie" grow-back
                                       my-enter="inputEnter($element, this)" ng-model="dialogue.description">

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
                    <div class="app-footer-section">

                        <button class="main-btn" ng-click="selectDialogue(dialogue)">Bewerk dialoog</button>
                    </div>

                </div>

                <div class="col-md-12 apps-loading" ng-show="loadingDialogues && !latestPost">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </div>

            </div>
        </div>

    </div>

@endsection