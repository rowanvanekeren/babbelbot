<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dialogue extends Model
{
    protected $table = 'dialogues';

    protected $fillable = [
        'title', 'description', 'app_id','active'
    ];


    public function apps() {
        return $this->belongsToMany( 'App\App');
    }

}
