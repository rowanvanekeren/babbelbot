<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StateIntentAnswer extends Model
{
    protected $table = 'state_intent_answers';

    protected $fillable = [
        'answer', 'called_at','state_intents_id', 'answer_type' ,'active'
    ];


    public function stateIntents() {
        return $this->belongsToMany( 'App\StateIntent');
    }

}
