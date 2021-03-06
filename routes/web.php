<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});


Route::group(['middleware' => 'auth'], function () {
    /* user */
    Route::post('/update-user', 'UserController@update');
    Route::delete('/delete-account', 'UserController@delete');


    /* logout */
    Route::get('/logout', 'Auth\LoginController@logout');


    /* apps */
    Route::post('/create-app', 'AppController@create');
    Route::post('/update-app', 'AppController@update');
    Route::post('/delete-app', 'AppController@delete');
    Route::post('/select-app', 'AppController@select');

    Route::get('/get-user-apps', 'AppController@getUserApps');

    Route::get('/dashboard', function () {
        return view('apps');
    });

    Route::get('/help', function () {
        return view('help');
    });

    Route::get('/instellingen', function () {
        return view('settings');
    });

    Route::get('/check-app-session', 'SessionController@checkActiveApp');

    Route::group(['middleware' => 'checkapp'], function () {

        Route::group(['middleware' => 'checkdialogue'], function () {

            Route::get('/dashboard/dialogen/diagram', function () {
                return view('diagram');
            });

        });


        Route::get('/dashboard/dialogen', function () {
            return view('app-dialogue');
        });

        Route::post('/check-wit-connection', 'AppController@checkConnection');
        Route::post('/clear-session', 'AppController@clearSession');

        Route::post('/create-dialogue', 'DialogueController@create');
        Route::post('/update-dialogue', 'DialogueController@update');
        Route::post('/delete-dialogue', 'DialogueController@delete');
        Route::post('/select-dialogue', 'DialogueController@select');
        Route::get('/get-dialogues', 'DialogueController@getDialogues');


        /*flowchart */
        Route::post('/createState', 'FlowChartController@createState');
        Route::post('/createStateLink', 'FlowChartController@createStateLink');
        Route::post('/updateOperatorPosition', 'FlowChartController@updatePosition');
        Route::post('/getAllStates', 'FlowChartController@getAllStates');
        Route::post('/deleteLinkOperator', 'FlowChartController@deleteLink');
        Route::post('/deleteAllLinksState', 'FlowChartController@deleteAllLinksState');
        Route::post('/deleteState', 'FlowChartController@deleteState');

        /* keyword */
        Route::post('/save-keyword-local', 'IntentController@saveKeywordLocal');


        /* FreeInput (parameter) */
        Route::post('/save-parameter-local', 'IntentController@saveParameterLocal');


        /* intent */
        Route::post('/get-intent-wit', 'IntentController@getIntentWit');
        Route::post('/save-intent-local-wit', 'IntentController@saveIntentToState');
        Route::post('/save-intent-local', 'IntentController@saveIntentLocal');
        Route::post('/get-state-intent', 'IntentController@getStateIntent');
        Route::post('/update-state-type', 'IntentController@updateStateType');
        Route::post('/save-intent-answer', 'IntentController@saveAnswer');
        Route::post('/delete-intent-answer', 'IntentController@deleteAnswer');
        Route::post('/delete-active-intent', 'IntentController@deleteActiveIntent');
        Route::post('/get-intent-data-wit', 'IntentController@getIntentData');
        Route::post('/get-intent-entity-data-wit', 'IntentController@getIntentEntityData');
        Route::post('/add-intent-wit', 'IntentController@addWitIntent');
        Route::post('/add-intent-action', 'IntentController@addIntentAction');
        Route::post('/update-state-intent-type', 'IntentController@updateStateIntentType');

        /* entities */
        Route::get('/get-all-entities', 'IntentController@getAllEntities');
        Route::post('/get-all-values-entity', 'EntityController@getAllValuesEntity');
        Route::post('/add-keyword-expression', 'EntityController@addKeywordExpression');
        Route::post('/add-entity', 'EntityController@addEntity');
        Route::post('/add-entity-value', 'EntityController@addEntityValue');
        Route::post('/delete-entity', 'EntityController@deleteEntity');
        Route::post('/delete-entity-value', 'EntityController@deleteEntityValue');
        Route::post('/delete-entity-expression', 'EntityController@deleteEntityExpression');

        /* train */
        Route::post('/train-intent', 'IntentController@trainIntent');


        /* standard intent */
        Route::get('/dashboard/standaard-antwoorden', function () {
            return view('standard-answer');
        });

        Route::post('/add-standard-intent-wit', 'StandardIntentController@addStandardWitIntent');
        Route::post('/add-new-standard', 'StandardIntentController@createStandard');
        Route::get('/get-all-standard-intents', 'StandardIntentController@getAllIntents');
        Route::post('/save-standard-intent', 'StandardIntentController@saveIntent');
        Route::post('/delete-standard-intent', 'StandardIntentController@deleteIntent');
        Route::post('/save-standard-intent-answer', 'StandardIntentController@saveIntentAnswer');
        Route::post('/delete-standard-intent-answer', 'StandardIntentController@deleteIntentAnswer');
        Route::post('/delete-active-standard-intent', 'StandardIntentController@deleteActiveIntent');

        Route::get('/dashboard/entities', function () {
            return view('entities');
        });

    });

});



Auth::routes();


Route::get('/redirect', 'SocialAuthFacebookController@redirect');
Route::get('/callback', 'SocialAuthFacebookController@callback');

