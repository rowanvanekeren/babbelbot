<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Cache;
class WebhookController extends Controller
{
    function processWebhook(Request $request)
    {

        switch ($request->action) {
            case 'flight_answer' :


                return $this->flightAnswer($request->all());
            break;


            case 'flight_time' :

                return $this->flightTime($request->all());
            break;

            case 'check_flight_information' :

                return $this->checkFlight($request->all());
                break;
            default :
                return null;
        }

    }

    function flightAnswer($data)
    {


        if (isset($data['wit_data']['entities']['flight_from']) && isset($data['wit_data']['entities']['flight_to'])) {

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
                'answers' => array(array('answer' => 'Sorry deze bestemmingen hebben wij niet kunnen vinden'))
            );
        }

    }

    function flightTime($data){
        if(isset($data['wit_data']['entities']['datetime'])){

            $date = $data['wit_data']['entities']['datetime'][0]['value'];
            $my_date = (string)date('d/m/Y', strtotime($date));

            list($d, $m, $y) = explode('/', $my_date);
            $answer1 = 'dus je wilt vliegen op '.(intval($d) +1). '-' .$m . '?';

            $expiresAt = Carbon::now()->addMinutes(30);

            /*save to cache*/
            $webhookCacheObj = array(

                'flight_time' => (intval($d) +1). '-' .$m

            );

            Cache::add('webhook_user_'.$data['session_id'], $webhookCacheObj, $expiresAt);


            return array(
                'answers' => array(
                    array('answer' => $answer1),
                ),
                'quick_replies' => array(
                    array('answer' => 'ja'),
                    array('answer' => 'nee'),
                )
            );

        }else{
            return array(
                'answers' => array(array('answer' => 'er ging iets fout, probeer opnieuw'))
            );
        }
    }

    function checkFlight($data){

        $user_session =   $cacheObj = Cache::get('webhook_user_'.$data['session_id']);
        $parameters = $data['parameters'];

        if(isset($user_session['flight_time']) &&
            isset($parameters['flight_from']) &&
            isset($parameters['flight_to']) &&
            isset($parameters['flight_request_email']) &&
            isset($parameters['flight_request_name'])
            )
        {
            return array(
                'answers' => array(
                    array('answer' => 'Hier de gegevens: vlucht: van ' . $parameters['flight_from'][0]['value'] .
                    ' naar ' . $parameters['flight_to'][0]['value']. '.'. PHP_EOL . PHP_EOL .'Uw naam: '. $parameters['flight_request_name'] .
                        '.'. PHP_EOL . PHP_EOL .'En uw email: '. $parameters['flight_request_email']. '.'. PHP_EOL . PHP_EOL .' U kunt betalen via de volgende link: https://babbelbot.be/vlucht/betalen'
                    ),
                ),
                'quick_replies' => array(
                    array('answer' => 'ja'),
                    array('answer' => 'nee'),
                )
            );
        }else{
            return array(
                'answers' => array(array('answer' => 'ik mis wat informatie'))
            );
        }
    }
}
