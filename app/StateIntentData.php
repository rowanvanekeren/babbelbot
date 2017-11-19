<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StateIntentData extends Model
{
    protected $table = 'state_intent_data';

    protected $fillable = [
        'name', 'state_intents_id','active'
    ];


    public function stateIntents() {
        return $this->belongsToMany( 'App\StateIntent');
    }
}
