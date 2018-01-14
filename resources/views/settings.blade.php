@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid" ng-controller="userController"  ng-cloak>
        <div class="row modal-overlay" ng-show="showDeleteAccount"></div>

        <div class="app-wrapper warning-box" ng-show="showDeleteAccount">
            <h2>Weet je zeker dat je dit account wilt verwijderen?</h2>

            <button class="danger-btn" ng-click="deleteAccount($event)">Verwijder</button>
            <button class="main-btn" ng-click="showDeleteAccount = false">Annuleer</button>
        </div>



        <div class="row">
            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper user-settings">

                    <form >

                        <div class="app-top-section">
                            <h2>Gebruiker</h2>
                        </div>
                        <div class="app-center-section">


                            <div class="form-group">
                                <label >
                                    Naam
                                </label>

                                <div class="input-wrapper see-password-input disable-shrink">

                                    <input  class="default-input " type="text" name="name"
                                            value="{{ Auth::user()->name }}" >

                                </div>
                                <div class="input-error">

                                    <div ng-repeat="errorMessage in userError"
                                         ng-show="userError"
                                         ng-class="{'has-error': userError }">
                                        <i class="fa fa-times " aria-hidden="true"></i> @{{errorMessage}}
                                    </div>

                                </div>
                            </div>
                            <div class="form-group">
                                <label >
                                    Email (niet aanpasbaar)
                                </label>

                                <div class="input-wrapper ">

                                    <input  class="default-input inp-loading" type="text"
                                             value="{{ Auth::user()->email }}" disabled>

                                </div>

                            </div>
                        </div>
                        <div class="app-footer-section">

                            <button class="main-btn async-save" ng-click="updateUser($event)"> Opslaan</button>
                        </div>
                    </form>
                </div>

            </div>

            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper ">

                    <form >

                        <div class="app-top-section">
                            <h2>Lokale chat cache</h2>
                        </div>
                        <div class="app-center-section">
                            <p>Wanneer je een gesprek aan gaat in een chat worden de huidige <q>app</q> settings meegenomen in de cache. Soms is het handig om dit even te refreshen voor testing.</p>

                        </div>
                        <div class="app-footer-section">
                            <button class="danger-btn async-save" ng-click="deleteLocalChatCache($event)"> Verwijder cache</button>
                        </div>
                    </form>
                </div>

            </div>

            <div class="col-md-6 col-md-offset-3">

                <div class="col-md-12 app-wrapper ">

                    <form >

                        <div class="app-top-section">
                            <h2>Account verwijderen</h2>
                        </div>
                        <div class="app-center-section">
                            <p>Door je account te verwijderen, verwijder je ook al je data zoals: apps, dialogen, standaard antwoorden.</p>

                        </div>
                        <div class="app-footer-section">
                            <button class="danger-btn async-save" ng-click="showDeleteAccount = true"> Verwijder account</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    </div>

@endsection