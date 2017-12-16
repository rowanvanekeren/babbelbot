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
        $dialogue_states_count = State::where('dialogue_id', $dialogue_id)->count();
        $state = new State();
        $state->dialogue_id = $dialogue_id;
        if ($dialogue_states_count == 0) {
            $state->start_state = 1;
        }
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

        if ($state->start_state == 1) {
            $stateData['start_state'] = 1;
        }

        return $stateData;
    }

    function updateNextStates()
    {

    }

    function createStateLink(Request $request)
    {

        // return $request->link_data;
        $stateData = StateData::where('state_id', $request->parent_id)->first();

        $state_links = $this->updateNexStatesState($request->parent_id, $request->link_data);

        $stateData->link_data = json_encode($request->link_data);


        $stateData->save();

        return response($stateData, 200);


    }

    function deleteAllLinksState(Request $request)
    {
        $deleted_links = array();
        if (!empty($request->links) && isset($request->state_id)) {
            $delete_state_id = $request->state_id;
            $links = $request->links;
            $totalLinks = count($links);

            if ($totalLinks > 0) {
                foreach ($links as $key => $value) {

                    $current_state_id = $value['fromOperator'];

                    if (intval($current_state_id) != intval($delete_state_id)) {
                        $other_state = StateData::where('state_id', intval($current_state_id))->first();

                        if (!empty($other_state)) {
                            if (isset($other_state->link_data)) {
                                if (!empty(json_decode($other_state->link_data, true))) {

                                    $other_state_links = json_decode($other_state->link_data, true);

                                    foreach ($other_state_links as $key2 => $value2) {
                                        if (intval($value2['toOperator']) == intval($delete_state_id)) {
                                            array_push($deleted_links, $other_state_links[$key2]);
                                            unset($other_state_links[$key2]);
                                        }
                                    }

                                    $other_state_links = array_values($other_state_links);
                                    $other_state->link_data = json_encode($other_state_links);
                                    $other_state->save();

                                    $updated_state = $this->updateNexStatesState($other_state->state_id, $other_state_links);
                                }
                            }

                        }
                    }
                }
            }
        }
        return $deleted_links;

    }

    function updateNexStatesState($state_id, $links)
    {

        $state = State::where('id', $state_id)->first();
        $formatLinks = array();


        foreach ($links as $key => $link) {
            array_push($formatLinks, $link['toOperator']);

        }

        $formatLinks = array_values(array_unique($formatLinks));

        $state->next_states = json_encode($formatLinks);

        $state->save();

        return $state;
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

    function deleteState(Request $request)
    {
        $state = State::where('id' , $request->state_id)->first();

        if(isset($state)){
            $state->delete();
        }

        return $state;
    }


    public function deleteLink(Request $request)
    {
        $stateData = stateData::where('state_id', $request->state_id)->first();

        if (isset($stateData->link_data)) {
            $link_data = json_decode($stateData->link_data, true);

            foreach ($link_data as $key => $value) {
                if ($value['custom_link_id'] == $request->custom_link_id) {
                    unset($link_data[$key]);
                }
            }

            $new_link_data = array_values($link_data);

            $stateData->link_data = json_encode($new_link_data);

            $stateData->save();


        }

        return $stateData;
    }
}
