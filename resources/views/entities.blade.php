@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid" ng-controller="entityController" ng-init="toggleInit()" ng-cloak>
        <div class="row modal-overlay" ng-show="showCreateEntity || showDeleteEntity"></div>

        <div class="app-wrapper warning-box" ng-show="showDeleteEntity">
            <h2>Weet je zeker dat je deze entity wilt verwijderen?</h2>

            <button class="danger-btn" ng-click="deleteApp($event, deleteID)">Verwijder</button>
            <button class="main-btn" ng-click="showDeleteApp = false">Annuleer</button>
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
                                    <input id="inp-dev-token" class="default-input " type="text" name="">
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
                                <label>
                                    Entity type
                                </label>

                                <div class="entity-select-wrapper" ng-show="!entityName">

                                    <select class="default-select " {{--ng-model="selectedEntity"--}}>
                                        <option>test 1</option>
                                        <option>test 2</option>
                                        <option>test 3</option>

                                    </select>
                                </div>

                                <div class="input-error">
                                    <div ng-repeat="errorMessage in newApp.access_token.$error.serverMessage"
                                         ng-show="newApp.access_token.$error.serverMessage"
                                         ng-class="{'has-error': newApp.access_token.$error.serverMessage }">
                                        <i class="fa fa-times " aria-hidden="true"></i> @{{errorMessage}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="app-footer-section">

                            <button class="main-btn async-save" ng-click="storeNewApp(newApp)"> Opslaan</button>
                        </div>
                    </form>
                </div>

            </div>
            <div class="col-md-6 col-md-offset-3">
                <div class="col-md-12 app-wrapper">
                    <div class="entity-select-wrapper" ng-show="!entityName">


                        <select class="default-select entity-select" ng-change='entityChange()'ng-model="selectedEntity">
                            <option ng-repeat="entity in allEntities">@{{ entity }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-md-offset-3">
                <div class="col-md-12">
                    <h2>Entity</h2>
                </div>
            </div>

            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper">
                    <div class="app-top-section">
                        <div class="input-wrapper disable-shrink">

                            <h3>@{{ entityData.name }}</h3>
                        </div>
                      {{--  <span ng-click="deleteAppTrigger(app.id)"><i class="fa fa-times " aria-hidden="true"></i></span>--}}


                    </div>
                    <div class="app-center-section">
                        <div class="entity-select-wrapper" ng-show="!entityName">

                            <select class="default-select " {{--ng-model="selectedEntity"--}}>
                                <option>test 1</option>
                                <option>test 2</option>
                                <option>test 3</option>

                            </select>
                        </div>
                    </div>
                    <div class="app-footer-section">

                        <button class="danger-btn">Verwijder entity</button>
                    </div>

                </div>

                <div class="col-md-12 apps-loading" ng-show="loadingApps && !latestPost">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </div>

            </div>

            <div class="col-md-6 col-md-offset-3">
                <div class="col-md-12">
                    <h2>Waardes entity</h2>
                </div>
            </div>

            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper" ng-repeat="value in entityData.values">

                        <div class="app-top-section">
                            <div class="input-wrapper disable-shrink">
                                <h3>@{{ value.value }}</h3>
                            </div>
                            <span ng-click="newEntityTrigger(newApp)"><i class="fa fa-times "
                                                                         aria-hidden="true"></i></span>


                        </div>
                        <hr>


                        <div class="add-entity-wrapper">

                            <div class="form-group">
                                <label for="inp-dev-token">
                                    Synoniemen
                                </label>

                                <div class="input-wrapper  disable-shrink">
                                    <tags-input ng-model="value.expressions" on-tag-added="addSynonym($tag, value.expressions, entityData)" replace-spaces-with-dashes="false"></tags-input>
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

    </div>

@endsection

@section('custom-scripts-before')


    <script src="{{asset('public/js/addons/select2.min.js')}}"></script>

@endsection