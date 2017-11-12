<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    protected $table = 'apps';

    protected $fillable = [
        'access_token', 'server_token', 'user_id','active'
    ];


    public function users() {
        return $this->belongsToMany( 'App\User');
    }

    public function dialogues() {
        return $this->hasMany( 'App\Dialogue' );
    }
}
