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
                                    Wit.ai server token
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
                            <label for="inp-access-token"  >
                                Wit.ai access token <i class="fa fa-info-circle" aria-hidden="true" tooltips tooltip-smart="true" tooltip-class="wide-tooltip" tooltip-template="Deze token kun je verkrijgen
                            door naar https://wit.ai te gaan, je maakt vervolgens een app aan waarna je bij
                            settings de tokens kunt verkrijgen"></i>
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

                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inp-dev-token">
                                Wit.ai server token <i class="fa fa-info-circle" aria-hidden="true" tooltips tooltip-smart="true" tooltip-class="wide-tooltip" tooltip-template="Deze token kun je verkrijgen
                            door naar https://wit.ai te gaan, je maakt vervolgens een app aan waarna je bij
                            settings de tokens kunt verkrijgen"></i>
                            </label>

                            <div class="input-wrapper see-password-input">
                                <i class="fa fa-eye password-eye-icon" aria-hidden="true"></i>
                                <input id="inp-dev-token" class="default-input " type="password" name="server_token"
                                       ng-model="app.server_token" my-enter="inputEnter($element, this)"
                                       ng-focus="growBack($event)">

                                <i class="fa fa-repeat input-saving-overlay hidden"></i>
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label for="inp-dev-token">
                                Backend webhook <i class="fa fa-info-circle" aria-hidden="true" tooltips tooltip-smart="true" tooltip-class="wide-tooltip" tooltip-template="Wanneer je bij dialogen een antwoord selecteerd met optie 'backend' dan zal babbelbot een 'post request' sturen naar deze url. Meer info hierover vindt je in de Help sectie"></i>
                            </label>

                            <div class="input-wrapper">

                                <input id="inp-webhook" class="default-input " type="text" name="webhook"
                                       ng-model="app.webhook" my-enter="inputEnter($element, this)"
                                       ng-focus="growBack($event)">

                                <i class="fa fa-repeat input-saving-overlay hidden"></i>
                            </div>
                        </div>
                    </div>
                    <div class="app-embed-section" ng-class="{'open': openEmbed}">
                        <hr>
                        <div>
                            <h3>Facebook</h3>
                        </div>
                        <div class="form-group">
                            <label for="inp-dev-token">
                                Facebook verify token <i class="fa fa-info-circle" aria-hidden="true"
                                                         tooltips tooltip-smart="true" tooltip-class="wide-tooltip"
                                                         tooltip-template="Wanneer je bij facebook moet connecteren met een webhook zal facebook vragen om een 'verify token', dit is een token die je zelf mag verzinnen maar bij zowel facebook als babbelbot het zelfde moeten zijn"></i>
                            </label>

                            <div class="input-wrapper see-password-input">
                                <i class="fa fa-eye password-eye-icon" aria-hidden="true"></i>
                                <input id="inp-dev-token" class="default-input " type="password" name="fb_verify_token"
                                       ng-model="app.fb_verify_token" my-enter="inputEnter($element, this)"
                                       ng-focus="growBack($event)">

                                <i class="fa fa-repeat input-saving-overlay hidden"></i>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inp-dev-token">
                                Facebook access token <i class="fa fa-info-circle" aria-hidden="true"
                                                         tooltips tooltip-smart="true" tooltip-class="wide-tooltip"
                                                         tooltip-template="Wanneer je bij facebook pagina hebt aangemaakt zul je bij de developers pagina een access token kunnen vinden. Deze kun je in dit veld plakken"></i>
                            </label>

                            <div class="input-wrapper see-password-input">
                                <i class="fa fa-eye password-eye-icon" aria-hidden="true"></i>
                                <input id="inp-dev-token" class="default-input " type="password" name="fb_access_token"
                                       ng-model="app.fb_access_token" my-enter="inputEnter($element, this)"
                                       ng-focus="growBack($event)">

                                <i class="fa fa-repeat input-saving-overlay hidden"></i>
                            </div>
                        </div>
                    </div>
                    <div class="app-footer-section">

                        <button class="main-btn" ng-click="openEmbed = !openEmbed">Embedden</button>
                        <button class="main-btn" ng-click="selectApp($event, app, apps, $index)">Selecteer</button>

                        <div class="input-error">
                            <div class="has-error" ng-repeat="error in app.errors" ><i
                                        class="fa fa-times " aria-hidden="true"></i> @{{ error }}
                            </div>

                            <div class="has-error" ng-if="app.errors" ><i
                                        class="fa fa-times " aria-hidden="true"></i> Toch verdergaan <a href="" ng-click="selectApp($event, app, apps, $index, true)">Klik hier</a>
                            </div>


                        </div>
                    </div>

                </div>

                <div class="col-md-12 apps-loading" ng-show="loadingApps && !latestPost">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </div>

            </div>
        </div>

    </div>

@endsection