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
    Route::post('/create-app', 'AppController@create');
    Route::post('/update-app', 'AppController@update');
    Route::post('/delete-app', 'AppController@delete');
    Route::post('/select-app', 'AppController@select');

    Route::get('/get-user-apps', 'AppController@getUserApps');



    Route::get('/check-app-session', 'SessionController@checkActiveApp');

    Route::group(['middleware' => 'checkapp'] ,function() {
        Route::get('/dashboard/dialogue', function () {
            return view('app-dialogue');
        });

        Route::post('/create-dialogue', 'DialogueController@create');
        Route::post('/update-dialogue', 'DialogueController@update');
        Route::post('/delete-dialogue', 'DialogueController@delete');
        Route::post('/select-dialogue', 'DialogueController@select');
        Route::get('/get-dialogues', 'DialogueController@getDialogues');
    });

    Route::get('/dashboard', function () {
        return view('apps');
    });


    /*flowchart test */

    Route::post('/testFlowChart', 'FlowChartController@test');
    Route::post('/createState', 'FlowChartController@createState');
    Route::post('/createStateLink', 'FlowChartController@createStateLink');
    Route::post('/updateOperatorPosition', 'FlowChartController@updatePosition');
    Route::post('/getAllStates', 'FlowChartController@getAllStates');


    /* intent */
    Route::post('/get-intent-wit', 'IntentController@getIntentWit');
    Route::post('/save-intent-local-wit', 'IntentController@saveIntentToState');
    Route::post('/save-intent-local', 'IntentController@saveIntentLocal');
    Route::post('/get-state-intent', 'IntentController@getStateIntent');
    Route::post('/update-state-type', 'IntentController@updateStateType');
    Route::post('/save-intent-answer', 'IntentController@saveAnswer');
});




Route::get('/dashboard/dialogue/diagram', function () {
    return view('diagram');
});

Auth::routes();

Route::get('/redirect', 'SocialAuthFacebookController@redirect');
Route::get('/callback', 'SocialAuthFacebookController@callback');
Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
