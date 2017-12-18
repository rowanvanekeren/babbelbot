<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['sessions']], function () {
    Route::get('/facebook/{id}', 'Api\FacebookController@verifyFacebook');
    Route::post('/facebook/{id}', 'Api\FacebookController@responseFacebook');

    Route::get('/chatbot/{id}', 'Api\FacebookController@verifyFacebook');
    Route::post('/chatbot/{id}', 'Api\FacebookController@responseFacebook');
    /*custom webhook */
    Route::post('/webhook', 'Api\WebhookController@processWebhook');

});