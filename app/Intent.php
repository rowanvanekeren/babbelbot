<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Intent extends Model
{
    protected $table = 'intents';

    protected $fillable = [
        'app_id', 'intent', 'action', 'intent_type', 'active'
    ];


    public function apps() {
        return $this->belongsTo( 'App\App');
    }

    public function intentAnswers() {
        return $this->hasMany( 'App\IntentAnswer' , 'intent_id');
    }

    public function intentData() {
        return $this->hasOne( 'App\IntentData', 'intent_id' );
    }
}
