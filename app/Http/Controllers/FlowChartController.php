<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response;
use App\State;
use App\StateData;
use App\StateIntent;

class FlowChartController extends Controller
{
    function getAllStates(Request $request)
    {
        $dialogue_id = $request->session()->get('active_dialogue')->id;

        $states = State::where('dialogue_id', $dialogue_id)->with('stateData')->with('stateIntents')->get();


        return $states;

    }

    function createState(Request $request)
    {
        $dialogue_id = $request->session()->get('active_dialogue')->id;

        $state = new State();
        $state->dialogue_id = $dialogue_id;
        $state->save();

        $stateData = new StateData();
        $stateData->state_id = $state->id;
        $stateData->name = $request->title;
        $stateData->top = $request->top;
        $stateData->left = $request->left;

        $stateData->save();

        $stateIntent = new StateIntent();
        $stateIntent->state_id = $state->id;
        $stateIntent->intent_type = $request->type;
        $stateIntent->response_type = 1;

        $stateIntent->save();


        return $stateData;
    }

    function updateNextStates()
    {

    }

    function createStateLink(Request $request)
    {

       // return $request->link_data;
        $stateData = StateData::where('state_id', $request->parent_id)->first();

        $this->updateNexStatesState($request->parent_id , $request->link_data);

        $stateData->link_data = json_encode($request->link_data);


        $stateData->save();

        return response($stateData, 200);


    }

    function updateNexStatesState($state_id, $links){

        $state = State::where('id', $state_id)->first();
        $formatLinks = array();


        foreach($links as $key => $link){
        array_push($formatLinks, $link['toOperator']);

        }

        $formatLinks = array_values(array_unique($formatLinks));

        $state->next_states = json_encode($formatLinks);

        $state->save();
    }

    function updatePosition(Request $request)
    {
        $stateData = StateData::where('state_id', $request->operator_id)->first();

        $stateData->top = $request->top;
        $stateData->left = $request->left;

        $stateData->save();

        return $stateData;

    }


    function updateState()
    {

    }

    function deleteState()
    {

    }


    public function deleteLink(Request $request){
        $stateData = stateData::where('state_id', $request->state_id)->first();

        if(isset($stateData->link_data)){
            $link_data = json_decode($stateData->link_data,true);

            foreach($link_data as $key => $value){
                if($value['custom_link_id'] == $request->custom_link_id){
                    unset($link_data[$key]);
                }
            }

            $new_link_data =  array_values($link_data);

            $stateData->link_data = json_encode($new_link_data);

            $stateData->save();


        }

        return $stateData;
    }
}
