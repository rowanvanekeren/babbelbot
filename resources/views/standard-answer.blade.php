@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid" ng-controller="appController" ng-init="getUserApps()">
        <div class="row modal-overlay" ng-show="showCreateApp || showDeleteApp" ng-cloak></div>

        <div class="app-wrapper warning-box" ng-show="showDeleteApp" ng-cloak>
            <h2>Weet je zeker dat je deze app wilt verwijderen?</h2>

            <button class="danger-btn" ng-click="deleteApp($event, deleteID)">Verwijder</button>
            <button class="main-btn" ng-click="showDeleteApp = false">Annuleer</button>
        </div>

        <div class="row top-row-navigation">
            <div class="col-md-6 col-md-offset-3 align-right">

                <button class="main-btn" ng-click="newAppTrigger(newApp)"> Nieuw Antwoord</button>

            </div>
        </div>

        <div class="row" ng-cloak>
            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper new-app" ng-show="showCreateApp"></div>

            </div>

            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper standard-intent">
                    <div class="standard-intent-info">
                    <span class="standard-intent-title">
                        intent
                    </span>
                    <span class="standard-intent-example">
                        voorbeeld vraag
                    </span>
                    </div>
                    <button class="main-btn lr-margin" ng-click="trainExpression($event)">Bewerk</button>
                    <button class="danger-btn"> <i class="fa fa-trash-o input-trash-icon" aria-hidden="true"></i></button>
                </div>

                <div class="col-md-12 apps-loading" ng-show="loadingApps && !latestPost">
                    <i class="fa fa-spinner" aria-hidden="true"></i>
                </div>

            </div>
        </div>

    </div>

@endsection