@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid" ng-controller="entityController" ng-init="toggleInit()" ng-cloak>
        <div class="row modal-overlay" ng-show="showCreateEntity || showDeleteEntity || showNewEntityValue || showDeleteEntityValue"></div>

        <div class="app-wrapper warning-box" ng-show="showDeleteEntity">
            <h2>Weet je zeker dat je deze entity wilt verwijderen?</h2>

            <button class="danger-btn" ng-click="deleteEntity($event, entityData.name)">Verwijder</button>
            <button class="main-btn" ng-click="showDeleteEntity = false">Annuleer</button>
        </div>
        <div class="app-wrapper warning-box" ng-show="showDeleteEntityValue">
            <h2>Weet je zeker dat je deze entity waarde wilt verwijderen?</h2>

            <button class="danger-btn" ng-click="deleteEntityValue()">Verwijder</button>
            <button class="main-btn" ng-click="showDeleteEntityValue = false">Annuleer</button>
        </div>
        <div class="row top-row-navigation">
            <div class="col-md-6 col-md-offset-3 align-right">

                <button class="main-btn" ng-click="newEntityTrigger(newApp)"> Nieuwe Entity</button>

            </div>
        </div>

        <div class="row">
            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper new-entity" ng-show="showCreateEntity"
                     ng-class="{'ng-enter ng-enter-active': showCreateEntity}">
                    <form id="newApp" name="newApp">
                        <div class="app-top-section">
                            <div class="input-wrapper disable-shrink">
                                <h1>Nieuwe Entity</h1>
                            </div>
                            <span ng-click="newEntityTrigger(newApp)"><i class="fa fa-times "
                                                                         aria-hidden="true"></i></span>


                        </div>
                        <hr>

                        <div class="entity-type">

                            <div class="form-group">
                                <h3>
                                    Entity naam
                                </h3>

                                <div class="input-wrapper disable-shrink">
                                    <input id="" class="default-input " type="text" name="" ng-model="newEntity">
                                </div>

                                <div class="input-error">
                                    <div ng-repeat="errorMessage in newApp.server_token.$error.serverMessage"
                                         ng-show="newApp.server_token.$error.serverMessage"
                                         ng-class="{'has-error': newApp.server_token.$error.serverMessage }">
                                        <i class="fa fa-times " aria-hidden="true"></i> @{{errorMessage}}
                                    </div>
                                </div>

                            </div>
                            <div class="form-group">
                                <h3>
                                    Entity type
                                </h3>
                            <select class="default-select" ng-model="newEntityType">

                                <option value="keywords">Alleen sleutelwoorden</option>
                                <option value="">Sleutelwoorden en vrije tekst (training vereist)</option>


                            </select>
                            </div>

                        </div>
                        <div class="app-footer-section">

                            <button class="main-btn async-save" ng-click="storeNewEntity(newEntity,newEntityType)"> Opslaan
                            </button>
                        </div>
                    </form>
                </div>

            </div>
            <div class="col-md-6 col-md-offset-3">
                <div class="col-md-12 app-wrapper">
                    <div class="input-replace-loading" ng-show="!allEntities">
                        <i class="fa fa-repeat "></i>
                    </div>
                    <div class="entity-select-wrapper" ng-show="!entityName && allEntities">


                        <select class=" entity-select" ng-change='entityChange()' ng-model="selectedEntity" ng-cloak>
                            <option value="" disabled selected>Selecteer entity</option>
                            <option ng-repeat="entity in allEntities">@{{ entity }}</option>

                        </select>
                    </div>

                    <div class="selected-entity" ng-show="entityData.name">
                        <h3>@{{ entityData.name }}</h3>
                        <button class="danger-btn" ng-click="showDeleteEntity = true"><i class="fa fa-trash-o"></i></button>
                    </div>
                </div>
            </div>

            <div ng-show="entityData">
            <div class="col-md-6 col-md-offset-3 entity-values-title">

                <h2>Waarden entity</h2>
                <button class="main-btn" ng-click="showNewEntityValue = !showNewEntityValue">Nieuwe waarde</button>

            </div>

            <div class="col-md-6 col-md-offset-3 ">
                <hr>
            </div>
            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper " ng-show="(!entityData.values || entityData.values.length < 1 ) && !showNewEntityValue">
                    <h3>Geen resultaten</h3>
                </div>

                <div class="col-md-12 app-wrapper " ng-if="entityData.lookups.length < 1">
                    <h3>Zorg ervoor dat je eerst je entity traint via het intent popup bij 'standaard antwoorden' of 'dialogen -> flowchart'</h3>
                </div>
            </div>

            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper new-entity-value" ng-show="showNewEntityValue">
                    <div class="exit-new-entity-value">
                        <span ng-click="showNewEntityValue = false"><i class="fa fa-times " aria-hidden="true"></i></span>
                    </div>
                    <div class="form-group">
                        <div class=" entity-values-title">
                            <h3>Waarde</h3>

                        </div>

                        <div class="input-wrapper disable-shrink">
                            <input id="" class="default-input" type="text" name="" ng-model="newEntityValue">
                        </div>

                    </div>


                    <div class="add-entity-wrapper">

                        <div class="form-group">
                            <label for="inp-dev-token">
                                Synoniemen
                            </label>

                            <div class="input-wrapper  disable-shrink">
                                <tags-input ng-model="newEntityExpressions"

                                            replace-spaces-with-dashes="false"></tags-input>
                            </div>

                            <div class="input-error">
                                <div ng-repeat="errorMessage in newApp.server_token.$error.serverMessage"
                                     ng-show="newApp.server_token.$error.serverMessage"
                                     ng-class="{'has-error': newApp.server_token.$error.serverMessage }">
                                    <i class="fa fa-times " aria-hidden="true"></i> @{{errorMessage}}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="app-footer-section">

                        <button class="main-btn async-save" ng-click="storeNewEntityValue(entityData.name, newEntityValue,newEntityExpressions )"> Opslaan
                        </button>
                    </div>
                </div>

            </div>

            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper" ng-repeat="value in entityData.values">

                    <div class="app-top-section">
                        <div class="input-wrapper disable-shrink">
                            <h3>@{{ value.value }}</h3>
                        </div>
                            <span ng-click="toggleDeleteEntityValue(value, $index)"><i class="fa fa-times "
                                                                         aria-hidden="true"></i></span>


                    </div>
                    <hr>


                    <div class="add-entity-wrapper">

                        <div class="form-group">
                            <label for="inp-dev-token">
                                Synoniemen
                            </label>

                            <div class="input-wrapper  disable-shrink">
                                <tags-input ng-model="value.expressions"
                                            on-tag-added="addSynonym($tag, value, entityData)"
                                            replace-spaces-with-dashes="false"></tags-input>
                            </div>

                            <div class="input-error">
                                <div ng-repeat="errorMessage in newApp.server_token.$error.serverMessage"
                                     ng-show="newApp.server_token.$error.serverMessage"
                                     ng-class="{'has-error': newApp.server_token.$error.serverMessage }">
                                    <i class="fa fa-times " aria-hidden="true"></i> @{{errorMessage}}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>

            </div>
            <div  class="col-md-6 col-md-offset-3" ng-show="loadEntityValues">
                <div class="col-md-12 apps-loading">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </div>
            </div>
        </div>

    </div>

@endsection

@section('custom-scripts-before')


    <script src="{{asset('public/js/addons/select2.min.js')}}"></script>

@endsection