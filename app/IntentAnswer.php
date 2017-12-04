<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IntentAnswer extends Model
{
    protected $table = 'intent_answers';

    protected $fillable = [
        'answer', 'called_at','intent_id','active'
    ];


    public function intents() {
        return $this->belongsToMany( 'App\Intent');
    }
}
