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

            case 'pizza_types' :

                return $this->pizzaTypes($request->all());
                break;

            case 'pizza_size' :

                return $this->pizzaSize($request->all());
                break;

            case 'confirm_pizza_order' :

                return $this->confirmPizza($request->all());
                break;

            case 'set_pizza_timer' :

            return $this->setPizzaTimer($request->all());
            break;

            case 'get_pizza_timer' :

                return $this->getPizzaTimer($request->all());
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

    function flightTime($data)
    {
        if (isset($data['wit_data']['entities']['datetime'])) {

            $date = $data['wit_data']['entities']['datetime'][0]['value'];
            $my_date = (string)date('d/m/Y', strtotime($date));

            list($d, $m, $y) = explode('/', $my_date);
            $answer1 = 'dus je wilt vliegen op ' . (intval($d) + 1) . '-' . $m . '?';

            $expiresAt = Carbon::now()->addMinutes(30);

            /*save to cache*/
            $webhookCacheObj = array(

                'flight_time' => (intval($d) + 1) . '-' . $m

            );

            Cache::add('webhook_user_' . $data['session_id'], $webhookCacheObj, $expiresAt);


            return array(
                'answers' => array(
                    array('answer' => $answer1),
                ),
                'quick_replies' => array(
                    array('answer' => 'ja'),
                    array('answer' => 'nee'),
                )
            );

        } else {
            return array(
                'answers' => array(array('answer' => 'er ging iets fout, probeer opnieuw'))
            );
        }
    }

    function checkFlight($data)
    {

        $user_session  = Cache::get('webhook_user_' . $data['session_id']);
        $parameters = $data['parameters'];

        if (isset($user_session['flight_time']) &&
            isset($parameters['flight_from']) &&
            isset($parameters['flight_to']) &&
            isset($parameters['flight_request_email']) &&
            isset($parameters['flight_request_name'])
        ) {
            return array(
                'answers' => array(
                    array('answer' => 'Hier de gegevens: vlucht: van ' . $parameters['flight_from'][0]['value'] .
                        ' naar ' . $parameters['flight_to'][0]['value'] . '.' . PHP_EOL . PHP_EOL . 'Uw naam: ' . $parameters['flight_request_name'] .
                        '.' . PHP_EOL . PHP_EOL . 'En uw email: ' . $parameters['flight_request_email'] . '.' . PHP_EOL . PHP_EOL . ' U kunt betalen via de volgende link: https://babbelbot.be/vlucht/betalen'
                    )

                ),
            );
        } else {
            return array(
                'answers' => array(array('answer' => 'ik mis wat informatie'))
            );
        }
    }


    function pizzaTypes($data)
    {
        if (isset($data['wit_data']['entities']['our_pizzas'])) {
            return array(
                'answers' => array(array('answer' => 'een pizza ' . $data['wit_data']['entities']['our_pizzas'][0]['value'] . ' natuurlijk.' . PHP_EOL . 'Welke grootte wil je?')),
                'quick_replies' => array(
                    array('answer' => 'small'),
                    array('answer' => 'medium'),
                    array('answer' => 'large'),
                )

            );
        } else {
            return array(
                'answers' => array(array('answer' => 'Deze pizza hebben wij helaas niet'))
            );
        }
    }

    function pizzaSize($data)
    {


        $expiresAt = Carbon::now()->addMinutes(30);

        /*save to cache*/
        $webhookCacheObj = array(

            'pizza_size' => $data['user_input']

        );

        Cache::add('webhook_user_' . $data['session_id'], $webhookCacheObj, $expiresAt);

        if ($data['user_input'] == 'small') {
            return array(
                'answers' => array(array('answer' => 'een kleine pizza ' . $data['parameters']['our_pizzas'][0]['value'] . '. en wat is je naam?'))
            );
        } else if ($data['user_input'] == 'medium') {
            return array(
                'answers' => array(array('answer' => 'een medium pizza ' . $data['parameters']['our_pizzas'][0]['value'] . '. en wat is je naam?'))
            );
        } else if ($data['user_input'] == 'large') {
            return array(
                'answers' => array(array('answer' => 'een grote pizza ' . $data['parameters']['our_pizzas'][0]['value'] . '. en wat is je naam?'))
            );
        } else {
            return array(
                'answers' => array(array('answer' => 'Die grootte hebben wij helaas niet'))
            );
        }
    }

    function confirmPizza($data)
    {
        $user_session = $cacheObj = Cache::get('webhook_user_' . $data['session_id']);
        $parameters = $data['parameters'];
        if (isset($parameters['user_name']) &&
            isset($parameters['phone_number']) &&
            isset($parameters['user_adress']) &&
            isset($user_session['pizza_size']) &&
            isset($parameters['our_pizzas'])
        ) {
            return array(
                'answers' => array(
                    array('answer' => 'Bevestig gegevens: ' . PHP_EOL . PHP_EOL .
                        'Een ' . $user_session['pizza_size'] . ' ' . $parameters['our_pizzas'][0]['value'] . PHP_EOL . PHP_EOL .
                        'Uw naam: ' . $parameters['user_name'] . PHP_EOL . PHP_EOL .
                        'Uw telefoonnummer: ' . $parameters['phone_number'] . PHP_EOL . PHP_EOL .
                        'Uw adres: ' . $parameters['user_adress'] . PHP_EOL . PHP_EOL .
                        'Hoe wenst u te betalen?',
                    )
                ),
                'quick_replies' => array(
                    array('answer' => 'creditcard'),
                    array('answer' => 'aan de deur'),
                )
            );
        }
    }

    function setPizzaTimer($data){
        $user_session = Cache::get('webhook_user_' . $data['session_id']);
        $parameters = $data['parameters'];
        if (isset($parameters['user_name']) &&
            isset($parameters['phone_number']) &&
            isset($parameters['user_adress']) &&
            isset($user_session['pizza_size']) &&
            isset($parameters['our_pizzas'])
        ) {

            $expiresAt = Carbon::now()->addMinutes(30);

            /*save to cache*/

            $webhookCacheObj = array(
                'order_end' => date('H:i',strtotime('+30 minutes')),
            );

            Cache::put('webhook_user_' . $data['session_id'], $webhookCacheObj, $expiresAt);


            return array(
                'answers' => array(
                    array('answer' => 'Bedankt voor het bestellen, de pizza zal over ongeveer 30 minuten bij u zijn',
                    )
                ),

            );
        }
    }

    function getPizzaTimer($data){
        $user_session =  Cache::get('webhook_user_' . $data['session_id']);
        $currentTime = date('H:i');
        $t1 = strtotime($currentTime);

        if(isset($user_session['order_end'])){

            $t2 = strtotime($user_session['order_end']);
            $delta_T = ($t2 - $t1);
            $minutes = ($delta_T  / 60);

            if($minutes > 0 && $minutes <= 30){
                return array(
                    'answers' => array(
                        array('answer' => 'Je bestelling is over ' . $minutes . ' minuten bij u',
                        )
                    ),

                );
            }else{
                return array(
                    'answers' => array(
                        array('answer' => 'Je bestelling zou afgeleverd moeten zijn',
                        )
                    ),

                );
            }

        }else{
            return array(
                'answers' => array(
                    array('answer' => 'Ik heb geen informatie over uw bestelling',
                    )
                ),

            );
        }


    }
}
