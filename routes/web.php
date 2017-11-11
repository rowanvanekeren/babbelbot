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



    Route::get('/dashboard', function () {
        return view('apps');
    });


});


Route::get('/dashboard/dialogue', function () {
    return view('app-dialogue');
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
