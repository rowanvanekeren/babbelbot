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

    Route::get('/facebook/{id}', 'Api\FacebookController@verifyFacebook');
    Route::post('/facebook/{id}', 'Api\FacebookController@responseFacebook');

    Route::get('/chatbot/{id}', 'Api\DefaultChatbotController@verifyDefault');
    Route::post('/chatbot/{id}', 'Api\DefaultChatbotController@responseDefault');
    /*custom webhook */
    Route::post('/webhook', 'Api\WebhookController@processWebhook');

