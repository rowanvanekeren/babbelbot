@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid" ng-controller="appController" ng-init="getUserApps()" ng-cloak>
        <div class="row modal-overlay" ng-show="showCreateApp || showDeleteApp"></div>

        <div class="app-wrapper warning-box" ng-show="showDeleteApp">
            <h2>Weet je zeker dat je deze app wilt verwijderen?</h2>

            <button class="danger-btn" ng-click="deleteApp($event, deleteID)">Verwijder</button>
            <button class="main-btn" ng-click="showDeleteApp = false">Annuleer</button>
        </div>

        <div class="row top-row-navigation">
            <div class="col-md-6 col-md-offset-3 align-right">

                <button class="main-btn" ng-click="newAppTrigger(newApp)"> Nieuwe App</button>

            </div>
        </div>

        <div class="row">
            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper new-app" ng-show="showCreateApp"
                     ng-class="{'ng-enter ng-enter-active': showCreateApp}">
                    <form id="newApp" name="newApp">
                        <div class="app-top-section">
                            <div class="input-wrapper disable-shrink">
                                <input type="text" class='inp-head-name' placeholder="App naam" name="title"
                                       ng-model="title">
                            </div>
                            <span ng-click="newAppTrigger(newApp)"><i class="fa fa-times "
                                                                      aria-hidden="true"></i></span>


                        </div>
                        <div class="input-error">
                            <div ng-repeat="errorMessage in newApp.title.$error.serverMessage"
                                 ng-show="newApp.title.$error.serverMessage"
                                 ng-class="{'has-error': newApp.title.$error.serverMessage }">
                                <i class="fa fa-times " aria-hidden="true"></i> @{{errorMessage}}
                            </div>
                        </div>
                        <div class="app-center-section">

                            <div class="form-group">
                                <label for="inp-access-token">
                                    Wit.ai access token
                                </label>

                                <div class="input-wrapper see-password-input disable-shrink">
                                    <i class="fa fa-eye password-eye-icon" aria-hidden="true"></i>
                                    <input id="inp-access-token" class="default-input inp-loading" type="password"
                                           name="access_token" ng-model="access_token">

                                </div>
                                <div class="input-error">

                                    <div ng-repeat="errorMessage in newApp.access_token.$error.serverMessage"
                                         ng-show="newApp.access_token.$error.serverMessage"
                                         ng-class="{'has-error': newApp.access_token.$error.serverMessage }">
                                        <i class="fa fa-times " aria-hidden="true"></i> @{{errorMessage}}
                                    </div>

                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inp-dev-token">
                                    Wit.ai developers token
                                </label>

                                <div class="input-wrapper see-password-input disable-shrink">
                                    <i class="fa fa-eye password-eye-icon" aria-hidden="true"></i>
                                    <input id="inp-dev-token" class="default-input " type="password" name="server_token"
                                           ng-model="server_token">

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

                            <button class="main-btn async-save" ng-click="storeNewApp(newApp)"> Opslaan</button>
                        </div>
                    </form>
                </div>

            </div>

            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper" ng-repeat="app in apps" my-repeat-directive>
                    <div class="app-top-section">
                        <div class="input-wrapper disable-shrink">
                            <input type="text" class='inp-head-name' ng-model="app.title" name="title"
                                   my-enter="inputEnter($element, this)" ng-focus="growBack($event)">
                            <i class="fa fa-repeat input-saving-overlay hidden"></i>

                        </div>
                        <span ng-click="deleteAppTrigger(app.id)"><i class="fa fa-times " aria-hidden="true"></i></span>


                    </div>
                    <div class="app-center-section">
                        <div class="form-group">
                            <label for="inp-access-token">
                                Wit.ai access token
                            </label>

                            <div class="input-wrapper see-password-input">
                                <i class="fa fa-eye password-eye-icon" aria-hidden="true"></i>
                                <input id="inp-access-token" class="default-input inp-loading" type="password"
                                       name="access_token" ng-model="app.access_token"
                                       my-enter="inputEnter($element, this)" ng-focus="growBack($event)">
                                <i class="fa fa-repeat input-saving-overlay hidden"></i>
                            </div>
                            <div class="input-error">
                                <div class="no-error" ng-repeat="error in app.access_token.error"><i
                                            class="fa fa-times " aria-hidden="true"></i> Dit is een input error verander
                                    my om een error weer te geven
                                </div>
                                <div class="no-error"><i class="fa fa-times " aria-hidden="true"></i> Dit is een input
                                    error verander my om een error weer te geven
                                </div>
                                <div class="no-error"><i class="fa fa-times " aria-hidden="true"></i> Dit is een input
                                    error verander my om een error weer te geven
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inp-dev-token">
                                Wit.ai developers token
                            </label>

                            <div class="input-wrapper see-password-input">
                                <i class="fa fa-eye password-eye-icon" aria-hidden="true"></i>
                                <input id="inp-dev-token" class="default-input " type="password" name="server_token"
                                       ng-model="app.server_token" my-enter="inputEnter($element, this)"
                                       ng-focus="growBack($event)">

                                <i class="fa fa-repeat input-saving-overlay hidden"></i>
                            </div>
                        </div>
                    </div>
                    <div class="app-footer-section">
                        <button class="main-btn">Embedden</button>
                        <button class="main-btn" ng-click="selectApp(app)">Selecteer</button>
                    </div>

                </div>

                <div class="col-md-12 apps-loading" ng-show="loadingApps && !latestPost">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </div>

            </div>
        </div>

    </div>

@endsection