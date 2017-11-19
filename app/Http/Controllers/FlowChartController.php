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

        $states = State::where('dialogue_id', $dialogue_id)->with('stateData')->get();


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
        $stateIntent->type = $request->type;

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


        $stateData->link_data = json_encode($request->link_data);


        $stateData->save();

        return response($stateData, 200);


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
}
