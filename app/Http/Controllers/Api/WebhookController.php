<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WebhookController extends Controller
{
    function processWebhook(Request $request)
    {

        switch ($request->action) {
            case 'flight_answer' :

                bot_log($request->all());
                return $this->flightAnswer($request->all());

            case 'test_stay' :
                return array(
                    'answers' => array(
                        array('answer' => 'uw antwoord kwam niet goed binnen probeer opnieuw'),
                    ),
                    'quick_replies' => array(
                        array('answer' => 'antwoord 1'),
                        array('answer' => 'antwoord 2'),
                    ),
                    /*'stay' => true*/
                );
            default :
                return null;
        }

    }

    function flightAnswer($data)
    {

        bot_log('flight answer request success');
        if (isset($data['wit_data']['entities']['flight_from']) && isset($data['wit_data']['entities']['flight_to'])) {
            bot_log($data['wit_data']['entities']);
            $flight_from = $data['wit_data']['entities']['flight_from'][0]['value'];
            $flight_to = $data['wit_data']['entities']['flight_to'][0]['value'];


            $answer1 = 'dus je wilt een vliegtuig van ' . $flight_from . ' naar ' . $flight_to . '?';
            $answer2 = 'Van ' . $flight_from . ' naar ' . $flight_to . '?';


            return array(
                'answers' => array(
                    array('answer' => $answer1),
                    array('answer' => $answer2),
                ),
                'quick_replies' => array(
                    array('answer' => 'ja'),
                    array('answer' => 'nee'),
                )
            );

        } else {
            return array(
                'answers' => array(array('answer' => 'er ging iets niet goed'))
            );
        }

    }
}
